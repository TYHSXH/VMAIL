import "./styles.css";
import { MujocoBrowserViewer } from "./mujoco-viewer.js";
import { ChartStack } from "./charts.js";
import { shortName } from "./labels.js";
import { renderTaskNotes } from "./task-notes.js";
import { setupModelPreview } from "./model-preview.js";
import { JointPanel } from "./joint-panel.js";
import { icon, decorateIcons } from "./icons.js";
import { LoadPreviewPanel, renderLoadFormula } from "./load-controls.js";
import { setupAssistant } from "./assistant.js";
import { setupFileDrop } from "./file-drop.js";
import { confirmTaskDeletion } from "./task-delete.js";
import { ExperimentRecorder, compareExperiments } from "./experiment.js";

decorateIcons();

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
  selectionVersion: 0,
  batch: null,
  seriesMode: "realtime",
  modelLoading: false,
  runtimeRows: [],
  experiment: null,
  appliedInputs: null,
};

const el = Object.fromEntries(
  [
    "taskSidebar", "collapseTasks", "expandTasks", "refreshTasks", "taskList", "engineBadge",
    "taskTitle", "simTime", "toggleInspector", "mujocoViewport", "viewerLoading", "resetButton",
    "stepButton", "playButton", "cameraMode", "panMode", "dragMode", "contactButton", "homeCameraButton", "shadowButton", "lightingButton",
    "selectionLabel", "inspector", "closeInspector", "parameterForm", "durationInput",
    "timestepInput", "applyParameters", "runButton", "clearData", "exportData", "chartStack", "dataSource", "resultHistory", "cancelRun", "jointControls", "actuatorControls", "taskQuestion", "topicTags", "taskNotes", "message",
    "taskResizeHandle", "inspectorResizeHandle",
  ].map((id) => [id, document.getElementById(id)]),
);

const charts = new ChartStack(el.chartStack, state);
const loadPreview = new LoadPreviewPanel(()=>state.viewer,()=>state.task,()=>{
  if(state.parametersDirty)throw new Error("请先应用参数，再更新加载曲线。");
  return simulationSettings().duration;
});
const taskJointPanel = new JointPanel(el.jointControls, {
  getViewer: () => state.viewerTaskId === state.task?.id ? state.viewer : null,
  canEdit: () => !state.modelLoading && !state.parametersDirty && !state.batch && !state.viewer?.drag,
  onBlocked: () => showMessage("请先应用模型参数或等待计算完成，再调整关节。", true),
  onChange: () => {
    if (state.seriesMode !== "preparing") clearSeries("preparing");
    resetPlaybackState();
    loadPreview.refresh();
    el.dataSource.textContent = "关节姿态已调整，点击开始仿真后计时并采集数据。";
  },
  onReset: () => {
    clearSeries("preparing"); resetViewerPreservingControls();
    state.viewer.prepareJointPose(); resetPlaybackState();
    loadPreview.refresh();
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
  document.querySelectorAll(".tab").forEach(button=>{
    const active=button.dataset.tab===name;
    button.classList.toggle("active",active);button.setAttribute("aria-selected",String(active));button.tabIndex=active?0:-1;
  });
  document.querySelectorAll(".tab-panel").forEach(panel=>panel.classList.toggle("active",panel.dataset.panel===name));
  el.inspector.classList.remove("collapsed");
  if(name==="data")charts.draw();
  if(name==="parameters"){taskJointPanel.sync(true);loadPreview.charts?.draw();}
}
function setPlaybackEnabled(enabled) {
  const inputsLocked=Boolean(state.modelLoading || state.batch || !state.task);
  for(const input of [...el.parameterForm.querySelectorAll("input"),el.durationInput,el.timestepInput,el.applyParameters])input.disabled=inputsLocked;
  document.querySelectorAll("#app [data-overlay]").forEach(button=>{
    button.disabled=!enabled;
    const active=state.viewer?.overlays?.options[button.dataset.overlay] ?? button.dataset.overlay==="loads";
    button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  for(const button of [el.resetButton,el.stepButton,el.playButton,el.contactButton,el.homeCameraButton,el.shadowButton,el.lightingButton])button.disabled=!enabled;
  if(enabled)for(const [button,on] of [[el.shadowButton,state.viewer.shadowsEnabled],[el.lightingButton,state.viewer.lightingEnabled]]){
    button.classList.toggle("active",Boolean(on));button.setAttribute("aria-pressed",String(Boolean(on)));
  }
  taskJointPanel.sync(true);
  syncRuntimeControls();
}
function simulationSettings() {
  const duration=Number(el.durationInput.value),timestep=Number(el.timestepInput.value);
  if(!el.durationInput.value || !Number.isFinite(duration) || duration<=0 || duration>3600)throw new Error("仿真时长应大于 0 且不超过 3600 秒。");
  if(!el.timestepInput.value || !Number.isFinite(timestep) || timestep<.00001)throw new Error("时间步长至少为 0.00001 秒。");
  if(Math.ceil(duration/timestep)>1000000)throw new Error("单次实验最多 1000000 步，请缩短时长或增大步长。");
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
        loadPreview.invalidate("松开物体后重新计算加载曲线。");
        clearSeries("preparing");resetPlaybackState();setPlaybackEnabled(false);
        el.dataSource.textContent="正在拖动调整姿态，不计时、不采集数据。";
      },
      onDragEnd:()=>{
        loadPreview.refresh();
        resetPlaybackState();
        setPlaybackEnabled(!state.modelLoading && !state.batch);
        syncRuntimeControls();
        el.dataSource.textContent="姿态已调整，点击开始仿真后才计时并采集数据。";
      },
      onPausedChange:paused=>{
        if(!paused){activateTab("data");state.simulationStarted=true;state.simulationCompleted=false;}
        updatePlaybackButton();
      },
      onComplete:(time,duration)=>{state.simulationStarted=true;state.simulationCompleted=true;updatePlaybackButton();showMessage(`仿真完成：${duration.toFixed(3)} s，可选择导出网页数据或后台重算。`);},
      onError:message=>showMessage(message,true),
    });
    await state.viewer.init();state.viewerReady=true;
    el.engineBadge.textContent="MuJoCo 3.13";el.engineBadge.classList.remove("loading");el.engineBadge.classList.add("ready");
    if(state.task)await loadBrowserModel();else el.viewerLoading.innerHTML="<strong>选择任务，开始实验</strong><span>从左侧载入任务，或拖入 XML 预览模型。</span>";
  }catch(error){el.viewerLoading.innerHTML=`<strong>物理引擎启动失败</strong><span>${escapeHtml(error.message)}</span>`;el.engineBadge.textContent="启动失败";showMessage(error.message,true);}
}
async function loadTasks(){state.tasks=(await requestJson("/api/tasks")).tasks || [];renderTaskList();}
let deletingTaskId = null;
function renderTaskList() {
  el.taskList.replaceChildren();
  document.getElementById("taskCount").textContent=String(state.tasks.length).padStart(2,"0");
  if(!state.tasks.length){const p=document.createElement("p");p.className="empty-state";p.textContent="暂无学习任务";el.taskList.append(p);return;}
  for(const task of state.tasks){
    const row=document.createElement("div");row.className=`task-entry ${state.task?.id===task.id?"active":""}`;
    const button=document.createElement("button");button.type="button";button.className="task-item";button.textContent=task.title || task.id;if(state.task?.id===task.id)button.setAttribute("aria-current","true");button.addEventListener("click",()=>selectTask(task.id));
    const edit=document.createElement("button");edit.type="button";edit.className="rename-task";edit.innerHTML=icon("edit");edit.title="修改任务标题";edit.setAttribute("aria-label",`修改${task.title || task.id}的标题`);
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
    const remove=document.createElement("button");remove.type="button";remove.className="delete-task";remove.innerHTML=icon("trash");remove.title="删除整个任务";remove.setAttribute("aria-label",`删除${task.title || task.id}`);remove.disabled=Boolean(deletingTaskId);
    remove.addEventListener("click",()=>removeTask(task));
    row.append(button,edit,remove);el.taskList.append(row);
  }
}
async function removeTask(task) {
  if(deletingTaskId)return;
  deletingTaskId=task.id;renderTaskList();
  try {
    if(!await confirmTaskDeletion(task))return;
    const result=await requestJson(`/api/tasks/${encodeURIComponent(task.id)}`,{method:"DELETE",headers:{"Content-Type":"application/json","X-VMAIL-Assistant":"1"},body:JSON.stringify({confirm_task_id:task.id})});
    const selected=state.task?.id===task.id;
    if(selected){++state.selectionVersion;++state.modelLoadVersion;}
    await loadTasks();
    if(selected && state.task?.id===task.id){
      if(state.tasks.length)await selectTask(state.tasks[0].id);
      else{
        loadPreview.clear();state.viewer?.clearDrag();state.viewer?.setPaused(true);state.viewer?.setSuspended(true);
        state.task=null;state.viewerTaskId=null;state.modelLoading=false;state.parametersDirty=false;state.runtimeRows=[];
        charts.rebuild();clearSeries();setPlaybackEnabled(false);
        el.mujocoViewport.classList.add("hidden");el.viewerLoading.innerHTML="<strong>暂无学习任务</strong><span>可以在 AI 助手中创建新任务。</span>";el.viewerLoading.classList.remove("hidden");
        el.taskTitle.textContent="选择一个学习任务";el.taskQuestion.textContent="从左侧选择任务，或与 AI 助手对话创建。";
        for(const target of [el.taskNotes,el.topicTags,el.parameterForm,el.actuatorControls,el.resultHistory])target.replaceChildren();
        taskJointPanel.render([]);el.applyParameters.disabled=true;el.runButton.disabled=true;
      }
    }
    showMessage(result.files_deleted ? "任务及全部文件已删除。" : `任务已移出列表，部分文件被占用，需手动清理：${result.cleanup_path}`,!result.files_deleted);
  }catch(error){showMessage(error.message,true);}
  finally{deletingTaskId=null;renderTaskList();}
}
async function selectTask(taskId) {
  el.mujocoViewport.classList.remove("hidden");state.viewer?.setSuspended(false);
  loadPreview.clear();
  const version=++state.selectionVersion;++state.modelLoadVersion;
  state.modelLoading=true;
  state.viewer?.setPaused(true);setPlaybackEnabled(false);rememberViewerControls();
  if(state.batch)await cancelBatch();
  try{
    const task=await requestJson(`/api/tasks/${encodeURIComponent(taskId)}`);
    if(version!==state.selectionVersion)return;
    state.task=task;state.parametersDirty=false;state.seriesUnits={time:"s"};
    renderTaskList();renderTask();resetSeriesSelection();charts.rebuild();clearSeries();activateTab("task");
    if(state.viewerReady)await loadBrowserModel();loadResultHistory();
  }catch(error){
    if(version!==state.selectionVersion)return;
    state.modelLoading=false;
    setPlaybackEnabled(Boolean(state.viewer?.model) && state.viewerTaskId===state.task?.id && !state.parametersDirty && !state.batch);
    showMessage(error.message,true);
  }
}
function renderTask() {
  const task=state.task;
  taskJointPanel.render([]);
  el.taskTitle.textContent=task.task.title || task.id;el.taskQuestion.textContent=task.task.question || "请补充研究问题。";
  renderTaskNotes(el.taskNotes,task.notes);el.durationInput.value=task.task.simulation?.duration ?? 5;el.timestepInput.value=task.task.simulation?.timestep ?? .01;
  el.topicTags.replaceChildren();
  for(const topic of task.task.theory_topics || []){const tag=document.createElement("span");tag.textContent=topic;el.topicTags.append(tag);}
  renderParameters();el.applyParameters.disabled=false;el.runButton.disabled=true;
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
  loadPreview.invalidate("载入模型后更新加载曲线。");
  const task=state.task,version=++state.modelLoadVersion;
  state.modelLoading=true;state.viewer.setPaused(true);
  el.viewerLoading.classList.remove("hidden");el.viewerLoading.innerHTML="<strong>正在载入模型</strong><span>请稍候</span>";
  try{
    rememberViewerControls();const {duration,timestep}=simulationSettings(),parameters=collectParameters();
    setPlaybackEnabled(false);
    const payload=await requestJson(`/api/tasks/${task.id}/browser-model`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({parameters,timestep,duration})});
    if(version!==state.modelLoadVersion || state.task!==task)return false;
    state.seriesMode="loading";
    state.appliedInputs={parameters,duration,timestep,model_revision:payload.model_revision};
    await state.viewer.loadModel(payload.xml,payload.initial_state,payload.observe,payload.assets,task.ui.camera,payload.joint_limits,payload.load_program);
    if(version!==state.modelLoadVersion || state.task!==task)return false;
    state.viewer.setActuatorLoadVisibility(task.ui.controls?.actuators || {});
    state.viewerTaskId=task.id;state.seriesUnits=state.viewer.getObservationUnits();restoreViewerControls();clearSeries();
    for(const key of Object.keys(payload.load_program?.units || {}))state.visibleSeries.add(key);
    charts.rebuild();
    state.viewer.setDuration(duration);state.viewer.reset(true);renderRuntimeControls();
    state.parametersDirty=false;state.modelLoading=false;resetPlaybackState();setPlaybackEnabled(!state.batch);el.viewerLoading.classList.add("hidden");return true;
  }catch(error){
    if(version!==state.modelLoadVersion || state.task!==task)return false;
    state.modelLoading=false;state.parametersDirty=true;
    setPlaybackEnabled(false);
    el.viewerLoading.innerHTML=`<strong>模型载入失败</strong><span>${escapeHtml(error.message)}</span>`;showMessage(error.message,true);return false;
  }
}
function updatePlaybackButton(){const running=state.viewer && !state.viewer.paused;el.playButton.textContent=running?"暂停仿真":state.simulationCompleted?"重新开始":state.simulationStarted?"继续仿真":"开始仿真";el.playButton.classList.toggle("active",Boolean(running));el.playButton.setAttribute("aria-pressed",String(Boolean(running)));}
function resetPlaybackState(){state.simulationStarted=false;state.simulationCompleted=false;state.viewer?.setPaused(true);updatePlaybackButton();}
function resetViewerPreservingControls(){rememberViewerControls();state.viewer.reset(true);restoreViewerControls();state.viewer.emitSample(true);syncRuntimeControls();}
function restartRecordedExperiment() {
  const recorded=state.experiment?.completed || state.experiment;
  if(!recorded){clearSeries();resetViewerPreservingControls();resetPlaybackState();return;}
  const viewer=state.viewer,controls=viewer.getActuatorControlValues();
  clearSeries();viewer.clearDrag();viewer.posePrepared=false;viewer.loadFailed=false;
  viewer.mujoco.mj_setState(viewer.model,viewer.data,recorded.request.replay.initial_state,viewer.mujoco.mjtState.mjSTATE_INTEGRATION.value);
  viewer.physicsStep=0;viewer.timeAccumulator=0;viewer.lastSampleTime=-Infinity;viewer.nextSampleTime=0;viewer.completionNotified=false;
  viewer.model.opt.timestep=viewer.configuredTimestep;viewer.setActuatorControlValues(controls);
  viewer.mujoco.mj_forward(viewer.model,viewer.data);viewer.updateScene();viewer.emitSample(true);resetPlaybackState();
}
function beginRecording() {
  if(state.experiment)return;
  state.experiment=new ExperimentRecorder(state.viewer,state.appliedInputs);
  state.viewer.emitSample(true);
}
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
  loadPreview.clear();
  state.runtimeRows=[];const controls=state.viewer.getInteractiveControls();
  el.actuatorControls.innerHTML=controls.actuators.length?"<h2>执行器</h2>":"";
  const config=state.task.ui.controls || {};
  // Model joints are authoritative; legacy task allowlists must not hide them.
  taskJointPanel.render(controls.joints,config.joint_note || "");
  const automatic=new Set((state.viewer.loadProgram?.entries || []).filter(entry=>entry.type==="actuator").map(entry=>entry.index));
  for(const item of controls.actuators){
    const spec=config.actuators?.[item.name] || {};
    Object.assign(item,{label:spec.label || shortName(item.name),unit:spec.unit || actuatorUnit(item.name),automatic:automatic.has(item.id)});
    const row=controlRow(item,value=>{state.viewer.setActuatorControl(item.id,value);state.experiment?.controlChanged(state.viewer);rememberViewerControls();state.viewer.mujoco.mj_forward(state.viewer.model,state.viewer.data);state.viewer.emitSample(true);loadPreview.refresh();});
    if(automatic.has(item.id)){row.querySelectorAll("input").forEach(input=>input.disabled=true);row.title="由任务载荷函数自动控制";}
    el.actuatorControls.append(row);
  }
  const loads=state.viewer.loadProgram?.entries || [];
  if(loads.length){
    const heading=document.createElement("h2");heading.textContent="自动加载";el.actuatorControls.append(heading);
    for(const entry of loads){
      const raw=entry.source,card=document.createElement("section");card.className="load-rule";
      const title=document.createElement("strong");title.textContent=entry.label;
      const target=document.createElement("p");target.textContent=entry.type==="wrench"?`${raw.site?"作用点":"刚体"} · ${shortName(raw.site || raw.body)} · ${entry.frame==="body"?"物体坐标系":"世界坐标系"}`:`${entry.type==="joint"?"关节载荷":"执行器输入"} · ${shortName(raw.joint || raw.actuator)} · ${raw.unit}`;
      const formula=document.createElement("div");formula.className="load-math";renderLoadFormula(formula,entry);
      card.append(title,target,formula);el.actuatorControls.append(card);
    }
    const hint=document.createElement("p");hint.className="field-help";hint.textContent="按仿真时间自动加载，载荷曲线在“数据”中查看。规律由任务 loads.yaml 定义，幅值等参数在“参数”中修改。";el.actuatorControls.append(hint);
    loadPreview.mount(el.actuatorControls);
  }
  if(!controls.actuators.length&&!loads.length){const p=document.createElement("p");p.className="empty-state";p.textContent="本任务没有运动控制量。";el.actuatorControls.append(p);}
}
function syncRuntimeControls() {
  taskJointPanel.sync();
  for(const {item,slider,number} of state.runtimeRows){
    slider.disabled=number.disabled=Boolean(item.automatic || state.modelLoading || state.parametersDirty || state.batch || state.viewerTaskId!==state.task?.id);
    if(document.activeElement===slider || document.activeElement===number)continue;
    const value=state.viewer.data?.ctrl[item.id];
    slider.value=value;number.value=Number(Number(value).toFixed(5));
  }
}
function resetSeriesSelection(){state.visibleSeries=new Set((state.task?.ui.layout?.charts || []).flatMap(chart=>chart.series || []));}
function appendSample(sample) {
  if(!state.task || state.seriesMode!=="realtime" || state.batch)return;
  if(state.experiment?.completed)return;
  if(state.series.time.length && sample.time<state.series.time.at(-1)-1e-9)clearSeries();
  const replace=state.series.time.length && Math.abs(sample.time-state.series.time.at(-1))<1e-12;
  if(!replace)state.series.time.push(sample.time);
  const length=state.series.time.length;
  for(const key of new Set([...Object.keys(state.series).filter(key=>key!=="time"),...Object.keys(sample.values)])){
    if(!state.series[key])state.series[key]=Array(length-1).fill(null);
    const value=sample.values[key];
    if(replace)state.series[key][length-1]=Number.isFinite(value)?value:null;else state.series[key].push(Number.isFinite(value)?value:null);
  }
  if(state.chartFrameId===null)state.chartFrameId=requestAnimationFrame(()=>{state.chartFrameId=null;charts.draw();syncRuntimeControls();});
  if(state.simulationCompleted)state.experiment?.finish(state.series,state.seriesUnits);
  el.exportData.disabled=!state.experiment?.completed;el.runButton.disabled=!state.experiment?.completed;
  el.dataSource.textContent=`网页实验 · t = ${sample.time.toFixed(3)} s${state.experiment?.completed?" · 已完成，可导出或后台重算":" · 完成后可导出"}`;
}
function clearSeries(mode="realtime") {
  if(state.chartFrameId!==null)cancelAnimationFrame(state.chartFrameId);
  state.chartFrameId=null;state.series={time:[]};state.seriesMode=mode;state.experiment=null;charts.viewRange=null;charts.hoverTime=null;charts.cursorPinned=false;charts.draw();el.exportData.disabled=true;el.runButton.disabled=true;el.dataSource.textContent="请先完成一次网页仿真，再选择导出方式。";
}
function exportCurrentData() {
  const completed=state.experiment?.completed;if(!completed)return;
  const series=completed.series,time=series.time;
  const columns=Object.keys(series).filter(key=>key!=="time");
  const escape=value=>value==null?"":`"${String(value).replaceAll('"','""')}"`;
  const heading=key=>`${key} [${completed.units[key] || "1"}]`;
  const lines=[[heading("time"),...columns.map(heading)].map(escape).join(",")];
  time.forEach((t,i)=>lines.push([t,...columns.map(key=>series[key][i])].map(escape).join(",")));
  const url=URL.createObjectURL(new Blob(["\ufeff",lines.join("\r\n")],{type:"text/csv;charset=utf-8"}));
  const a=document.createElement("a");a.href=url;a.download=`${state.task.id}_web_${new Date().toISOString().replaceAll(":","-")}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function chooseExport() {
  if(!state.experiment?.completed || state.batch){showMessage("请先完成一次网页仿真。",true);return;}
  const dialog=document.getElementById("exportExperimentDialog");dialog.returnValue="cancel";
  dialog.addEventListener("close",()=>{if(dialog.returnValue==="web")exportCurrentData();else if(dialog.returnValue==="native")void runBatchSimulation();},{once:true});
  dialog.showModal();
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
  const completed=state.experiment?.completed;
  if(!completed){showMessage("请先完成一次网页仿真，再按本次实验条件后台重算。",true);return;}
  let batch,timer;
  try{
    const id=state.task.id,version=state.selectionVersion;
    state.viewer?.setPaused(true);batch={token:crypto.randomUUID(),cancelled:false};state.batch=batch;
    el.runButton.disabled=true;el.exportData.disabled=true;el.runButton.textContent="计算中…";el.cancelRun.classList.remove("hidden");setPlaybackEnabled(false);
    el.dataSource.textContent="后台重算中：继承本次实验参数、调整后的起始姿态与控制记录…";
    timer=setInterval(async()=>{if(state.batch!==batch)return;try{const progress=await requestJson(`/api/runs/${batch.token}`);if(state.batch===batch)el.runButton.textContent=`计算中 ${Math.round(progress.progress*100)}%`;}catch{}},700);
    const result=await requestJson(`/api/tasks/${id}/simulate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...completed.request,run_token:batch.token})});
    if(batch.cancelled || version!==state.selectionVersion || state.task?.id!==id)return;
    if(completed!==state.experiment?.completed){showMessage("实验准备条件已改变；刚才的重算结果已保存，可在已保存的实验中下载。");loadResultHistory();return;}
    const comparison=compareExperiments(completed,result);
    el.dataSource.textContent=`本次后台重算已保存 · ${comparison.consistent?"与网页采样在容差内一致":"与网页存在超出容差的差异，请检查接触、步长和求解设置"} · 网页曲线保留`;
    const download=document.createElement("a");download.href=`/api/tasks/${id}/results/${result.saved.run_id}/data.csv`;download.download="";download.click();
    showMessage("后台重算完成，CSV 已下载，结果及实验条件已保存。",!comparison.consistent);loadResultHistory();
  }catch(error){
    if(completed===state.experiment?.completed)el.dataSource.textContent="后台重算未完成，网页记录保留，可重试或导出网页数据。";
    showMessage(error.message,true);
  }
  finally{
    clearInterval(timer);
    if(batch && state.batch===batch){state.batch=null;el.cancelRun.classList.add("hidden");el.runButton.disabled=!state.experiment?.completed;el.exportData.disabled=!state.experiment?.completed;el.runButton.textContent="后台重算";setPlaybackEnabled(Boolean(state.viewer?.model) && !state.modelLoading && state.viewerTaskId===state.task?.id);}
  }
}
function setMode(mode) {
  state.viewer?.setMode(mode);el.cameraMode.classList.toggle("active",mode==="camera");el.panMode.classList.toggle("active",mode==="pan");el.dragMode.classList.toggle("active",mode==="drag");
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
      initial: 244,
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
      initial: 380,
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
document.querySelector(".tabs").addEventListener("keydown",event=>{
  const tabs=[...document.querySelectorAll(".tab")],current=tabs.indexOf(document.activeElement);
  if(current<0 || !["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
  event.preventDefault();
  const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(current+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
  activateTab(tabs[next].dataset.tab);tabs[next].focus();
});
el.refreshTasks.addEventListener("click",()=>loadTasks().catch(error=>showMessage(error.message,true)));
el.applyParameters.addEventListener("click",()=>{if(!state.batch)loadBrowserModel();});
function markDirty(){state.parametersDirty=true;state.viewer?.setPaused(true);clearSeries("preparing");resetPlaybackState();taskJointPanel.sync(true);loadPreview.invalidate("应用参数后更新加载曲线。");}
el.parameterForm.addEventListener("input",markDirty);
el.timestepInput.addEventListener("input",markDirty);
el.durationInput.addEventListener("input",markDirty);
el.runButton.addEventListener("click",runBatchSimulation);
el.cancelRun.addEventListener("click",cancelBatch);
el.clearData.addEventListener("click",()=>{if(!state.batch && state.viewer?.model && state.viewerTaskId===state.task?.id){restartRecordedExperiment();loadPreview.refresh();}});
el.exportData.addEventListener("click",chooseExport);
el.resetButton.addEventListener("click",()=>{clearSeries();resetViewerPreservingControls();resetPlaybackState();loadPreview.refresh();});
el.stepButton.addEventListener("click",async()=>{
  try{
    simulationSettings();
    if(state.parametersDirty && !await loadBrowserModel())return;
    if(state.viewer.posePrepared){clearSeries();state.viewer.beginPreparedExperiment();}
    if(state.simulationCompleted)restartRecordedExperiment();
    beginRecording();
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
    else if(state.simulationCompleted){
      restartRecordedExperiment();
    }
    beginRecording();state.viewer.setDuration(duration);state.simulationStarted=true;state.simulationCompleted=false;state.viewer.setPaused(false);activateTab("data");
  }catch(error){showMessage(error.message,true);}
});
el.cameraMode.addEventListener("click",()=>setMode("camera"));
el.panMode.addEventListener("click",()=>setMode("pan"));
el.dragMode.addEventListener("click",()=>setMode("drag"));
el.contactButton.addEventListener("click",()=>el.contactButton.classList.toggle("active",state.viewer.toggleContacts()));
document.querySelectorAll("#app [data-overlay]").forEach(button=>button.addEventListener("click",()=>{
  const enabled=state.viewer.setOverlay(button.dataset.overlay,button.getAttribute("aria-pressed")!=="true");
  button.classList.toggle("active",enabled);button.setAttribute("aria-pressed",String(enabled));
}));
el.shadowButton.addEventListener("click",()=>{
  const enabled=state.viewer.setShadows(!state.viewer.shadowsEnabled);
  el.shadowButton.classList.toggle("active",enabled);el.shadowButton.setAttribute("aria-pressed",String(enabled));
});
el.lightingButton.addEventListener("click",()=>{
  const enabled=state.viewer.setLighting(!state.viewer.lightingEnabled);
  el.lightingButton.classList.toggle("active",enabled);el.lightingButton.setAttribute("aria-pressed",String(enabled));
});
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
const assistant = setupAssistant({
  getTask: () => state.task?.id || null,
  onOpen: () => { state.viewer?.setPaused(true); activateTab("assistant"); },
  onCreated: async task => { await loadTasks(); if(!state.batch){await selectTask(task.id);activateTab("assistant");} showMessage(`已${task.updated ? "更新" : "创建"}任务：${task.title}`); },
  onError: message => showMessage(message, true),
});
const viewerInitialization = initViewer();
const modelPreview = setupModelPreview({
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
setupFileDrop({
  onXml: files => modelPreview.loadFiles(files),
  onImages: files => { modelPreview.close(); assistant.open(); void assistant.addImages(files); },
  onError: message => showMessage(message, true),
});
Promise.all([viewerInitialization,loadTasks()]).catch(error=>showMessage(error.message,true));
