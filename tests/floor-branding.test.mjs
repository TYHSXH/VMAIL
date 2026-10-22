import assert from "node:assert/strict";
import { test } from "node:test";
import * as THREE from "three";
import { FloorBranding } from "../frontend/floor-branding.js";

test("floor logo is large, centered, visual-only and reused without reallocating", () => {
  const branding = new FloorBranding({ texture: new THREE.Texture() });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial());
  const mujoco = { mjtGeom: { mjGEOM_PLANE: { value: 0 } }, mjtObj: { mjOBJ_GEOM: { value: 5 } } };
  const model = { geom_bodyid: [0], stat: { extent: 2 } };
  const floor = { type: 0, objtype: 5, objid: 0, mat: [1,0,0,0,1,0,0,0,1], size: [5,5,.1] };
  branding.update(mesh, floor, model, mujoco);
  const logo = mesh.userData.floorLogo;
  assert.equal(logo.position.x, 0);
  assert.equal(logo.position.y, 0);
  assert.equal(logo.scale.x, 1.9);
  assert.ok(mesh.material.color.r < .1);
  assert.equal(logo.material.depthWrite, false);
  const intersections = [];
  logo.raycast(null, intersections);
  assert.equal(intersections.length, 0);
  branding.update(mesh, floor, model, mujoco);
  assert.equal(mesh.children.length, 1);
  assert.equal(mesh.userData.floorLogo, logo);
  // Reordered scene slots can become walls or dynamic bodies.
  branding.update(mesh, { ...floor, mat: [1,0,0,0,0,1,0,1,0] }, model, mujoco);
  assert.equal(logo.visible, false);
  branding.update(mesh, floor, { ...model, geom_bodyid: [1] }, mujoco);
  assert.equal(logo.visible, false);
  branding.dispose();
  mesh.geometry.dispose();
  mesh.material.dispose();
});
