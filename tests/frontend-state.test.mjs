import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source=fs.readFileSync(new URL("../frontend/main.js",import.meta.url),"utf8");
function extract(name,next){return source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${next}(`));}

test("same-time pose updates replace the sample, and missing observations stay aligned",()=>{
  const state={task:{id:"a"},seriesMode:"realtime",series:{time:[]},batch:null,chartFrameId:1};
  const el={exportData:{},runButton:{},dataSource:{}};
  const fn=new Function("state","el","requestAnimationFrame","clearSeries",extract("appendSample","clearSeries")+";return appendSample;")(state,el,()=>1,()=>{});
  fn({time:0,values:{position:.6,velocity:1}});
  fn({time:0,values:{position:1,velocity:2}});
  fn({time:.01,values:{position:1.1}});
  assert.deepEqual(state.series.time,[0,.01]);
  assert.deepEqual(state.series.position,[1,1.1]);
  assert.deepEqual(state.series.velocity,[2,null]);
});

test("pose preparation and model loading cannot append experiment samples",()=>{
  for(const mode of ["preparing", "loading"]){
    const state={task:{id:"a"},seriesMode:mode,series:{time:[0,1]},batch:null};
    const fn=new Function("state",extract("appendSample","clearSeries")+";return appendSample;")(state);
    fn({time:.1,values:{position:2}});
    assert.deepEqual(state.series,{time:[0,1]});
  }
});

test("late batch result cannot replace another task's data",async()=>{
  const start=source.indexOf("async function runBatchSimulation(");
  const code=source.slice(start,source.indexOf("function setMode(",start));
  const state={task:{id:"a"},experiment:{completed:{request:{parameters:{mass:2},duration:1,timestep:.01,replay:{initial_state:[0,1]}}}},selectionVersion:1,viewer:{setPaused(){},getActuatorControlValues(){return{};}},viewerTaskId:"a",series:{time:[9]},batch:null};
  const el={runButton:{},cancelRun:{classList:{remove(){},add(){}}},dataSource:{},exportData:{}};
  let resolve;
  const fn=new Function("state","el","requestJson","setPlaybackEnabled","showMessage","loadResultHistory",code+";return runBatchSimulation;")(state,el,()=>new Promise(r=>{resolve=r;}),()=>{},()=>{},()=>{});
  const pending=fn();state.task={id:"b"};state.selectionVersion++;
  resolve({series:{time:[0,1]},units:{time:"s"},saved:{run_id:"test"}});
  await pending;
  assert.deepEqual(state.series.time,[9]);
});
test("native replay requires a completed browser experiment before making any request",async()=>{
  const start=source.indexOf("async function runBatchSimulation(");
  const code=source.slice(start,source.indexOf("function setMode(",start));
  const messages=[];
  const fn=new Function("state","showMessage",code+";return runBatchSimulation;")({task:{id:"a"},batch:null,experiment:null},message=>messages.push(message));
  await fn();
  assert.match(messages[0],/先完成一次网页仿真/);
});

test("native replay submits frozen start conditions and preserves the browser dataset",async()=>{
  const start=source.indexOf("async function runBatchSimulation(");
  const code=source.slice(start,source.indexOf("function setMode(",start));
  const completed={request:{parameters:{mass:2},duration:.1,timestep:.005,replay:{initial_state:[0,.31,0],control_events:[{step:5,controls:[1]}],sample_steps:[0,20]}}};
  const series={time:[0,.1],position:[.31,.30]};
  const state={task:{id:"a"},experiment:{completed},selectionVersion:1,viewerTaskId:"a",viewer:{model:{},setPaused(){},getActuatorControlValues(){throw Error("must not read final controls");}},series,batch:null};
  const el={runButton:{},cancelRun:{classList:{remove(){},add(){}}},dataSource:{},exportData:{}};
  let sent,downloaded=false;
  const request=async(path,options)=>{sent=JSON.parse(options.body);return{series,units:{time:"s"},saved:{run_id:"test"}};};
  const fn=new Function("state","el","requestJson","setPlaybackEnabled","showMessage","loadResultHistory","compareExperiments","document",code+";return runBatchSimulation;")(state,el,request,()=>{},()=>{},()=>{},()=>({consistent:true}),{createElement:()=>({click(){downloaded=true;}})});
  await fn();
  assert.deepEqual(sent.parameters,{mass:2});
  assert.deepEqual(sent.replay,completed.request.replay);
  assert.equal(state.series,series);
  assert.equal(state.experiment.completed,completed);
  assert.equal(downloaded,true);
});
