import "./styles.css";
import { MujocoBrowserViewer } from "./mujoco-viewer.js";

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
  chartFrameId: null,
  latestSampleValues: null,
};

const colors = ["#38bdf8", "#34d399", "#fb923c", "#f472b6", "#a78bfa", "#facc15"];
const el = Object.fromEntries(
  [
    "taskSidebar", "collapseTasks", "expandTasks", "refreshTasks", "taskList", "engineBadge",
    "taskTitle", "simTime", "toggleInspector", "mujocoViewport", "viewerLoading", "resetButton",
    "stepButton", "playButton", "cameraMode", "dragMode", "contactButton", "homeCameraButton",
    "mouseHint", "selectionLabel", "inspector", "closeInspector", "parameterForm", "durationInput",
    "timestepInput", "applyParameters", "runButton", "clearData", "exportData", "chartCanvas", "chartLegend",
    "liveValues", "jointControls", "actuatorControls", "taskQuestion", "topicTags", "taskNotes", "message",
    "taskResizeHandle", "inspectorResizeHandle",
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
    onComplete: (time, duration) => {
      state.simulationStarted = true;
      state.simulationCompleted = true;
      updatePlaybackButton();
      showMessage(`已完成 ${duration.toFixed(3)} s 仿真，自动暂停于 t = ${time.toFixed(3)} s`);
    },
  });
  try {
    await state.viewer.init();
    state.viewerReady = true;
    el.engineBadge.textContent = "MuJoCo 3.13 · Browser WASM";
    el.engineBadge.classList.remove("loading");
    el.engineBadge.classList.add("ready");
    if (state.task) await loadBrowserModel();
    else {
      el.viewerLoading.innerHTML = "<strong>请选择学习任务</strong><span>从左侧任务栏选择一个模型，再设置参数并开始仿真。</span>";
    }
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
    state.seriesUnits = { time: "s" };
    renderTaskList();
    renderTask();
    resetSeriesSelection();
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
    const duration = Number(el.durationInput.value);
    if (!(duration > 0)) throw new Error("仿真时长必须大于 0 秒。");
    const model = await requestJson(`/api/tasks/${encodeURIComponent(state.task.id)}/browser-model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parameters: collectParameters(), timestep: Number(el.timestepInput.value) }),
    });
    clearSeries();
    await state.viewer.loadModel(model.xml, model.initial_state, model.observe);
    state.viewer.setDuration(duration);
    state.seriesUnits = state.viewer.getObservationUnits();
    renderRuntimeControls();
    state.parametersDirty = false;
    resetPlaybackState();
    for (const button of [el.resetButton, el.stepButton, el.playButton, el.contactButton, el.homeCameraButton]) button.disabled = false;
    el.viewerLoading.classList.add("hidden");
  } catch (error) {
    el.viewerLoading.innerHTML = `<strong>模型载入失败</strong><span>${error.message}</span>`;
    showMessage(error.message, true);
    return false;
  }
  return true;
}

function updatePlaybackButton() {
  const running = state.viewer && !state.viewer.paused;
  el.playButton.textContent = running ? "暂停" : state.simulationCompleted ? "重新开始" : (state.simulationStarted ? "继续" : "开始");
  el.playButton.classList.toggle("active", Boolean(running));
}

function resetPlaybackState() {
  state.simulationStarted = false;
  state.simulationCompleted = false;
  state.viewer?.setPaused(true);
  updatePlaybackButton();
}

function controlRow(item, onChange) {
  const row = document.createElement("label");
  row.className = "runtime-control";
  row.innerHTML = `<span><strong>${item.name}</strong><small>${item.kindLabel}</small></span><input class="runtime-slider" type="range" min="${item.min}" max="${item.max}" step="any" value="${item.value}" /><input class="runtime-number" type="number" min="${item.min}" max="${item.max}" step="any" value="${item.value}" aria-label="Set ${item.name} value" />`;
  const slider = row.querySelector(".runtime-slider");
  const numberInput = row.querySelector(".runtime-number");
  const commitValue = (rawValue) => {
    if (!Number.isFinite(rawValue)) {
      numberInput.value = slider.value;
      return;
    }
    const value = Math.min(Number(item.max), Math.max(Number(item.min), rawValue));
    slider.value = String(value);
    numberInput.value = String(value);
    onChange(value);
  };
  slider.addEventListener("input", () => {
    const min = Number(item.min);
    const step = Number(item.step);
    const rawValue = Number(slider.value);
    const value = step > 0 ? min + Math.round((rawValue - min) / step) * step : rawValue;
    commitValue(Number(value.toFixed(12)));
  });
  numberInput.addEventListener("change", () => commitValue(Number(numberInput.value)));
  numberInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    numberInput.blur();
  });
  return row;
}

function renderRuntimeControls() {
  const controls = state.viewer?.getInteractiveControls() || { joints: [], actuators: [] };
  const configuredJoints = state.task?.ui?.controls?.joints;
  const kinematicControls = state.task?.ui?.controls?.kinematic || [];
  const joints = Array.isArray(configuredJoints)
    ? controls.joints.filter((item) => configuredJoints.includes(item.name))
    : controls.joints;
  el.jointControls.innerHTML = "<h2>一维关节</h2>";
  el.actuatorControls.innerHTML = "<h2>执行器</h2>";
  const jointNote = state.task?.ui?.controls?.joint_note;
  if (jointNote || (!joints.length && !kinematicControls.length)) {
    const note = jointNote || "模型没有可直接定位的滑动或转动关节。";
    const paragraph = document.createElement("p");
    paragraph.className = "empty-state";
    paragraph.textContent = note;
    el.jointControls.appendChild(paragraph);
  }
  if (!controls.actuators.length) el.actuatorControls.insertAdjacentHTML("beforeend", '<p class="empty-state">模型没有执行器。可让 AI 在 model.xml 中添加 motor、position 或 velocity actuator。</p>');
  for (const item of joints) {
    el.jointControls.appendChild(controlRow(item, (value) => {
      state.viewer.setPaused(true);
      updatePlaybackButton();
      state.viewer.setJointPosition(item.id, value);
    }));
  }
  for (const config of kinematicControls) {
    if (config.type !== "slider_crank") continue;
    const item = {
      name: config.label || config.crank_joint,
      kindLabel: "闭环联动位置 (rad)",
      min: Number(config.min ?? -Math.PI),
      max: Number(config.max ?? Math.PI),
      step: Number(config.step ?? 0.01),
      value: state.viewer.getJointPosition(config.crank_joint),
    };
    el.jointControls.appendChild(controlRow(item, (value) => {
      state.viewer.setPaused(true);
      updatePlaybackButton();
      state.viewer.setKinematicPosition(config, value);
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
  if (state.series.time.length > 10000) {
    for (const values of Object.values(state.series)) values.shift();
  }
  state.latestSampleValues = sample.values;
  if (state.chartFrameId === null) {
    state.chartFrameId = requestAnimationFrame(() => {
      state.chartFrameId = null;
      drawChart();
      if (state.latestSampleValues) renderLiveValues(state.latestSampleValues);
    });
  }
  el.exportData.disabled = state.series.time.length === 0;
}

function clearSeries() {
  if (state.chartFrameId !== null) cancelAnimationFrame(state.chartFrameId);
  state.chartFrameId = null;
  state.latestSampleValues = null;
  state.series = { time: [] };
  drawChart();
  el.liveValues.innerHTML = "";
  el.exportData.disabled = true;
}

function exportCurrentData() {
  const time = state.series.time || [];
  if (!time.length) {
    showMessage("当前没有可导出的数据。", true);
    return;
  }
  const columns = Object.keys(state.series).filter((key) => key !== "time");
  const escapeCell = (value) => {
    if (value === null || value === undefined) return "";
    const text = String(value);
    return /[\",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  const heading = (key) => `${key} [${state.seriesUnits[key] || "-"}]`;
  const lines = [[heading("time"), ...columns.map(heading)].map(escapeCell).join(",")];
  for (let index = 0; index < time.length; index += 1) {
    lines.push([
      time[index],
      ...columns.map((column) => state.series[column]?.[index] ?? ""),
    ].map(escapeCell).join(","));
  }
  const stamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  const taskId = state.task?.id || "vmail";
  const filename = `${taskId}_current_${stamp}.csv`;
  const url = URL.createObjectURL(new Blob(["\ufeff", lines.join("\r\n")], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  showMessage(`已导出当前数据：${filename}`);
}

function declaredSeriesKeys() {
  const declared = (state.task?.ui?.layout?.charts || []).flatMap((chart) => chart.series || []);
  return [...new Set(declared)];
}

function resetSeriesSelection() {
  state.visibleSeries = new Set(declaredSeriesKeys());
}

function seriesColor(key) {
  const index = declaredSeriesKeys().indexOf(key);
  return colors[(index < 0 ? 0 : index) % colors.length];
}

function seriesLabel(key) {
  return `${key} [${state.seriesUnits[key] || "-"}]`;
}

function seriesKeys() {
  return declaredSeriesKeys().filter((key) => state.visibleSeries.has(key) && state.series[key]);
}

function renderChartLegend() {
  el.chartLegend.innerHTML = "";
  for (const key of declaredSeriesKeys()) {
    const label = document.createElement("label");
    label.className = "legend-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.visibleSeries.has(key);
    checkbox.setAttribute("aria-label", `显示曲线 ${key}`);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) state.visibleSeries.add(key);
      else state.visibleSeries.delete(key);
      drawChart();
    });

    const swatch = document.createElement("i");
    swatch.style.background = seriesColor(key);
    const text = document.createElement("span");
    text.textContent = seriesLabel(key);
    label.append(checkbox, swatch, text);
    el.chartLegend.appendChild(label);
  }
}

function drawChart() {
  const canvas = el.chartCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "#121922";
  ctx.fillRect(0, 0, width, height);
  renderChartLegend();
  const time = state.series.time;
  const keys = seriesKeys();
  if (time.length < 2 || !keys.length) {
    ctx.fillStyle = "#7f8b99";
    ctx.font = "28px Microsoft YaHei, sans-serif";
    ctx.fillText(time.length < 2 ? "仿真运行后显示实时曲线" : "请选择至少一条曲线", 34, 64);
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
  keys.forEach((key) => {
    ctx.strokeStyle = seriesColor(key);
    ctx.lineWidth = 3;
    ctx.beginPath();
    state.series[key].forEach((value, point) => {
      if (!Number.isFinite(value)) return;
      if (point === 0) ctx.moveTo(x(time[point]), y(value));
      else ctx.lineTo(x(time[point]), y(value));
    });
    ctx.stroke();
  });
}

function renderLiveValues(values) {
  el.liveValues.innerHTML = Object.entries(values).map(([key, value]) => {
    const unit = state.seriesUnits[key] || "-";
    return `<div><span>${key}</span><strong>${Number(value).toFixed(4)} <em>${unit}</em></strong></div>`;
  }).join("");
}

async function runBatchSimulation() {
  try {
    el.runButton.disabled = true;
    el.runButton.textContent = "计算中...";
    const result = await requestJson(`/api/tasks/${encodeURIComponent(state.task.id)}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parameters: collectParameters(),
        controls: state.viewer?.getActuatorControlValues() || {},
        duration: Number(el.durationInput.value),
        timestep: Number(el.timestepInput.value),
      }),
    });
    state.series = result.series;
    state.seriesUnits = result.units || state.seriesUnits;
    el.exportData.disabled = state.series.time.length === 0;
    drawChart();
    const controls = Object.entries(result.controls || {}).map(([name, value]) => `${name}=${value}`).join(", ");
    showMessage(`计算完成，数据已保存到 ${result.saved.run_id}${controls ? `，控制：${controls}` : ""}`);
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

document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
}));
el.refreshTasks.addEventListener("click", () => loadTasks().catch((error) => showMessage(error.message, true)));
el.applyParameters.addEventListener("click", () => loadBrowserModel());
el.parameterForm.addEventListener("input", () => {
  state.parametersDirty = true;
  resetPlaybackState();
});
el.timestepInput.addEventListener("input", () => {
  state.parametersDirty = true;
  resetPlaybackState();
});
el.durationInput.addEventListener("input", () => {
  const duration = Number(el.durationInput.value);
  if (!(duration > 0) || !state.viewer) return;
  state.viewer.setDuration(duration);
  if (state.viewer.getTime() + 1e-9 < duration) state.simulationCompleted = false;
  updatePlaybackButton();
});
el.runButton.addEventListener("click", runBatchSimulation);
el.clearData.addEventListener("click", clearSeries);
el.exportData.addEventListener("click", exportCurrentData);
el.resetButton.addEventListener("click", () => { state.viewer.reset(); clearSeries(); resetPlaybackState(); });
el.stepButton.addEventListener("click", () => { state.viewer.setPaused(true); state.viewer.step(); state.simulationStarted = true; updatePlaybackButton(); });
el.playButton.addEventListener("click", async () => {
  const shouldRun = state.viewer.paused;
  const duration = Number(el.durationInput.value);
  if (shouldRun && !(duration > 0)) {
    showMessage("仿真时长必须大于 0 秒。", true);
    el.durationInput.focus();
    return;
  }
  if (shouldRun && state.parametersDirty && !await loadBrowserModel()) return;
  if (shouldRun && state.simulationCompleted) {
    clearSeries();
    state.viewer.reset();
    resetPlaybackState();
  }
  if (shouldRun) {
    state.viewer.setDuration(duration);
    state.simulationStarted = true;
    state.simulationCompleted = false;
  }
  state.viewer.setPaused(!shouldRun);
  updatePlaybackButton();
});
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

setupResizableSidebars();
Promise.all([initViewer(), loadTasks()]).catch((error) => showMessage(error.message, true));
