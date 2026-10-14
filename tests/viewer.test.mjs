import {test} from "node:test";
import assert from "node:assert/strict";
import loadMujoco from "@mujoco/mujoco";
import * as THREE from "three";
import {MujocoBrowserViewer} from "../frontend/mujoco-viewer.js";

const mujoco=await loadMujoco();

test("body linear velocity uses the body's own reference point",()=>{
  const model=mujoco.MjModel.from_xml_string('<mujoco><worldbody><body name="b"><joint name="j" axis="0 0 1"/><geom size=".1" pos="1 0 0" mass="1"/><body name="c" pos="2 0 0"><joint name="k"/><geom size=".1" mass="1"/></body></body></worldbody></mujoco>');
  const data=new mujoco.MjData(model);
  data.qvel[0]=1;mujoco.mj_forward(model,data);
  const viewer=Object.create(MujocoBrowserViewer.prototype);
  Object.assign(viewer,{mujoco,model,data,observe:{bodies:[{name:"b",fields:["velocity"]},{name:"c",fields:["velocity"]}]}});
  const result=viewer.readObservations();
  assert.equal(result["body.b.velocity.vy"],1);
  assert.equal(result["body.c.velocity.vy"],2);
  assert.equal(data.cvel[10],1.5); // The subtree reference gives a different linear velocity.
  data.delete();model.delete();
});

test("forcing a same-time sample refreshes paused pose readings",()=>{
  let count=0;
  const viewer=Object.create(MujocoBrowserViewer.prototype);
  Object.assign(viewer,{data:{time:0},lastSampleTime:0,nextSampleTime:.01,sampleInterval:.01,readObservations:()=>({position:1}),callbacks:{onSample:()=>count++}});
  assert.equal(viewer.emitSample(false),false);
  assert.equal(viewer.emitSample(true),true);
  assert.equal(count,1);
});

test("resource bytes compile through the browser VFS",()=>{
  const vfs=new mujoco.MjVFS();
  vfs.addBuffer("part.xml",new TextEncoder().encode('<mujoco><worldbody><body><joint/><geom size=".1"/></body></worldbody></mujoco>'));
  const model=mujoco.MjModel.from_xml_string('<mujoco><include file="part.xml"/></mujoco>',vfs);
  assert.equal(model.njnt,1);model.delete();vfs.delete();
});

test("narrowing the viewport keeps the model framed without changing orientation",()=>{
  const viewer=Object.create(MujocoBrowserViewer.prototype);
  const camera=new THREE.PerspectiveCamera(45,1,0.01,100);
  camera.position.set(0,-2,2);
  Object.assign(viewer,{model:{},container:{clientWidth:300,clientHeight:600},camera,controls:{target:new THREE.Vector3(),update(){}},renderer:{setSize(){}}});
  const direction=camera.position.clone().normalize();
  viewer.resize();
  assert.equal(camera.aspect,.5);
  assert.ok(camera.position.clone().normalize().distanceTo(direction)<1e-12);
  assert.ok(Math.abs(camera.position.length()-Math.sqrt(8)*2)<1e-12);
});
