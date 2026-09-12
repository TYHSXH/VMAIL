import "./styles.css";
import { MujocoBrowserViewer } from "./mujoco-viewer.js";

const state = {
  tasks: [],
  task: null,
  viewer: null,
  viewerReady: false,
  series: { time: [] },
};

const colors = ["#38bdf8", "#34d399", "#fb923c", "#f472b6", "#a78bfa", "#facc15"];
const el = Object.fromEntries(
  [
    "taskSidebar", "collapseTasks", "expandTasks", "refreshTasks", "taskList", "engineBadge",
    "taskTitle", "simTime", "toggleInspector", "mujocoViewport", "viewerLoading", "resetButton",
    "stepButton", "playButton", "cameraMode", "dragMode", "contactButton", "homeCameraButton",
    "mouseHint", "selectionLabel", "inspector", "closeInspector", "parameterForm", "durationInput",
    "timestepInput", "applyParameters", "runButton", "clearData", "chartCanvas", "chartLegend",
    "liveValues", "jointControls", "actuatorControls", "taskQuestion", "topicTags", "taskNotes", "message",
  ].map((id) => [id, document.getElementById(id)]),
);

function showMessage(text, error = false) {
  el.message.textContent = text;
  el.message.classList.toggle("hidden", !text);
  el.message.classList.toggle("error", error);
  if (text) window.setTimeout(() => el.message.classList.add("hidden"), error ? 7000 : 3500);
}

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "请求失败");
  return data;
}

async function initViewer() {
  state.viewer = new MujocoBrowserViewer(el.mujocoViewport, {
    onTime: (time) => { el.simTime.textContent = `t = ${time.toFixed(3)} s`; },
    onSample: appendSample,
    onSelection: (label) => { el.selectionLabel.textContent = label ? `已选中 ${label}` : ""; },
  });
  try {
    await state.viewer.init();
    state.viewerReady = true;
    el.engineBadge.textContent = "MuJoCo 3.13 · Browser WASM";
    el.engineBadge.classList.remove("loading");
    el.engineBadge.classList.add("ready");
    if (state.task) await loadBrowserModel();
  } catch (error) {
    el.viewerLoading.innerHTML = `<strong>MuJoCo WASM 启动失败</strong><span>${error.message}</span>`;
    el.engineBadge.textContent = "WASM 启动失败";
    el.engineBadge.classList.add("failed");
    showMessage(error.message, true);
  }
}

async function loadTasks() {
  const data = await requestJson("/api/tasks");
  state.tasks = data.tasks || [];
  renderTaskList();
  if (!state.task && state.tasks.length) await selectTask(state.tasks[0].id);
}

function renderTaskList() {
  el.taskList.innerHTML = "";
  if (!state.tasks.length) {
    el.taskList.innerHTML = '<p class="empty-state">暂无任务。让 AI 在 tasks 文件夹中创建一个任务包。</p>';
    return;
  }
  for (const task of state.tasks) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `task-item ${state.task?.id === task.id ? "active" : ""}`;
    button.innerHTML = `<strong>${task.title || task.id}</strong><span>${task.description || task.status || ""}</span>`;
    button.addEventListener("click", () => selectTask(task.id));
    el.taskList.appendChild(button);
  }
}

async function selectTask(taskId) {
  try {
    state.task = await requestJson(`/api/tasks/${encodeURIComponent(taskId)}`);
    renderTaskList();
    renderTask();
    clearSeries();
    if (state.viewerReady) await loadBrowserModel();
  } catch (error) {
    showMessage(error.message, true);
  }
}

function renderTask() {
  const task = state.task;
  el.taskTitle.textContent = task.task.title || task.id;
  el.taskQuestion.textContent = task.task.question || "这个任务还没有填写研究问题。";
  el.taskNotes.textContent = task.notes || "";
  el.durationInput.value = task.task.simulation?.duration ?? 5;
  el.timestepInput.value = task.task.simulation?.timestep ?? 0.01;
  el.topicTags.innerHTML = "";
  for (const topic of task.task.theory_topics || []) {
    const tag = document.createElement("span");
    tag.textContent = topic;
    el.topicTags.appendChild(tag);
  }
  renderParameters();
  for (const button of [el.applyParameters, el.runButton]) button.disabled = false;
}

function renderParameters() {
  const params = state.task.parameters.parameters || {};
  const groups = state.task.ui.layout?.parameter_groups || [{ title: "模型参数", parameters: Object.keys(params) }];
  el.parameterForm.innerHTML = "";
  for (const group of groups) {
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = `<legend>${group.title || "模型参数"}</legend>`;
    for (const name of group.parameters || []) {
      const spec = params[name];
      if (!spec) continue;
      const label = document.createElement("label");
      label.className = "parameter-row";
      label.innerHTML = `<span><strong>${name}</strong><small>${spec.description || ""}</small></span><span class="input-unit"><input name="${name}" type="number" value="${spec.value ?? 0}" min="${spec.min ?? ""}" max="${spec.max ?? ""}" step="${spec.step ?? "any"}" /><em>${spec.unit || ""}</em></span>`;
      fieldset.appendChild(label);
    }
    el.parameterForm.appendChild(fieldset);
  }
}

function collectParameters() {
  return Object.fromEntries([...new FormData(el.parameterForm).entries()].map(([key, value]) => [key, Number(value)]));
}

async function loadBrowserModel() {
  if (!state.task || !state.viewerReady) return;
  el.viewerLoading.classList.remove("hidden");
  el.viewerLoading.innerHTML = "<strong>正在编译 MJCF 模型</strong><span>物理引擎运行在当前浏览器中。</span>";
  try {
    const model = await requestJson(`/api/tasks/${encodeURIComponent(state.task.id)}/browser-model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parameters: collectParameters(), timestep: Number(el.timestepInput.value) }),
    });
    await state.viewer.loadModel(model.xml, model.initial_state, model.observe);
    renderRuntimeControls();
    state.viewer.setPaused(false);
    el.playButton.textContent = "暂停";
    el.playButton.classList.add("active");
    for (const button of [el.resetButton, el.stepButton, el.playButton, el.contactButton, el.homeCameraButton]) button.disabled = false;
    el.viewerLoading.classList.add("hidden");
    clearSeries();
  } catch (error) {
    el.viewerLoading.innerHTML = `<strong>模型载入失败</strong><span>${error.message}</span>`;
    showMessage(error.message, true);
  }
}

function controlRow(item, onChange) {
  const row = document.createElement("label");
  row.className = "runtime-control";
  row.innerHTML = `<span><strong>${item.name}</strong><small>${item.kindLabel}</small></span><input type="range" min="${item.min}" max="${item.max}" step="${item.step}" value="${item.value}" /><output>${Number(item.value).toFixed(3)}</output>`;
  const input = row.querySelector("input");
  const output = row.querySelector("output");
  input.addEventListener("input", () => {
    const value = Number(input.value);
    output.value = value.toFixed(3);
    onChange(value);
  });
  return row;
}

function renderRuntimeControls() {
  const controls = state.viewer?.getInteractiveControls() || { joints: [], actuators: [] };
  el.jointControls.innerHTML = "<h2>一维关节</h2>";
  el.actuatorControls.innerHTML = "<h2>执行器</h2>";
  if (!controls.joints.length) el.jointControls.insertAdjacentHTML("beforeend", '<p class="empty-state">模型没有可直接定位的滑动或转动关节。</p>');
  if (!controls.actuators.length) el.actuatorControls.insertAdjacentHTML("beforeend", '<p class="empty-state">模型没有执行器。可让 AI 在 model.xml 中添加 motor、position 或 velocity actuator。</p>');
  for (const item of controls.joints) {
    el.jointControls.appendChild(controlRow(item, (value) => {
      state.viewer.setPaused(true);
      el.playButton.textContent = "播放";
      el.playButton.classList.remove("active");
      state.viewer.setJointPosition(item.id, value);
    }));
  }
  for (const item of controls.actuators) {
    el.actuatorControls.appendChild(controlRow(item, (value) => state.viewer.setActuatorControl(item.id, value)));
  }
}

function appendSample(sample) {
  if (!state.task) return;
  state.series.time.push(sample.time);
  for (const [key, value] of Object.entries(sample.values)) {
    if (!state.series[key]) state.series[key] = Array(state.series.time.length - 1).fill(null);
    state.series[key].push(Number(value));
  }
  if (state.series.time.length > 1000) {
    for (const values of Object.values(state.series)) values.shift();
  }
  if (state.series.time.length % 4 === 0) {
    drawChart();
    renderLiveValues(sample.values);
  }
}

function clearSeries() {
  state.series = { time: [] };
  drawChart();
  el.liveValues.innerHTML = "";
}

function seriesKeys() {
  const declared = (state.task?.ui?.layout?.charts || []).flatMap((chart) => chart.series || []);
  return [...new Set(declared)].filter((key) => state.series[key]);
}

function drawChart() {
  const canvas = el.chartCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#121922";
  ctx.fillRect(0, 0, width, height);
  el.chartLegend.innerHTML = "";
  const time = state.series.time;
  const keys = seriesKeys();
  if (time.length < 2 || !keys.length) {
    ctx.fillStyle = "#7f8b99";
    ctx.font = "28px Microsoft YaHei, sans-serif";
    ctx.fillText("仿真运行后显示实时曲线", 34, 64);
    return;
  }
  const pad = { left: 64, right: 22, top: 24, bottom: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const finite = keys.flatMap((key) => state.series[key].filter(Number.isFinite));
  let minY = Math.min(...finite);
  let maxY = Math.max(...finite);
  if (minY === maxY) { minY -= 1; maxY += 1; }
  const minT = time[0];
  const maxT = time.at(-1);
  const x = (v) => pad.left + ((v - minT) / (maxT - minT || 1)) * plotW;
  const y = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;
  ctx.strokeStyle = "#283341";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const yy = pad.top + (plotH * i) / 5;
    ctx.beginPath(); ctx.moveTo(pad.left, yy); ctx.lineTo(width - pad.right, yy); ctx.stroke();
  }
  ctx.fillStyle = "#9ba8b8";
  ctx.font = "22px Segoe UI, sans-serif";
  ctx.fillText(maxY.toFixed(2), 8, pad.top + 8);
  ctx.fillText(minY.toFixed(2), 8, pad.top + plotH);
  keys.forEach((key, index) => {
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 3;
    ctx.beginPath();
    state.series[key].forEach((value, point) => {
      if (!Number.isFinite(value)) return;
      if (point === 0) ctx.moveTo(x(time[point]), y(value));
      else ctx.lineTo(x(time[point]), y(value));
    });
    ctx.stroke();
    const label = document.createElement("span");
    label.innerHTML = `<i style="background:${colors[index % colors.length]}"></i>${key}`;
    el.chartLegend.appendChild(label);
  });
}

function renderLiveValues(values) {
  el.liveValues.innerHTML = Object.entries(values).slice(0, 12).map(([key, value]) => `<div><span>${key}</span><strong>${Number(value).toFixed(4)}</strong></div>`).join("");
}

async function runBatchSimulation() {
  try {
    el.runButton.disabled = true;
    el.runButton.textContent = "计算中...";
    const result = await requestJson(`/api/tasks/${encodeURIComponent(state.task.id)}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parameters: collectParameters(), duration: Number(el.durationInput.value), timestep: Number(el.timestepInput.value) }),
    });
    state.series = result.series;
    drawChart();
    showMessage(`计算完成，数据已保存到 ${result.saved.run_id}`);
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    el.runButton.disabled = false;
    el.runButton.textContent = "计算并保存";
  }
}

function setMode(mode) {
  state.viewer?.setMode(mode);
  el.cameraMode.classList.toggle("active", mode === "camera");
  el.dragMode.classList.toggle("active", mode === "drag");
  el.mouseHint.textContent = mode === "camera" ? "左键旋转，右键平移，滚轮缩放" : "按住物体拖动，MuJoCo 将施加跟随力";
}

document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
}));
el.refreshTasks.addEventListener("click", () => loadTasks().catch((error) => showMessage(error.message, true)));
el.applyParameters.addEventListener("click", () => loadBrowserModel());
el.runButton.addEventListener("click", runBatchSimulation);
el.clearData.addEventListener("click", clearSeries);
el.resetButton.addEventListener("click", () => { clearSeries(); state.viewer.reset(); });
el.stepButton.addEventListener("click", () => { state.viewer.setPaused(true); el.playButton.textContent = "播放"; el.playButton.classList.remove("active"); state.viewer.step(); });
el.playButton.addEventListener("click", () => { const paused = !state.viewer.paused; state.viewer.setPaused(paused); el.playButton.textContent = paused ? "播放" : "暂停"; el.playButton.classList.toggle("active", !paused); });
el.cameraMode.addEventListener("click", () => setMode("camera"));
el.dragMode.addEventListener("click", () => setMode("drag"));
el.contactButton.addEventListener("click", () => el.contactButton.classList.toggle("active", state.viewer.toggleContacts()));
el.homeCameraButton.addEventListener("click", () => state.viewer.homeCamera());
el.collapseTasks.addEventListener("click", () => { el.taskSidebar.classList.add("collapsed"); el.expandTasks.classList.remove("hidden"); });
el.expandTasks.addEventListener("click", () => { el.taskSidebar.classList.remove("collapsed"); el.expandTasks.classList.add("hidden"); });
el.toggleInspector.addEventListener("click", () => el.inspector.classList.toggle("collapsed"));
el.closeInspector.addEventListener("click", () => el.inspector.classList.add("collapsed"));
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !event.target.matches("input")) { event.preventDefault(); el.playButton.click(); }
  if (event.code === "Backspace" && !event.target.matches("input")) { event.preventDefault(); el.resetButton.click(); }
});
window.addEventListener("beforeunload", () => state.viewer?.dispose());

Promise.all([initViewer(), loadTasks()]).catch((error) => showMessage(error.message, true));
