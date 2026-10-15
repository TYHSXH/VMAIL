import "./styles.css";
import { MujocoBrowserViewer } from "./mujoco-viewer.js";
import { ChartStack } from "./charts.js";
import { shortName } from "./labels.js";
import { renderTaskNotes } from "./task-notes.js";
import { setupModelPreview } from "./model-preview.js";
import { JointPanel } from "./joint-panel.js";

const state = {
  tasks: [],
  task: null,
  viewer: null,
  viewerReady: false,
  simulationStarted: false,
  simulationCompleted: false,
  parametersDirty: false,
  series: { time: [] },
  seriesUnits: { time: "s" },
  visibleSeries: new Set(),
  actuatorControlsByTask: new Map(),
  viewerTaskId: null,
  modelLoadVersion: 0,
  chartFrameId: null,
  latestSampleValues: null,
  selectionVersion: 0,
  experimentVersion: 0,
  batch: null,
  seriesMode: "realtime",
  modelLoading: false,
  runtimeRows: [],
};

const colors = ["#38bdf8", "#34d399", "#fb923c", "#f472b6", "#a78bfa", "#facc15"];
const el = Object.fromEntries(
  [
    "taskSidebar", "collapseTasks", "expandTasks", "refreshTasks", "taskList", "engineBadge",
    "taskTitle", "simTime", "toggleInspector", "mujocoViewport", "viewerLoading", "resetButton",
    "stepButton", "playButton", "cameraMode", "panMode", "dragMode", "contactButton", "homeCameraButton",
    "mouseHint", "selectionLabel", "inspector", "closeInspector", "parameterForm", "durationInput",
    "timestepInput", "applyParameters", "runButton", "clearData", "exportData", "chartStack", "dataSource", "resultHistory", "cancelRun", "jointControls", "actuatorControls", "taskQuestion", "topicTags", "taskNotes", "message",
    "taskResizeHandle", "inspectorResizeHandle",
  ].map((id) => [id, document.getElementById(id)]),
);

const charts = new ChartStack(el.chartStack, state);
const taskJointPanel = new JointPanel(el.jointControls, {
  getViewer: () => state.viewerTaskId === state.task?.id ? state.viewer : null,
  canEdit: () => !state.modelLoading && !state.parametersDirty && !state.batch && !state.viewer?.drag,
  onBlocked: () => showMessage("请先应用模型参数或等待计算完成，再调整关节。", true),
  onChange: () => {
    state.experimentVersion++;
    if (state.seriesMode !== "preparing") clearSeries("preparing");
    resetPlaybackState();
    el.dataSource.textContent = "关节姿态已调整，点击开始仿真后计时并采集数据。";
  },
  onReset: () => {
    state.experimentVersion++; clearSeries("preparing"); resetViewerPreservingControls();
    state.viewer.prepareJointPose(); resetPlaybackState();
    el.dataSource.textContent = "已恢复任务初始姿态，点击开始仿真后采集数据。";
  },
});
let messageTimer;
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
function showMessage(text, error = false) {
  clearTimeout(messageTimer);
  el.message.textContent = text;
  el.message.classList.toggle("hidden", !text);
  el.message.classList.toggle("error", error);
  if (text) messageTimer = window.setTimeout(() => el.message.classList.add("hidden"), error ? 10000 : 5000);
}
async function requestJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(`服务返回异常（${response.status}），请查看启动窗口。`); }
  if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : "输入无效，请检查参数和数值范围。");
  return data;
}
function activateTab(name) {
  document.querySelectorAll(".tab").forEach(button=>button.classList.toggle("active",button.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.panel===name));
  el.inspector.classList.remove("collapsed");
  if(name==="data")charts.draw();
  if(name==="parameters")taskJointPanel.sync(true);
}
function setPlaybackEnabled(enabled) {
  for(const button of [el.resetButton,el.stepButton,el.playButton,el.contactButton,el.homeCameraButton])button.disabled=!enabled;
  taskJointPanel.sync(true);
}
function simulationSettings() {
  const duration=Number(el.durationInput.value),timestep=Number(el.timestepInput.value);
  if(!el.durationInput.value || !Number.isFinite(duration) || duration<=0 || duration>3600)throw new Error("仿真时长应大于 0 且不超过 3600 秒。");
  if(!el.timestepInput.value || !Number.isFinite(timestep) || timestep<.00001)throw new Error("时间步长至少为 0.00001 秒。");
  if(Math.ceil(duration/timestep)>200000)throw new Error("单次实验最多 200000 步，请缩短时长或增大步长。");
  return {duration,timestep};
}
async function initViewer() {
  try {
    state.viewer=new MujocoBrowserViewer(el.mujocoViewport,{
      onTime:time=>{el.simTime.textContent=`t = ${time.toFixed(3)} s`;taskJointPanel.sync();},
      onSample:appendSample,
      onSelection:label=>{el.selectionLabel.textContent=label?`已选中 ${label}`:"";},
      onBeforeDrag:()=>{
        if(state.modelLoading || state.batch || state.parametersDirty){showMessage("请先应用参数或等待批量计算完成，再拖动调整姿态。",true);return false;}
        return true;
      },
      onDragStart:()=>{
        state.experimentVersion++;
        clearSeries("preparing");resetPlaybackState();setPlaybackEnabled(false);
        el.dataSource.textContent="正在拖动调整姿态，不计时、不采集数据。";
        el.mouseHint.textContent="姿态调整中 · 控制量暂时停用 · 松开后点击开始仿真";
      },
      onDragEnd:()=>{
        resetPlaybackState();
        setPlaybackEnabled(!state.modelLoading && !state.batch);
        syncRuntimeControls();
        el.dataSource.textContent="姿态已调整，点击开始仿真后才计时并采集数据。";
        el.mouseHint.textContent="按住物体调整姿态，松开后点击开始仿真";
      },
      onPausedChange:paused=>{
        if(!paused){activateTab("data");state.simulationStarted=true;state.simulationCompleted=false;}
        updatePlaybackButton();
      },
      onComplete:(time,duration)=>{state.simulationStarted=true;state.simulationCompleted=true;updatePlaybackButton();showMessage(`仿真完成：${duration.toFixed(3)} s`);},
      onError:message=>showMessage(message,true),
    });
    await state.viewer.init();state.viewerReady=true;
    el.engineBadge.textContent="MuJoCo 3.13 · 浏览器";el.engineBadge.classList.remove("loading");el.engineBadge.classList.add("ready");
    if(state.task)await loadBrowserModel();else el.viewerLoading.innerHTML="<strong>请选择学习任务</strong><span>从左侧选择任务，或拖入 XML 预览模型。</span>";
  }catch(error){el.viewerLoading.innerHTML=`<strong>物理引擎启动失败</strong><span>${escapeHtml(error.message)}</span>`;el.engineBadge.textContent="启动失败";showMessage(error.message,true);}
}
async function loadTasks(){state.tasks=(await requestJson("/api/tasks")).tasks || [];renderTaskList();}
function renderTaskList() {
  el.taskList.replaceChildren();
  if(!state.tasks.length){const p=document.createElement("p");p.className="empty-state";p.textContent="暂无任务，让 AI 创建学习任务包。";el.taskList.append(p);return;}
  for(const task of state.tasks){
    const row=document.createElement("div");row.className=`task-entry ${state.task?.id===task.id?"active":""}`;
    const button=document.createElement("button");button.type="button";button.className="task-item";button.textContent=task.title || task.id;button.addEventListener("click",()=>selectTask(task.id));
    const edit=document.createElement("button");edit.type="button";edit.className="rename-task";edit.textContent="✎";edit.title="修改任务标题";edit.setAttribute("aria-label",`修改${task.title || task.id}的标题`);
    edit.addEventListener("click",()=>{
      const input=document.createElement("input");input.value=task.title || task.id;input.maxLength=80;input.setAttribute("aria-label","任务新标题");
      const save=document.createElement("button");save.type="button";save.textContent="保存";
      const cancel=document.createElement("button");cancel.type="button";cancel.textContent="取消";cancel.addEventListener("click",renderTaskList);
      const submit=async()=>{
        if(!input.value.trim()){showMessage("标题不能为空。",true);input.focus();return;}
        save.disabled=true;cancel.disabled=true;input.disabled=true;
        try{
          const result=await requestJson(`/api/tasks/${task.id}/title`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:input.value.trim()})});
          task.title=result.title;
          if(state.task?.id===task.id){state.task.task.title=result.title;el.taskTitle.textContent=result.title;}
          renderTaskList();showMessage("标题已保存，下次打开仍会使用新标题。");
        }catch(error){showMessage(error.message,true);save.disabled=false;cancel.disabled=false;input.disabled=false;}
      };
      save.addEventListener("click",submit);input.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();submit();}if(event.key==="Escape")renderTaskList();});
      row.classList.add("editing");row.replaceChildren(input,save,cancel);input.focus();input.select();
    });
    row.append(button,edit);el.taskList.append(row);
  }
}
async function selectTask(taskId) {
  const version=++state.selectionVersion;++state.modelLoadVersion;
  state.viewer?.setPaused(true);setPlaybackEnabled(false);rememberViewerControls();
  if(state.batch)await cancelBatch();
  try{
    const task=await requestJson(`/api/tasks/${encodeURIComponent(taskId)}`);
    if(version!==state.selectionVersion)return;
    state.task=task;state.parametersDirty=false;state.seriesUnits={time:"s"};state.experimentVersion++;
    renderTaskList();renderTask();resetSeriesSelection();charts.rebuild();clearSeries();activateTab("task");
    if(state.viewerReady)await loadBrowserModel();loadResultHistory();
  }catch(error){if(version===state.selectionVersion)showMessage(error.message,true);}
}
function renderTask() {
  const task=state.task;
  taskJointPanel.render([]);
  el.taskTitle.textContent=task.task.title || task.id;el.taskQuestion.textContent=task.task.question || "请补充研究问题。";
  renderTaskNotes(el.taskNotes,task.notes);el.durationInput.value=task.task.simulation?.duration ?? 5;el.timestepInput.value=task.task.simulation?.timestep ?? .01;
  el.topicTags.replaceChildren();
  for(const topic of task.task.theory_topics || []){const tag=document.createElement("span");tag.textContent=topic;el.topicTags.append(tag);}
  renderParameters();el.applyParameters.disabled=false;el.runButton.disabled=Boolean(state.batch);
}
function renderParameters() {
  const params=state.task.parameters.parameters || {};
  const groups=state.task.ui.layout?.parameter_groups || [{title:"模型参数",parameters:Object.keys(params)}];
  el.parameterForm.replaceChildren();
  for(const group of groups){
    const fieldset=document.createElement("fieldset");const legend=document.createElement("legend");legend.textContent=group.title || "模型参数";fieldset.append(legend);
    for(const name of group.parameters || []){
      const spec=params[name];if(!spec)continue;
      const label=document.createElement("label");label.className="parameter-row";
      label.innerHTML=`<span><strong>${escapeHtml(spec.label || shortName(name))}</strong><small>${escapeHtml(spec.description || "")}</small></span><span class="input-unit"><input name="${escapeHtml(name)}" type="number" value="${Number(spec.value ?? 0)}" step="any" required /><em>${escapeHtml(spec.unit || "1")}</em></span>`;
      const input=label.querySelector("input");if(spec.min!=null)input.min=spec.min;if(spec.max!=null)input.max=spec.max;
      fieldset.append(label);
    }
    el.parameterForm.append(fieldset);
  }
}
function collectParameters() {
  const values={};
  for(const input of el.parameterForm.querySelectorAll("input")){
    if(!input.value.trim() || !Number.isFinite(Number(input.value)) || !input.checkValidity()){
      activateTab("parameters");input.reportValidity();input.focus();throw new Error(`请检查${state.task.parameters.parameters[input.name]?.label || shortName(input.name)}的数值和范围。`);
    }
    values[input.name]=Number(input.value);
  }
  return values;
}
function rememberViewerControls(){if(state.viewerTaskId && state.viewer)state.actuatorControlsByTask.set(state.viewerTaskId,state.viewer.getActuatorControlValues());}
function restoreViewerControls() {
  const defaults=Object.fromEntries(Object.entries(state.task.ui.controls?.actuators || {}).map(([name,spec])=>[name,spec.value ?? 0]));
  state.viewer.setActuatorControlValues({...defaults,...(state.actuatorControlsByTask.get(state.task.id) || {})});rememberViewerControls();
}
async function loadBrowserModel() {
  if(!state.task || !state.viewerReady)return false;
  const task=state.task,version=++state.modelLoadVersion;
  state.modelLoading=true;state.viewer.setPaused(true);setPlaybackEnabled(false);
  el.viewerLoading.classList.remove("hidden");el.viewerLoading.innerHTML="<strong>正在载入模型</strong><span>请稍候</span>";
  try{
    rememberViewerControls();const {duration,timestep}=simulationSettings();
    const payload=await requestJson(`/api/tasks/${task.id}/browser-model`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({parameters:collectParameters(),timestep,duration})});
    if(version!==state.modelLoadVersion || state.task!==task)return false;
    state.seriesMode="loading";
    await state.viewer.loadModel(payload.xml,payload.initial_state,payload.observe,payload.assets,task.ui.camera,payload.joint_limits);
    state.viewerTaskId=task.id;state.seriesUnits=state.viewer.getObservationUnits();restoreViewerControls();charts.rebuild();clearSeries();
    state.viewer.setDuration(duration);state.viewer.reset(true);renderRuntimeControls();
    state.parametersDirty=false;state.modelLoading=false;resetPlaybackState();setPlaybackEnabled(!state.batch);el.viewerLoading.classList.add("hidden");return true;
  }catch(error){
    if(version!==state.modelLoadVersion || state.task!==task)return false;
    state.modelLoading=false;state.parametersDirty=true;
    el.viewerLoading.innerHTML=`<strong>模型载入失败</strong><span>${escapeHtml(error.message)}</span>`;showMessage(error.message,true);return false;
  }
}
function updatePlaybackButton(){const running=state.viewer && !state.viewer.paused;el.playButton.textContent=running?"暂停仿真":state.simulationCompleted?"重新开始":state.simulationStarted?"继续仿真":"开始仿真";el.playButton.classList.toggle("active",Boolean(running));el.playButton.setAttribute("aria-pressed",String(Boolean(running)));}
function resetPlaybackState(){state.simulationStarted=false;state.simulationCompleted=false;state.viewer?.setPaused(true);updatePlaybackButton();}
function resetViewerPreservingControls(){rememberViewerControls();state.viewer.reset(true);restoreViewerControls();state.viewer.emitSample(true);syncRuntimeControls();}
function actuatorUnit(name) {
  const xml=new DOMParser().parseFromString(state.task.model_xml,"application/xml");
  const actuator=[...xml.querySelectorAll("actuator > *")].find(node=>node.getAttribute("name")===name);
  const joint=[...xml.querySelectorAll("joint")].find(node=>node.getAttribute("name")===actuator?.getAttribute("joint"));
  const angular=joint?.getAttribute("type")!=="slide";
  if(actuator?.tagName==="velocity")return angular?"rad/s":"m/s";
  if(actuator?.tagName==="position")return angular?"rad":"m";
  return "1";
}
function controlRow(item,onChange) {
  const row=document.createElement("label");row.className="runtime-control";
  row.innerHTML=`<span><strong>${escapeHtml(item.label || shortName(item.name))}</strong><small>${escapeHtml(item.unit)}</small></span><input class="runtime-slider" type="range" min="${item.min}" max="${item.max}" step="any" value="${item.value}"/><input class="runtime-number" type="number" min="${item.min}" max="${item.max}" step="any" value="${item.value}" aria-label="${escapeHtml(item.label || shortName(item.name))}"/>`;
  const slider=row.querySelector(".runtime-slider"),number=row.querySelector(".runtime-number");
  const commit=raw=>{if(raw==="" || !Number.isFinite(Number(raw))){number.value=slider.value;return;}const value=Math.min(item.max,Math.max(item.min,Number(raw)));slider.value=value;number.value=value;onChange(value);};
  slider.addEventListener("input",()=>commit(slider.value));number.addEventListener("change",()=>commit(number.value));
  number.addEventListener("input",()=>{
    if(number.value!=="" && Number.isFinite(Number(number.value))){
      const value=Math.min(item.max,Math.max(item.min,Number(number.value)));
      slider.value=value;onChange(value);
    }
  });
  number.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();commit(number.value);number.blur();}});
  state.runtimeRows.push({item,slider,number});return row;
}
function renderRuntimeControls() {
  state.runtimeRows=[];const controls=state.viewer.getInteractiveControls();
  el.actuatorControls.innerHTML="<h2>运动控制</h2>";
  const config=state.task.ui.controls || {};
  // Model joints are authoritative; legacy task allowlists must not hide them.
  taskJointPanel.render(controls.joints,config.joint_note || "");
  for(const item of controls.actuators){
    const spec=config.actuators?.[item.name] || {};
    Object.assign(item,{label:spec.label || shortName(item.name),unit:spec.unit || actuatorUnit(item.name),controlType:"actuator"});
    el.actuatorControls.append(controlRow(item,value=>{state.experimentVersion++;state.viewer.setActuatorControl(item.id,value);rememberViewerControls();state.viewer.mujoco.mj_forward(state.viewer.model,state.viewer.data);state.viewer.emitSample(true);}));
  }
  if(!controls.actuators.length){const p=document.createElement("p");p.className="empty-state";p.textContent="本任务没有运动控制量。";el.actuatorControls.append(p);}
}
function syncRuntimeControls() {
  taskJointPanel.sync();
  for(const {item,slider,number} of state.runtimeRows){
    if(document.activeElement===slider || document.activeElement===number)continue;
    const value=item.controlType==="actuator"?state.viewer.data?.ctrl[item.id]:state.viewer.getJointPosition(item.name);
    slider.value=value;number.value=Number(Number(value).toFixed(5));
  }
}
function resetSeriesSelection(){state.visibleSeries=new Set((state.task?.ui.layout?.charts || []).flatMap(chart=>chart.series || []));}
function appendSample(sample) {
  if(!state.task || state.seriesMode!=="realtime" || state.batch)return;
  if(state.series.time.length && sample.time<state.series.time.at(-1)-1e-9)clearSeries();
  const replace=state.series.time.length && Math.abs(sample.time-state.series.time.at(-1))<1e-12;
  if(!replace)state.series.time.push(sample.time);
  const length=state.series.time.length;
  for(const key of new Set([...Object.keys(state.series).filter(key=>key!=="time"),...Object.keys(sample.values)])){
    if(!state.series[key])state.series[key]=Array(length-1).fill(null);
    const value=sample.values[key];
    if(replace)state.series[key][length-1]=Number.isFinite(value)?value:null;else state.series[key].push(Number.isFinite(value)?value:null);
  }
  if(length>10000)for(const values of Object.values(state.series))values.shift();
  if(state.chartFrameId===null)state.chartFrameId=requestAnimationFrame(()=>{state.chartFrameId=null;charts.draw();syncRuntimeControls();});
  el.exportData.disabled=false;el.dataSource.textContent=`实时实验 · t = ${sample.time.toFixed(3)} s`;
}
function clearSeries(mode="realtime") {
  if(state.chartFrameId!==null)cancelAnimationFrame(state.chartFrameId);
  state.chartFrameId=null;state.series={time:[]};state.seriesMode=mode;charts.viewRange=null;charts.hoverTime=null;charts.draw();el.exportData.disabled=true;el.dataSource.textContent="暂无数据";
}
function exportCurrentData() {
  const time=state.series.time;if(!time.length)return;
  const columns=Object.keys(state.series).filter(key=>key!=="time");
  const escape=value=>value==null?"":`"${String(value).replaceAll('"','""')}"`;
  const heading=key=>`${key} [${state.seriesUnits[key] || "1"}]`;
  const lines=[[heading("time"),...columns.map(heading)].map(escape).join(",")];
  time.forEach((t,i)=>lines.push([t,...columns.map(key=>state.series[key][i])].map(escape).join(",")));
  const url=URL.createObjectURL(new Blob(["\ufeff",lines.join("\r\n")],{type:"text/csv;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download=`${state.task.id}_${state.seriesMode}_${new Date().toISOString().replaceAll(":","-")}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function loadResultHistory() {
  const task=state.task;if(!task)return;
  try{
    const result=await requestJson(`/api/tasks/${task.id}/results`);if(state.task!==task)return;
    el.resultHistory.replaceChildren();if(!result.runs.length)el.resultHistory.textContent="尚未保存实验。";
    for(const run of result.runs){const a=document.createElement("a");a.href=run.download;a.download="";a.textContent=`下载 ${run.run_id.replace("run_","")}`;el.resultHistory.append(a);}
  }catch(error){showMessage(error.message,true);}
}
async function cancelBatch() {
  const batch=state.batch;if(!batch)return;batch.cancelled=true;
  try{await requestJson(`/api/runs/${batch.token}/cancel`,{method:"POST"});}catch(error){showMessage(error.message,true);}
}
async function runBatchSimulation() {
  if(state.batch || !state.task || state.modelLoading)return;
  let batch,timer;
  try{
    const parameters=collectParameters(),settings=simulationSettings();
    const id=state.task.id,version=state.selectionVersion,experiment=state.experimentVersion;
    state.viewer?.setPaused(true);batch={token:crypto.randomUUID(),cancelled:false};state.batch=batch;
    el.runButton.disabled=true;el.runButton.textContent="计算中…";el.cancelRun.classList.remove("hidden");setPlaybackEnabled(false);
    el.dataSource.textContent="批量计算中：从初始状态重新运行…";
    timer=setInterval(async()=>{if(state.batch!==batch)return;try{const progress=await requestJson(`/api/runs/${batch.token}`);if(state.batch===batch)el.runButton.textContent=`计算中 ${Math.round(progress.progress*100)}%`;}catch{}},700);
    const result=await requestJson(`/api/tasks/${id}/simulate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({parameters,controls:state.viewerTaskId===id?state.viewer.getActuatorControlValues():{},...settings,run_token:batch.token})});
    if(batch.cancelled || version!==state.selectionVersion || state.task?.id!==id)return;
    if(experiment!==state.experimentVersion){showMessage("计算期间输入发生变化，结果已保存，可在已保存的实验中下载。");loadResultHistory();return;}
    clearSeries("batch");state.series=result.series;state.seriesUnits=result.units;charts.rebuild();el.exportData.disabled=!state.series.time.length;
    el.dataSource.textContent=`批量实验 · 初始状态 · 时长 ${result.duration} s · 步长 ${result.timestep} s`;
    showMessage(`计算完成，已保存 ${result.saved.run_id}`);loadResultHistory();
  }catch(error){showMessage(error.message,true);}
  finally{
    clearInterval(timer);
    if(batch && state.batch===batch){state.batch=null;el.cancelRun.classList.add("hidden");el.runButton.disabled=!state.task;el.runButton.textContent="批量计算并保存";setPlaybackEnabled(Boolean(state.viewer?.model) && !state.modelLoading && state.viewerTaskId===state.task?.id);}
  }
}
function setMode(mode) {
  state.viewer?.setMode(mode);el.cameraMode.classList.toggle("active",mode==="camera");el.panMode.classList.toggle("active",mode==="pan");el.dragMode.classList.toggle("active",mode==="drag");
  el.mouseHint.textContent=mode==="drag"?"按住物体调整姿态，松开后点击开始仿真":mode==="pan"?"左键平移，滚轮缩放":"左键旋转，Shift＋左键平移，滚轮缩放";
}

function setupResizableSidebars() {
  const root = document.documentElement;
  const settings = [
    {
      handle: el.taskResizeHandle,
      panel: el.taskSidebar,
      other: el.inspector,
      property: "--task-sidebar-width",
      storage: "vmail-task-sidebar-width",
      initial: 238,
      min: 180,
      max: 420,
      direction: 1,
    },
    {
      handle: el.inspectorResizeHandle,
      panel: el.inspector,
      other: el.taskSidebar,
      property: "--inspector-width",
      storage: "vmail-inspector-width",
      initial: 350,
      min: 300,
      max: 620,
      direction: -1,
    },
  ];

  const applyWidth = (setting, width) => {
    const otherWidth = setting.other.classList.contains("collapsed") ? 0 : setting.other.getBoundingClientRect().width;
    const available = Math.max(setting.min, window.innerWidth - otherWidth - 420);
    const value = Math.round(Math.min(setting.max, available, Math.max(setting.min, width)));
    root.style.setProperty(setting.property, `${value}px`);
    return value;
  };

  for (const setting of settings) {
    try {
      const saved = Number(localStorage.getItem(setting.storage));
      if (Number.isFinite(saved) && saved > 0) applyWidth(setting, saved);
    } catch {
      // Storage can be unavailable in restricted browser sessions.
    }

    setting.handle.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || window.matchMedia("(max-width: 1080px)").matches) return;
      event.preventDefault();
      const startX = event.clientX;
      const startWidth = setting.panel.getBoundingClientRect().width;
      setting.handle.setPointerCapture(event.pointerId);
      setting.handle.classList.add("active");
      document.body.classList.add("resizing-sidebar");

      const move = (moveEvent) => {
        applyWidth(setting, startWidth + (moveEvent.clientX - startX) * setting.direction);
      };
      const finish = () => {
        setting.handle.classList.remove("active");
        document.body.classList.remove("resizing-sidebar");
        setting.handle.removeEventListener("pointermove", move);
        setting.handle.removeEventListener("pointerup", finish);
        setting.handle.removeEventListener("pointercancel", finish);
        try {
          localStorage.setItem(setting.storage, String(Math.round(setting.panel.getBoundingClientRect().width)));
        } catch {
          // The resized layout still works for the current page.
        }
      };
      setting.handle.addEventListener("pointermove", move);
      setting.handle.addEventListener("pointerup", finish);
      setting.handle.addEventListener("pointercancel", finish);
    });

    setting.handle.addEventListener("dblclick", () => {
      applyWidth(setting, setting.initial);
      try {
        localStorage.removeItem(setting.storage);
      } catch {
        // Resetting the visible width is sufficient.
      }
    });
  }
}


document.querySelectorAll(".tab").forEach((button)=>button.addEventListener("click",()=>activateTab(button.dataset.tab)));
el.refreshTasks.addEventListener("click",()=>loadTasks().catch(error=>showMessage(error.message,true)));
el.applyParameters.addEventListener("click",()=>{if(!state.batch)loadBrowserModel();});
function markDirty(){state.parametersDirty=true;state.experimentVersion++;state.viewer?.setPaused(true);updatePlaybackButton();taskJointPanel.sync(true);}
el.parameterForm.addEventListener("input",markDirty);
el.timestepInput.addEventListener("input",markDirty);
el.durationInput.addEventListener("input",()=>{
  state.experimentVersion++;
  try{const {duration}=simulationSettings();state.viewer?.setDuration(duration);if(state.viewer?.getTime()+1e-9<duration)state.simulationCompleted=false;updatePlaybackButton();}catch{/* Validate on start/apply. */}
});
el.runButton.addEventListener("click",runBatchSimulation);
el.cancelRun.addEventListener("click",cancelBatch);
el.clearData.addEventListener("click",()=>{state.viewer?.setPaused(true);clearSeries();state.viewer?.emitSample(true);});
el.exportData.addEventListener("click",exportCurrentData);
el.resetButton.addEventListener("click",()=>{clearSeries();resetViewerPreservingControls();resetPlaybackState();});
el.stepButton.addEventListener("click",async()=>{
  try{
    simulationSettings();
    if(state.parametersDirty && !await loadBrowserModel())return;
    if(state.viewer.posePrepared){clearSeries();state.viewer.beginPreparedExperiment();}
    if(state.seriesMode==="batch"){clearSeries();resetViewerPreservingControls();resetPlaybackState();}
    state.viewer.setPaused(true);state.viewer.step();state.simulationStarted=true;updatePlaybackButton();activateTab("data");
  }catch(error){showMessage(error.message,true);}
});
el.playButton.addEventListener("click",async()=>{
  try{
    if(state.modelLoading || state.batch || !state.viewer?.model)return;
    const shouldRun=state.viewer.paused;
    if(!shouldRun){state.viewer.setPaused(true);return;}
    const {duration}=simulationSettings();
    if(state.parametersDirty && !await loadBrowserModel())return;
    if(state.viewer.posePrepared){clearSeries();state.viewer.beginPreparedExperiment();}
    else if(state.simulationCompleted || state.seriesMode==="batch"){
      clearSeries();resetViewerPreservingControls();resetPlaybackState();
    }
    state.viewer.setDuration(duration);state.simulationStarted=true;state.simulationCompleted=false;state.viewer.setPaused(false);activateTab("data");
  }catch(error){showMessage(error.message,true);}
});
el.cameraMode.addEventListener("click",()=>setMode("camera"));
el.panMode.addEventListener("click",()=>setMode("pan"));
el.dragMode.addEventListener("click",()=>setMode("drag"));
el.contactButton.addEventListener("click",()=>el.contactButton.classList.toggle("active",state.viewer.toggleContacts()));
el.homeCameraButton.addEventListener("click",()=>state.viewer.homeCamera());
el.collapseTasks.addEventListener("click",()=>{el.taskSidebar.classList.add("collapsed");el.expandTasks.classList.remove("hidden");});
el.expandTasks.addEventListener("click",()=>{el.taskSidebar.classList.remove("collapsed");el.expandTasks.classList.add("hidden");});
el.toggleInspector.addEventListener("click",()=>el.inspector.classList.toggle("collapsed"));
el.closeInspector.addEventListener("click",()=>el.inspector.classList.add("collapsed"));
window.addEventListener("keydown",(event)=>{
  if(event.target.matches("input,textarea,select,[contenteditable]") || event.code!=="Space")return;
  event.preventDefault();el.playButton.click();
});
window.addEventListener("beforeunload",()=>state.viewer?.dispose());
setupResizableSidebars();
const viewerInitialization = initViewer();
setupModelPreview({
  openButton: document.getElementById("openPreview"),
  getEngine: async () => {
    await viewerInitialization;
    if (!state.viewerReady) throw new Error("MuJoCo 引擎尚未就绪，请刷新页面后重试。");
    return state.viewer.mujoco;
  },
  onEnter: () => { state.viewer?.clearDrag(); state.viewer?.setPaused(true); state.viewer?.setSuspended(true); },
  onExit: () => { state.viewer?.setSuspended(false); state.viewer?.resize(); },
  onError: message => showMessage(message, true),
});
Promise.all([viewerInitialization,loadTasks()]).catch(error=>showMessage(error.message,true));
