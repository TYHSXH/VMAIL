import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as THREE from "three";
import loadMujoco from "@mujoco/mujoco";
import { MujocoBrowserViewer } from "../frontend/mujoco-viewer.js";
import { decodePreviewBundle } from "../frontend/preview-bundle.js";
import { applyLoads } from "../frontend/loads.js";
import { forecastLoads } from "../frontend/load-preview.js";
import katex from "katex";

const mj = await loadMujoco();
globalThis.window = { devicePixelRatio: 1 };

async function createViewer(xml, callbacks = {}, assets = {}, jointLimits = null, program = null) {
  // Exercise the production scene adapter without requiring a GPU context.
  const viewer = Object.create(MujocoBrowserViewer.prototype);
  Object.assign(viewer, {
    mujoco: mj, callbacks, meshes: [], geometryCache: new Map(), scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(), controls: { target: new THREE.Vector3(), update() {} },
    renderer: { shadowMap: {}, setPixelRatio() {}, domElement: {} },
    option: new mj.MjvOption(), perturb: new mj.MjvPerturb(), mjCamera: new mj.MjvCamera(),
    model: null, data: null, mjScene: null, drag: null, initialState: [],
    configuredTimestep: .001, duration: Infinity, sampleInterval: .001, resetKeyframe: -1,
  });
  await viewer.loadModel(xml, [], {}, assets, null, jointLimits, program);
  return viewer;
}
function destroy(viewer) {
  viewer.disposeModel();
  viewer.option.delete(); viewer.perturb.delete(); viewer.mjCamera.delete();
}
function sceneGeom(viewer, predicate) {
  const geoms = viewer.mjScene.geoms;
  try {
    for (let i = 0; i < geoms.size(); i++) {
      const geom = geoms.get(i);
      if (predicate(geom)) { const result = { index: i, id: geom.objid }; geom.delete(); return result; }
      geom.delete();
    }
  } finally { geoms.delete(); }
  throw new Error("Expected scene geometry was not generated");
}
const meshXml = `<mujoco><asset>
  <mesh name="a" vertex="0 0 0  1 0 0  0 1 0  0 0 1"/>
  <mesh name="b" vertex="0 0 0  2 0 0  0 2 0  0 0 2"/>
</asset><worldbody><geom name="first" type="mesh" mesh="a" group="0"/>
<geom name="second" type="mesh" mesh="b" pos="3 4 5" group="1"/></worldbody></mujoco>`;

test("scene mesh encoding selects the correct vertices and world transform", async () => {
  const viewer = await createViewer(meshXml);
  try {
    for (let id = 0; id < 2; id++) {
      const { index } = sceneGeom(viewer, geom => geom.objid === id && geom.type === mj.mjtGeom.mjGEOM_MESH.value);
      const meshId = viewer.model.geom_dataid[id], start = 3 * viewer.model.mesh_vertadr[meshId], size = 3 * viewer.model.mesh_vertnum[meshId];
      assert.deepEqual(viewer.meshes[index].geometry.attributes.position.array, viewer.model.mesh_vert.slice(start, start + size));
      const position = new THREE.Vector3().setFromMatrixPosition(viewer.meshes[index].matrix);
      for (let axis = 0; axis < 3; axis++) assert.ok(Math.abs(position.getComponent(axis) - viewer.data.geom_xpos[3 * id + axis]) < 1e-6);
    }
  } finally { destroy(viewer); }
});

test("scene reordering replaces geometry rather than retaining a different body shape", async () => {
  const viewer = await createViewer(meshXml);
  try {
    const old = viewer.meshes[0].geometry;
    viewer.option.geomgroup[0] = 0;
    viewer.updateScene();
    assert.notEqual(viewer.meshes[0].geometry, old);
    assert.equal(viewer.meshes[0].userData.geomId, 1);
    assert.equal(viewer.meshes[1].visible, false);
  } finally { destroy(viewer); }
});

for (const dimension of [1, 2, 3]) test(`flex dimension ${dimension} draws current world vertices and updates without reallocating`, async () => {
  const count = dimension === 1 ? "3 1 1" : dimension === 2 ? "3 3 1" : "3 3 3";
  const viewer = await createViewer(`<mujoco><worldbody><flexcomp name="test" type="grid" dim="${dimension}" count="${count}" spacing=".1 .1 .1" pos="1 2 3" mass="1"/></worldbody></mujoco>`, { recordSamples: false });
  try {
    const { index, id } = sceneGeom(viewer, geom => geom.type === mj.mjtGeom.mjGEOM_FLEX.value);
    const mesh = viewer.meshes[index], geometry = mesh.geometry;
    const positions = geometry.attributes.position;
    assert.ok(geometry.drawRange.count > 0);
    assert.ok(positions.array.every(Number.isFinite));
    assert.equal(viewer.getInteractiveControls().joints.length, 0, "Hide automatically generated internal flex joints");
    assert.ok(mesh.matrix.equals(new THREE.Matrix4()));
    if (dimension > 1) {
      const start = 9 * viewer.mjScene.flexfaceadr[id], length = 9 * viewer.mjScene.flexfaceused[id];
      assert.deepEqual(positions.array.slice(0, length), viewer.mjScene.flexface.slice(start, start + length));
    }
    const before = positions.array.slice();
    viewer.step(15);
    assert.equal(viewer.meshes[index].geometry, geometry);
    assert.equal(geometry.attributes.position, positions);
    assert.notDeepEqual(positions.array, before);
  } finally { destroy(viewer); }
});

test("skin surface uses deformed vertices without applying the bone pose twice", async () => {
  const viewer = await createViewer(`<mujoco><worldbody><body name="b" pos="1 2 3"><freejoint/><geom size=".1"/></body></worldbody><deformable><skin name="surface" vertex="0 0 0  1 0 0  0 1 0" face="0 1 2"><bone body="b" bindpos="0 0 0" bindquat="1 0 0 0" vertid="0 1 2" vertweight="1 1 1"/></skin></deformable></mujoco>`, { recordSamples: false });
  try {
    const { index, id } = sceneGeom(viewer, geom => geom.type === mj.mjtGeom.mjGEOM_SKIN.value);
    const mesh = viewer.meshes[index], start = 3 * viewer.mjScene.skinvertadr[id], length = 3 * viewer.mjScene.skinvertnum[id];
    assert.deepEqual(mesh.geometry.attributes.position.array, viewer.mjScene.skinvert.slice(start, start + length));
    assert.deepEqual(Array.from(mesh.geometry.index.array), [0, 1, 2]);
    assert.ok(mesh.matrix.equals(new THREE.Matrix4()));
    const before = mesh.geometry.attributes.position.array.slice(); viewer.step(15);
    assert.notDeepEqual(mesh.geometry.attributes.position.array, before);
  } finally { destroy(viewer); }
});

test("preview uses home keyframe including controls; task viewer keeps its initial state", async () => {
  const xml = '<mujoco><worldbody><body><joint name="j" type="slide"/><geom size=".1"/></body></worldbody><actuator><position joint="j"/></actuator><keyframe><key name="other" qpos=".1"/><key name="home" qpos=".4" ctrl=".4"/></keyframe></mujoco>';
  let samples = 0;
  const viewer = await createViewer(xml, { useModelKeyframe: true, recordSamples: false, onSample() { samples++; } });
  try {
    assert.equal(viewer.resetKeyframe, 1); assert.equal(viewer.data.qpos[0], .4); assert.equal(viewer.data.ctrl[0], .4);
    viewer.step(10); viewer.reset(); assert.equal(viewer.data.qpos[0], .4); assert.equal(viewer.data.time, 0); assert.equal(samples, 0);
  } finally { destroy(viewer); }
  const task = await createViewer(xml);
  try { assert.equal(task.data.qpos[0], 0); } finally { destroy(task); }
});

test("binary resource decoding is exact and rejects truncated transfers", () => {
  const header = new TextEncoder().encode(JSON.stringify({ xml: "<mujoco/>", name: "中文", assets: [{ name: "mesh.stl", bytes: 4 }] }));
  const buffer = new ArrayBuffer(4 + header.length + 4);
  new DataView(buffer).setUint32(0, header.length, true);
  new Uint8Array(buffer, 4, header.length).set(header); new Uint8Array(buffer, 4 + header.length).set([0, 127, 128, 255]);
  const result = decodePreviewBundle(buffer);
  assert.deepEqual(Array.from(result.assets["mesh.stl"]), [0, 127, 128, 255]); assert.equal(result.name, "中文");
  assert.throws(() => decodePreviewBundle(buffer.slice(0, -1)), /不完整/);
});

test("joint adjustments respect real limits, pause and stay outside the recorder", async () => {
  let samples = 0;
  const viewer = await createViewer('<mujoco><worldbody><body><joint name="hinge" range="-30 30"/><geom size=".1"/><body><joint name="slide" type="slide" limited="false" range="-.1 .1"/><geom size=".1" pos="0 0 .3"/></body></body></worldbody></mujoco>', { onSample() { samples++; } }, {}, [true, false]);
  try {
    const controls = viewer.getInteractiveControls();
    assert.equal(controls.joints[0].limited, true); assert.equal(controls.joints[1].limited, false);
    const before = samples;
    viewer.setPaused(false); viewer.setJointPosition(0, 10);
    assert.ok(viewer.paused && viewer.posePrepared); assert.equal(viewer.getTime(), 0);
    assert.ok(Math.abs(viewer.getJointPosition("hinge") - Math.PI / 6) < 1e-10);
    assert.equal(samples, before);
    viewer.setJointPosition(1, .5); assert.equal(viewer.getJointPosition(1), .5);
    viewer.beginPreparedExperiment(); assert.equal(viewer.posePrepared, false);
    viewer.step(1); assert.ok(viewer.getTime() > 0); assert.ok(samples > before);
  } finally { destroy(viewer); }
});

test("free joints are not exposed or overwritten as scalar controls", async () => {
  const viewer = await createViewer('<mujoco><worldbody><body><freejoint/><geom size=".1"/></body></worldbody></mujoco>');
  try {
    assert.equal(viewer.getInteractiveControls().joints.length, 0);
    const before = viewer.data.qpos.slice(); viewer.setJointPosition(0, 5);
    assert.deepEqual(viewer.data.qpos, before);
  } finally { destroy(viewer); }
});

for (const task of ["slider_crank_block_force", "rolling_disk_points_bc"]) test(`${task}: full-turn crank adjustment preserves closed-loop constraints without recording`, async () => {
  let samples = 0;
  const xml = readFileSync(new URL(`../tasks/${task}/model.xml`, import.meta.url), "utf8");
  const viewer = await createViewer(xml, { onSample() { samples++; } });
  try {
    const joints = viewer.getInteractiveControls().joints;
    const crank = joints.find(joint => joint.name === "crank_hinge");
    assert.ok(crank); assert.ok(crank.cyclic);
    assert.equal(crank.min, 0); assert.equal(crank.max, Math.PI * 2);
    const actuator=viewer.getInteractiveControls().actuators[0];
    viewer.setActuatorControl(actuator.id,task==="slider_crank_block_force"?1:-2);
    mj.mj_forward(viewer.model,viewer.data);viewer.updateDiagnostics();
    const driveForce=viewer.data.actuator_force[actuator.id];assert.ok(Math.abs(driveForce)>0);
    assert.ok(viewer.overlays.items.get(`moment:joint:${crank.id}`).visible);
    viewer.setActuatorLoadVisibility({[actuator.name]:{show_load:false}});
    assert.equal(viewer.overlays.items.get(`moment:joint:${crank.id}`).visible,false);
    assert.equal(viewer.data.actuator_force[actuator.id],driveForce,"Hiding an internal drive must not change its physical output");
    const before = samples;
    for (const degrees of [60, 120, 180, 270, 360, 0]) {
      assert.equal(viewer.setJointPosition(crank.id, degrees * Math.PI / 180), true, `Failed to set ${degrees} degrees`);
      assert.ok(Math.abs(viewer.getJointPosition(crank.id) - degrees * Math.PI / 180) < 1e-10);
      for (let row = 0; row < viewer.data.nefc; row++) {
        if (viewer.data.efc_type[row] === mj.mjtConstraint.mjCNSTR_EQUALITY.value) assert.ok(Math.abs(viewer.data.efc_pos[row]) < 1e-6);
      }
      assert.equal(viewer.getTime(), 0); assert.equal(samples, before);
    }
    if (task === "slider_crank_block_force") {
      const slider = joints.find(joint => joint.name === "slider_x");
      const pose = viewer.data.qpos.slice();
      assert.equal(viewer.setJointPosition(slider.id, .03), false, "Unreachable slider pose should be rejected");
      assert.deepEqual(viewer.data.qpos, pose);
      assert.equal(viewer.setJointPosition(slider.id, -.3), true, "Slider can also drive the linkage from its straight configuration");
    }
  } finally { destroy(viewer); }
});

const projectPython = fileURLToPath(new URL(process.platform === "win32" ? "../.venv/Scripts/python.exe" : "../.venv/bin/python", import.meta.url));
const nativeLoads = JSON.parse(execFileSync(process.env.VMAIL_TEST_PYTHON || (existsSync(projectPython) ? projectPython : "python"),
  [fileURLToPath(new URL("export_load_cases.py", import.meta.url))], { encoding: "utf8" }));

test("WASM and Python agree on feedback, table signals, body frames and eccentric force moments", async () => {
  const viewer = await createViewer(nativeLoads.xml, {}, {}, null, nativeLoads.program);
  try {
    for (const item of nativeLoads.cases) {
      viewer.data.time = item.time; viewer.data.qpos.set(item.qpos); viewer.data.qvel.set(item.qvel);
      mj.mj_forward(viewer.model, viewer.data);
      const values = applyLoads(nativeLoads.program, viewer.model, viewer.data);
      for (const key of Object.keys(item.values)) assert.ok(Math.abs(values[key] - item.values[key]) < 1e-10, key);
      for (const [array, expected] of [[viewer.data.qfrc_applied,item.qfrc],[viewer.data.xfrc_applied,item.xfrc]]) {
        array.forEach((value,i) => assert.ok(Math.abs(value-expected[i]) < 1e-10));
      }
    }
  } finally { destroy(viewer); }
});

test("real-time steps match native batch trajectory and pause preparation disables configured loads", async () => {
  const { payload, series } = nativeLoads.demo;
  const viewer = await createViewer(payload.xml, {}, payload.assets, payload.joint_limits, payload.load_program);
  try {
    viewer.observe = payload.observe;
    viewer.step(50);
    const values = { ...viewer.readObservations(), ...viewer.loadValues };
    assert.ok(Math.abs(viewer.getTime() - .1) < 1e-12);
    for (const [key, expected] of Object.entries(series)) {
      if (key !== "time") assert.ok(Math.abs(values[key] - expected.at(-1)) < 1e-9, key);
    }
    const pose = viewer.data.qpos.slice();
    viewer.prepareJointPose();
    assert.ok(viewer.data.xfrc_applied.every(value => value === 0));
    assert.ok(viewer.data.qfrc_applied.every(value => value === 0));
    viewer.applyTaskLoads();
    assert.ok(viewer.data.xfrc_applied.every(value => value === 0));
    assert.deepEqual(viewer.data.qpos, pose);
    viewer.beginPreparedExperiment();
    assert.equal(viewer.getTime(), 0);
    assert.equal(viewer.loadValues["load.tip_force.fx"], 2);
    viewer.reset();
    assert.ok(viewer.data.qpos.every(value => value === 0));
    assert.equal(viewer.loadValues["load.tip_force.fx"], 2);
  } finally { destroy(viewer); }
});

test("a later invalid load pauses WASM without integrating the invalid force", async () => {
  const program = structuredClone(nativeLoads.program);
  program.entries = [program.entries.find(entry => entry.type === "joint")];
  program.entries[0].value = ["/", 1, ["-", 1, ["t"]]];
  let error = "";
  const viewer = await createViewer(nativeLoads.xml, {onError(message) { error = message; }}, {}, null, program);
  try {
    viewer.data.time = 1; viewer.setPaused(false); viewer.step();
    assert.ok(viewer.paused); assert.equal(viewer.getTime(), 1);
    assert.match(error, /t=1/);
    assert.ok(viewer.data.qpos.every(Number.isFinite));
  } finally { destroy(viewer); }
});

test("full-horizon forecasts match batch inputs and never alter live state or timestep", async () => {
  const {payload,series}=nativeLoads.demo;
  const viewer=await createViewer(payload.xml,{},payload.assets,payload.joint_limits,payload.load_program);
  try{
    viewer.step(20);
    const before={qpos:viewer.data.qpos.slice(),qvel:viewer.data.qvel.slice(),ctrl:viewer.data.ctrl.slice(),time:viewer.data.time,timestep:viewer.model.opt.timestep};
    const prediction=await forecastLoads(viewer,.1);
    assert.equal(prediction.time[0],0);assert.ok(Math.abs(prediction.time.at(-1)-.1)<1e-10);
    for(const key of Object.keys(payload.load_program.units))assert.ok(Math.abs(prediction[key].at(-1)-series[key].at(-1))<1e-9,key);
    assert.deepEqual(viewer.data.qpos,before.qpos);assert.deepEqual(viewer.data.qvel,before.qvel);assert.deepEqual(viewer.data.ctrl,before.ctrl);
    assert.equal(viewer.data.time,before.time);assert.equal(viewer.model.opt.timestep,before.timestep);
    const longer=await forecastLoads(viewer,.2);assert.ok(Math.abs(longer.time.at(-1)-.2)<1e-10);
    await assert.rejects(()=>forecastLoads(viewer,.1,{cancelled:()=>true}),{name:"AbortError"});
    assert.equal(viewer.model.opt.timestep,before.timestep);
    for(const entry of payload.load_program.entries)for(const rows of Object.values(entry.math))for(const tex of Array.isArray(rows)?rows:[rows]){
      assert.doesNotThrow(()=>katex.renderToString(tex,{throwOnError:true,strict:"ignore"}));
    }
  }finally{destroy(viewer);}
});

test("inertia, COM, world joint axes and point-force/couple overlays follow physics state",async()=>{
  const {payload}=nativeLoads.demo;
  const viewer=await createViewer(payload.xml,{},payload.assets,payload.joint_limits,payload.load_program);
  try{
    viewer.setOverlay("com",true);viewer.setOverlay("inertia",true);viewer.setOverlay("joints",true);
    const {items}=viewer.overlays;
    const center=new THREE.Vector3().fromArray(viewer.data.xipos,3);
    assert.ok(items.get("com:1").position.distanceTo(center)<1e-12);
    const inertia=viewer.model.body_inertia,mass=viewer.model.body_mass[1];
    assert.ok(Math.abs(items.get("inertia:1").scale.x-Math.sqrt(6*(inertia[4]+inertia[5]-inertia[3])/mass))<1e-12);
    assert.deepEqual(items.get("axis:2").userData.vector,Array.from(viewer.data.xaxis.subarray(6,9)));
    const force=items.get("force:tip_force");assert.ok(force.visible);
    const site=viewer.loadProgram.entries[0].site;
    assert.ok(force.position.distanceTo(new THREE.Vector3().fromArray(viewer.data.site_xpos,site*3))<1e-12);
    assert.deepEqual(force.userData.vector,[2,0,0]);
    viewer.data.time=.1;viewer.applyTaskLoads();viewer.updateDiagnostics();
    const moment=items.get("moment:tip_force");
    assert.ok(Math.abs(moment.userData.vector[2]-.4*Math.sin(2*Math.PI*.5*.1))<1e-10,"Draw the free couple, not a duplicate eccentric moment");
    viewer.posePrepared=true;
    viewer.drag={bodyId:1,localPoint:new THREE.Vector3(.5,0,0),force:new THREE.Vector3(0,3,0)};
    viewer.dragTarget=new THREE.Vector3(1,2,3);viewer.updateDiagnostics();
    const drag=items.get("drag:target");
    const point=viewer.drag.localPoint.clone().applyMatrix3(new THREE.Matrix3().set(...viewer.data.xmat.subarray(9,18))).add(new THREE.Vector3().fromArray(viewer.data.xpos,3));
    assert.ok(drag.position.distanceTo(point)<1e-12);
    assert.ok(new THREE.Vector3(0,1,0).applyQuaternion(drag.quaternion).multiplyScalar(drag.cone.position.y).add(drag.position).distanceTo(viewer.dragTarget)<1e-12);
    assert.equal(force.visible,false);
    viewer.data.qpos[0]=.3;viewer.data.qpos[2]=Math.PI/2;mj.mj_forward(viewer.model,viewer.data);viewer.updateDiagnostics();
    assert.ok(drag.position.distanceTo(new THREE.Vector3(.3,.5,0))<1e-12,"The arrow origin follows the current body pose, not the last force evaluation");
    assert.ok(new THREE.Vector3(0,1,0).applyQuaternion(drag.quaternion).multiplyScalar(drag.cone.position.y).add(drag.position).distanceTo(viewer.dragTarget)<1e-12);
    assert.equal(items.get("moment:tip_force").visible,false,"Task loads are hidden during drag preparation");
    viewer.dragTarget.copy(drag.position);viewer.updateDiagnostics();assert.equal(drag.visible,false,"Zero-length drag connections are hidden");
    viewer.drag=null;viewer.posePrepared=false;viewer.setOverlay("loads",false);
    assert.equal(items.get("drag:target").visible,false);assert.equal(force.visible,false);
  }finally{viewer.drag=null;destroy(viewer);}
});
