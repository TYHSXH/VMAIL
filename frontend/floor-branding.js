import * as THREE from "three";

// A visual decal only: collision geometry, friction and model files are untouched.
export class FloorBranding {
  constructor({ texture, onLoad = () => {} } = {}) {
    this.texture = texture || new THREE.TextureLoader().load(new URL("../assets/logos/logo-gray.png", import.meta.url).href, onLoad);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, alphaTest: .02, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, toneMapped: false });
  }

  update(mesh, geom, model, mujoco) {
    const floor = geom.type === mujoco.mjtGeom.mjGEOM_PLANE.value &&
      geom.objtype === mujoco.mjtObj.mjOBJ_GEOM.value && geom.objid >= 0 &&
      model.geom_bodyid[geom.objid] === 0 && geom.mat[8] > .95;
    if (mesh.userData.floorLogo) mesh.userData.floorLogo.visible = floor;
    if (!floor) return;
    mesh.material.color.setRGB(.035, .045, .06);
    if (!mesh.userData.floorLogo) {
      const logo = new THREE.Mesh(this.geometry, this.material);
      logo.position.z = .001;
      logo.renderOrder = 1;
      // Decals must not intercept body picking or dragging.
      logo.raycast = () => {};
      mesh.add(logo);
      mesh.userData.floorLogo = logo;
    }
    const extent = Math.max(.5, model.stat.extent);
    const available = 2 * Math.min(geom.size[0] || extent, geom.size[1] || extent);
    const side = Math.min(extent * .95, available * .7);
    mesh.userData.floorLogo.scale.set(side, side, 1);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.texture.dispose();
  }
}
