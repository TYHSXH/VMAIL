import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source=fs.readFileSync(new URL("../frontend/main.js",import.meta.url),"utf8");
function extract(name,next){return source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${next}(`));}

test("same-time pose updates replace the sample, and missing observations stay aligned",()=>{
  const state={task:{id:"a"},seriesMode:"realtime",series:{time:[]},batch:null,chartFrameId:1};
  const el={exportData:{},dataSource:{}};
  const fn=new Function("state","el","requestAnimationFrame","clearSeries",extract("appendSample","clearSeries")+";return appendSample;")(state,el,()=>1,()=>{});
  fn({time:0,values:{position:.6,velocity:1}});
  fn({time:0,values:{position:1,velocity:2}});
  fn({time:.01,values:{position:1.1}});
  assert.deepEqual(state.series.time,[0,.01]);
  assert.deepEqual(state.series.position,[1,1.1]);
  assert.deepEqual(state.series.velocity,[2,null]);
});

test("realtime callbacks cannot append to batch results",()=>{
  const state={task:{id:"a"},seriesMode:"batch",series:{time:[0,1]},batch:null};
  const fn=new Function("state",extract("appendSample","clearSeries")+";return appendSample;")(state);
  fn({time:.1,values:{position:2}});
  assert.deepEqual(state.series,{time:[0,1]});
});

test("late batch result cannot replace another task's data",async()=>{
  const start=source.indexOf("async function runBatchSimulation(");
  const code=source.slice(start,source.indexOf("function setMode(",start));
  const state={task:{id:"a"},selectionVersion:1,experimentVersion:0,viewer:{setPaused(){},getActuatorControlValues(){return{};}},viewerTaskId:"a",series:{time:[9]},batch:null};
  const el={runButton:{},cancelRun:{classList:{remove(){},add(){}}},dataSource:{},exportData:{}};
  let resolve;
  const fn=new Function("state","el","requestJson","collectParameters","simulationSettings","setPlaybackEnabled","clearSeries","charts","showMessage","loadResultHistory",code+";return runBatchSimulation;")(state,el,()=>new Promise(r=>{resolve=r;}),()=>({}),()=>({duration:1,timestep:.01}),()=>{},()=>{throw Error("stale result reached clearSeries");},{},()=>{},()=>{});
  const pending=fn();state.task={id:"b"};state.selectionVersion++;
  resolve({series:{time:[0,1]},units:{time:"s"},saved:{run_id:"test"}});
  await pending;
  assert.deepEqual(state.series.time,[9]);
});
