import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import loadMujoco from "@mujoco/mujoco";

class CapsuleGeometry extends THREE.BufferGeometry {
  constructor(radius, length) {
    super();
    const path = new THREE.Path();
    path.absarc(0, -length / 2, radius, Math.PI * 1.5, 0, false);
    path.absarc(0, length / 2, radius, 0, Math.PI * 0.5, false);
    const source = new THREE.LatheGeometry(path.getPoints(32), 20);
    this.setIndex(source.getIndex());
    this.setAttribute("position", source.getAttribute("position"));
    this.setAttribute("normal", source.getAttribute("normal"));
    this.setAttribute("uv", source.getAttribute("uv"));
  }
}

export class MujocoBrowserViewer {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.mujoco = null;
    this.model = null;
    this.data = null;
    this.option = null;
    this.perturb = null;
    this.mjCamera = null;
    this.mjScene = null;
    this.meshes = [];
    this.geometryCache = new Map();
    this.paused = false;
    this.mode = "camera";
    this.showContacts = false;
    this.initialState = [];
    this.drag = null;
    this.lastFrame = performance.now();
    this.lastSample = 0;
    this.timeAccumulator = 0;
    this.frameId = null;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x10151b);
    this.camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.01, 1000);
    this.camera.up.set(0, 0, 1);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = true;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.dragPlane = new THREE.Plane();
    this.dragTarget = new THREE.Vector3();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.onPointerDown = (event) => this.handlePointerDown(event);
    this.onPointerMove = (event) => this.handlePointerMove(event);
    this.onPointerUp = (event) => this.handlePointerUp(event);
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.addEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.addEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.addEventListener("pointercancel", this.onPointerUp);
    this.resize();
  }

  async init() {
    this.mujoco = await loadMujoco();
    this.option = new this.mujoco.MjvOption();
    this.perturb = new this.mujoco.MjvPerturb();
    this.mjCamera = new this.mujoco.MjvCamera();
    this.addLights();
    this.homeCamera();
    this.animate();
  }

  addLights() {
    this.scene.add(new THREE.HemisphereLight(0xddeeff, 0x18202a, 1.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(-3, -4, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0x8fc9ff, 0.75);
    fill.position.set(4, 3, 2);
    this.scene.add(fill);
  }

  async loadModel(xml, initialState = [], observe = {}) {
    this.disposeModel();
    this.initialState = initialState;
    this.observe = observe;
    this.model = this.mujoco.MjModel.from_xml_string(xml);
    if (!this.model) throw new Error("MuJoCo 无法编译这个模型。");
    this.data = new this.mujoco.MjData(this.model);
    this.mjScene = new this.mujoco.MjvScene(this.model, 2 ** 15);
    this.reset();
    this.homeCamera();
    this.updateScene(true);
  }

  disposeModel() {
    this.clearMeshes();
    for (const key of ["mjScene", "data", "model"]) {
      if (this[key]) {
        this[key].delete();
        this[key] = null;
      }
    }
  }

  clearMeshes() {
    for (const mesh of this.meshes) {
      this.scene.remove(mesh);
      mesh.material?.dispose();
    }
    this.meshes.length = 0;
    for (const geometry of this.geometryCache.values()) geometry.dispose();
    this.geometryCache.clear();
  }

  reset() {
    if (!this.model || !this.data) return;
    this.clearDrag();
    this.mujoco.mj_resetData(this.model, this.data);
    this.timeAccumulator = 0;
    for (const item of this.initialState) {
      const jointId = this.mujoco.mj_name2id(
        this.model,
        this.mujoco.mjtObj.mjOBJ_JOINT.value,
        item.joint,
      );
      if (jointId < 0) continue;
      if (item.field === "qvel") {
        this.data.qvel[this.model.jnt_dofadr[jointId]] = item.value;
      } else {
        this.data.qpos[this.model.jnt_qposadr[jointId]] = item.value;
      }
    }
    this.mujoco.mj_forward(this.model, this.data);
    this.updateScene();
    this.emitSample(true);
  }

  step(count = 1) {
    if (!this.model || !this.data) return;
    for (let i = 0; i < count; i += 1) {
      this.applyDragForce();
      this.mujoco.mj_step(this.model, this.data);
    }
    this.updateScene();
    this.emitSample(true);
  }

  setPaused(paused) {
    this.paused = paused;
  }

  setMode(mode) {
    this.mode = mode;
    this.controls.enabled = mode === "camera";
    this.renderer.domElement.classList.toggle("drag-mode", mode === "drag");
    if (mode !== "drag") this.clearDrag();
  }

  toggleContacts() {
    const flag = this.mujoco.mjtVisFlag.mjVIS_CONTACTPOINT.value;
    this.option.flags[flag] = !this.option.flags[flag];
    this.showContacts = Boolean(this.option.flags[flag]);
    this.clearMeshes();
    this.updateScene(true);
    return this.showContacts;
  }

  homeCamera() {
    const extent = this.model?.stat?.extent || 2;
    const center = this.model?.stat?.center || [0, 0, 0];
    this.camera.position.set(
      center[0] - 1.1 * extent,
      center[1] - 1.1 * extent,
      center[2] + 0.75 * extent,
    );
    this.controls.target.set(center[0], center[1], center[2]);
    this.controls.update();
  }

  resize() {
    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  getGeometry(mjGeom) {
    const key = JSON.stringify([mjGeom.type, Array.from(mjGeom.size), mjGeom.dataid]);
    if (this.geometryCache.has(key)) return this.geometryCache.get(key);
    const types = this.mujoco.mjtGeom;
    let geometry;
    if (mjGeom.type === types.mjGEOM_PLANE.value) {
      geometry = new THREE.PlaneGeometry(
        2 * (mjGeom.size[0] || 100),
        2 * (mjGeom.size[1] || 100),
      );
    } else if (mjGeom.type === types.mjGEOM_SPHERE.value) {
      geometry = new THREE.SphereGeometry(mjGeom.size[0], 32, 20);
    } else if (mjGeom.type === types.mjGEOM_CAPSULE.value) {
      geometry = new CapsuleGeometry(mjGeom.size[0], 2 * mjGeom.size[2]);
      geometry.rotateX(Math.PI / 2);
    } else if (mjGeom.type === types.mjGEOM_BOX.value) {
      geometry = new THREE.BoxGeometry(2 * mjGeom.size[0], 2 * mjGeom.size[1], 2 * mjGeom.size[2]);
    } else if (mjGeom.type === types.mjGEOM_CYLINDER.value) {
      geometry = new THREE.CylinderGeometry(mjGeom.size[0], mjGeom.size[1], 2 * mjGeom.size[2], 32);
      geometry.rotateX(Math.PI / 2);
    } else if (mjGeom.type === types.mjGEOM_ELLIPSOID.value) {
      geometry = new THREE.SphereGeometry(1, 32, 20);
      geometry.scale(mjGeom.size[0], mjGeom.size[1], mjGeom.size[2]);
    } else if (mjGeom.type === types.mjGEOM_MESH.value) {
      geometry = this.getMeshGeometry(mjGeom.dataid);
    } else {
      geometry = new THREE.BufferGeometry();
    }
    this.geometryCache.set(key, geometry);
    return geometry;
  }

  getMeshGeometry(meshId) {
    const geometry = new THREE.BufferGeometry();
    if (meshId < 0 || !this.model.mesh_vertadr) return geometry;
    const vertexStart = this.model.mesh_vertadr[meshId];
    const vertexCount = this.model.mesh_vertnum[meshId];
    const faceStart = this.model.mesh_faceadr[meshId];
    const faceCount = this.model.mesh_facenum[meshId];
    const positions = this.model.mesh_vert.slice(vertexStart * 3, (vertexStart + vertexCount) * 3);
    const faces = this.model.mesh_face.slice(faceStart * 3, (faceStart + faceCount) * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(faces), 1));
    geometry.computeVertexNormals();
    return geometry;
  }

  updateScene(forceRebuild = false) {
    if (!this.model || !this.data) return;
    this.mujoco.mjv_updateScene(
      this.model,
      this.data,
      this.option,
      this.perturb,
      this.mjCamera,
      this.mujoco.mjtCatBit.mjCAT_ALL.value,
      this.mjScene,
    );
    const geoms = this.mjScene.geoms;
    const count = geoms.size();
    if (forceRebuild) this.clearMeshes();
    for (let i = 0; i < count; i += 1) {
      const mjGeom = geoms.get(i);
      let mesh = this.meshes[i];
      if (!mesh) {
        const material = new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0.04 });
        mesh = new THREE.Mesh(this.getGeometry(mjGeom), material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.meshes.push(mesh);
        this.scene.add(mesh);
      }
      mesh.visible = true;
      mesh.material.color.setRGB(mjGeom.rgba[0], mjGeom.rgba[1], mjGeom.rgba[2]);
      mesh.material.opacity = mjGeom.rgba[3];
      mesh.material.transparent = mjGeom.rgba[3] < 0.999;
      mesh.matrixAutoUpdate = false;
      mesh.matrix.set(
        mjGeom.mat[0], mjGeom.mat[1], mjGeom.mat[2], mjGeom.pos[0],
        mjGeom.mat[3], mjGeom.mat[4], mjGeom.mat[5], mjGeom.pos[1],
        mjGeom.mat[6], mjGeom.mat[7], mjGeom.mat[8], mjGeom.pos[2],
        0, 0, 0, 1,
      );
      mesh.matrixWorldNeedsUpdate = true;
      const isModelGeom = mjGeom.objtype === this.mujoco.mjtObj.mjOBJ_GEOM.value && mjGeom.objid >= 0;
      mesh.userData.bodyId = isModelGeom ? this.model.geom_bodyid[mjGeom.objid] : -1;
      mesh.userData.geomId = isModelGeom ? mjGeom.objid : -1;
      mjGeom.delete();
    }
    for (let i = count; i < this.meshes.length; i += 1) this.meshes[i].visible = false;
    geoms.delete();
  }

  animate() {
    const frame = (now) => {
      const elapsed = Math.min((now - this.lastFrame) / 1000, 0.05);
      this.lastFrame = now;
      if (this.model && this.data && !this.paused) {
        const timestep = this.model.opt.timestep;
        this.timeAccumulator = Math.min(this.timeAccumulator + elapsed, 0.1);
        while (this.timeAccumulator >= timestep) {
          this.applyDragForce();
          this.mujoco.mj_step(this.model, this.data);
          this.timeAccumulator -= timestep;
        }
        this.updateScene();
        this.emitSample(false, now);
      }
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.callbacks.onTime?.(this.data?.time || 0);
      this.frameId = requestAnimationFrame(frame);
    };
    this.frameId = requestAnimationFrame(frame);
  }

  emitSample(force = false, now = performance.now()) {
    if (!force && now - this.lastSample < 50) return;
    this.lastSample = now;
    this.callbacks.onSample?.({ time: this.data.time, values: this.readObservations() });
  }

  readObservations() {
    const values = {};
    for (const item of this.observe?.joints || []) {
      const jointId = this.mujoco.mj_name2id(this.model, this.mujoco.mjtObj.mjOBJ_JOINT.value, item.name);
      if (jointId < 0) continue;
      const qpos = this.model.jnt_qposadr[jointId];
      const dof = this.model.jnt_dofadr[jointId];
      for (const field of item.fields || []) {
        const key = `joint.${item.name}.${field}`;
        if (field === "position") values[key] = this.data.qpos[qpos];
        if (field === "velocity") values[key] = this.data.qvel[dof];
        if (field === "acceleration") values[key] = this.data.qacc[dof];
        if (field === "force") values[key] = this.data.qfrc_passive[dof] + this.data.qfrc_actuator[dof] + this.data.qfrc_applied[dof];
      }
    }
    for (const item of this.observe?.bodies || []) {
      const bodyId = this.mujoco.mj_name2id(this.model, this.mujoco.mjtObj.mjOBJ_BODY.value, item.name);
      if (bodyId < 0) continue;
      for (const field of item.fields || []) {
        if (field === "position") {
          "xyz".split("").forEach((axis, index) => {
            values[`body.${item.name}.position.${axis}`] = this.data.xpos[bodyId * 3 + index];
          });
        }
        if (field === "velocity") {
          ["wx", "wy", "wz", "vx", "vy", "vz"].forEach((axis, index) => {
            values[`body.${item.name}.velocity.${axis}`] = this.data.cvel[bodyId * 6 + index];
          });
        }
      }
    }
    return values;
  }

  pointerFromEvent(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  handlePointerDown(event) {
    if (this.mode !== "drag" || event.button !== 0 || !this.model) return;
    this.pointerFromEvent(event);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.meshes.filter((mesh) => mesh.visible && mesh.userData.bodyId > 0))[0];
    if (!hit) return;
    event.preventDefault();
    event.stopPropagation();
    const normal = new THREE.Vector3();
    this.camera.getWorldDirection(normal);
    this.dragPlane.setFromNormalAndCoplanarPoint(normal, hit.point);
    this.dragTarget.copy(hit.point);
    this.drag = { bodyId: hit.object.userData.bodyId, pointerId: event.pointerId };
    this.renderer.domElement.setPointerCapture(event.pointerId);
    this.callbacks.onSelection?.(`body #${this.drag.bodyId}`);
  }

  handlePointerMove(event) {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;
    this.pointerFromEvent(event);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.raycaster.ray.intersectPlane(this.dragPlane, this.dragTarget);
  }

  handlePointerUp(event) {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;
    this.clearDrag();
  }

  applyDragForce() {
    if (!this.drag || !this.data) return;
    const bodyId = this.drag.bodyId;
    const position = new THREE.Vector3(
      this.data.xpos[bodyId * 3],
      this.data.xpos[bodyId * 3 + 1],
      this.data.xpos[bodyId * 3 + 2],
    );
    const velocity = new THREE.Vector3(
      this.data.cvel[bodyId * 6 + 3],
      this.data.cvel[bodyId * 6 + 4],
      this.data.cvel[bodyId * 6 + 5],
    );
    const force = this.dragTarget.clone().sub(position).multiplyScalar(120).addScaledVector(velocity, -18);
    if (force.length() > 300) force.setLength(300);
    const offset = bodyId * 6;
    this.data.xfrc_applied[offset] = force.x;
    this.data.xfrc_applied[offset + 1] = force.y;
    this.data.xfrc_applied[offset + 2] = force.z;
  }

  clearDrag() {
    if (this.drag && this.data) {
      const offset = this.drag.bodyId * 6;
      for (let i = 0; i < 6; i += 1) this.data.xfrc_applied[offset + i] = 0;
    }
    this.drag = null;
    this.callbacks.onSelection?.("");
  }

  dispose() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.disposeModel();
    for (const key of ["mjCamera", "perturb", "option"]) this[key]?.delete();
    this.controls.dispose();
    this.resizeObserver.disconnect();
    this.renderer.dispose();
  }
}
