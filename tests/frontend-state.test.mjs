import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {forecastLoads} from "../frontend/load-preview.js";

const source=fs.readFileSync(new URL("../frontend/main.js",import.meta.url),"utf8");
function extract(name,next){return source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${next}(`));}

test("web simulation accepts one million steps and rejects one additional step",()=>{
  const el={durationInput:{value:"100"},timestepInput:{value:"0.0001"}};
  const code=source.slice(source.indexOf("function simulationSettings("),source.indexOf("async function initViewer("));
  const settings=new Function("el",code+";return simulationSettings;")(el);
  assert.deepEqual(settings(),{duration:100,timestep:.0001});
  el.durationInput.value="100.0001";
  assert.throws(settings,/1000000/);
});

test("load forecasting uses the same million-step boundary before allocating a simulation",async()=>{
  let allocated=0,deleted=0;
  const viewer={mujoco:{MjData:class {constructor(){allocated++;this.ctrl=new Float64Array();this.act=new Float64Array();}delete(){deleted++;}}},
    model:{opt:{timestep:.0001}},loadProgram:{entries:[{}],units:{}},configuredTimestep:.0001,data:{ctrl:[],act:[]}};
  await assert.rejects(forecastLoads(viewer,100,{cancelled:()=>true}),error=>error.name==="AbortError");
  assert.equal(allocated,1);assert.equal(deleted,1);
  await assert.rejects(forecastLoads(viewer,100.0001),/1000000/);
  assert.equal(allocated,1);
});

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

test("loading and native replay lock model inputs until they finish",()=>{
  const inputs=[{disabled:false},{disabled:false}],durationInput={},timestepInput={},applyParameters={};
  const state={task:{id:"a"},modelLoading:true,batch:null,runtimeRows:[]};
  const button=()=>({classList:{toggle(){}},setAttribute(){}});
  const el={parameterForm:{querySelectorAll:()=>inputs},durationInput,timestepInput,applyParameters,
    ...Object.fromEntries(["resetButton","stepButton","playButton","contactButton","homeCameraButton","shadowButton","lightingButton"].map(key=>[key,button()]))};
  const fn=new Function("state","el","document","taskJointPanel","syncRuntimeControls",extract("setPlaybackEnabled","simulationSettings")+";return setPlaybackEnabled;")(
    state,el,{querySelectorAll:()=>[]},{sync(){}},()=>{});
  fn(false);
  for(const input of [...inputs,durationInput,timestepInput,applyParameters])assert.equal(input.disabled,true);
  state.modelLoading=false;state.batch={};fn(false);
  for(const input of [...inputs,durationInput,timestepInput,applyParameters])assert.equal(input.disabled,true);
  state.batch=null;fn(false);
  for(const input of [...inputs,durationInput,timestepInput,applyParameters])assert.equal(input.disabled,false);
});

test("failed task selection restores the previous usable task without losing its data",async()=>{
  const previous={id:"old"},series={time:[0,1]};
  const state={task:previous,series,selectionVersion:0,modelLoadVersion:0,viewerTaskId:"old",viewer:{model:{},setPaused(){},setSuspended(){}}};
  const el={mujocoViewport:{classList:{remove(){}}}};
  const messages=[],enabled=[];
  const start=source.indexOf("async function selectTask(");
  const fn=new Function("state","el","loadPreview","setPlaybackEnabled","rememberViewerControls","requestJson","showMessage",source.slice(start,source.indexOf("function renderTask(",start))+";return selectTask;")(
    state,el,{clear(){}},value=>enabled.push(value),()=>{},async()=>{throw Error("任务配置损坏");},message=>messages.push(message));
  await fn("broken");
  assert.equal(state.task,previous);assert.equal(state.series,series);
  assert.equal(state.modelLoading,false);assert.equal(enabled.at(-1),true);
  assert.match(messages[0],/配置损坏/);
});

test("parameter range validation runs before model inputs are disabled",async()=>{
  const input={name:"mass",value:"-1",disabled:false,checkValidity(){return this.disabled;},reportValidity(){},focus(){}};
  const el={parameterForm:{querySelectorAll:()=>[input]},viewerLoading:{classList:{remove(){}},innerHTML:""}};
  const state={task:{id:"a",parameters:{parameters:{mass:{label:"质量"}}}},viewerReady:true,viewer:{setPaused(){}},modelLoadVersion:0};
  const requests=[],messages=[];
  const start=source.indexOf("async function loadBrowserModel(");
  const code="const escapeHtml=String;"+extract("collectParameters","rememberViewerControls")+source.slice(start,source.indexOf("function updatePlaybackButton(",start));
  const fn=new Function("state","el","loadPreview","setPlaybackEnabled","rememberViewerControls","simulationSettings","activateTab","requestJson","showMessage",code+";return loadBrowserModel;")(
    state,el,{invalidate(){}},()=>{input.disabled=Boolean(state.modelLoading);},()=>{},()=>({duration:1,timestep:.01}),()=>{},async(...args)=>{requests.push(args);},message=>messages.push(message));
  assert.equal(await fn(),false);
  assert.equal(requests.length,0);
  assert.match(messages[0],/质量/);
  assert.equal(input.disabled,false);
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
