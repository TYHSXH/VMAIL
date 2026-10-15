import { MujocoBrowserViewer } from "./mujoco-viewer.js";
import { decodePreviewBundle } from "./preview-bundle.js";
import { JointPanel } from "./joint-panel.js";

const XML_LIMIT = 16 * 1024 * 1024;

export function validatePreviewXml(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("XML 格式错误，请检查标签和属性是否完整。");
  if (doc.documentElement.tagName !== "mujoco") throw new Error("请选择以 <mujoco> 为根节点的 MuJoCo XML 模型。");
  return xml;
}

export function setupModelPreview({ openButton, getEngine, onEnter, onExit, onError }) {
  const overlay = document.getElementById("modelPreview");
  const viewport = document.getElementById("previewViewport");
  const status = document.getElementById("previewStatus");
  const title = document.getElementById("previewTitle");
  const input = document.getElementById("previewFile");
  const closeButton = document.getElementById("closePreview");
  const librarySelect = document.getElementById("previewLibrary");
  const playButton = overlay.querySelector('[data-preview-action="play"]');
  const jointsPanel = document.getElementById("previewJoints");
  const jointsButton = document.getElementById("togglePreviewJoints");
  const tools = [...overlay.querySelectorAll("[data-preview-action]")];
  let viewer = null, version = 0, active = false, previousFocus = null;
  let libraryLoaded = false;
  let loading = false;
  const jointPanel = new JointPanel(document.getElementById("previewJointControls"), {
    getViewer: () => viewer,
    canEdit: () => active && !loading && !viewer?.drag,
    onChange: updatePlayback,
    onReset: () => { viewer?.reset(); updatePlayback(); },
  });

  async function request(url, body) {
    const response = await fetch(url, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
    if (response.ok && response.headers.get("Content-Type")?.includes("application/octet-stream")) return decodePreviewBundle(await response.arrayBuffer());
    const result = await response.json();
    if (!response.ok) throw new Error(typeof result.detail === "string" ? result.detail : "模型导入失败，请检查输入文件。");
    return result;
  }
  function updatePlayback() {
    playButton.textContent = viewer && !viewer.paused ? "暂停仿真" : "运行仿真";
    playButton.classList.toggle("active", Boolean(viewer && !viewer.paused));
  }
  async function refreshLibrary() {
    if (libraryLoaded) return;
    try {
      const { models } = await request("/api/preview-models");
      librarySelect.replaceChildren(new Option("从模型库选择…", ""));
      for (const model of models) {
        const group = document.createElement("optgroup"); group.label = model.title;
        for (const entry of model.entries) group.append(new Option(entry, JSON.stringify({ model_id: model.id, entry })));
        librarySelect.append(group);
      }
      libraryLoaded = true;
    } catch { setStatus("无法读取模型库，请重启 VMAIL 服务后刷新网页。", true); }
  }

  function setStatus(message, error = false) {
    status.textContent = message;
    status.classList.toggle("hidden", !message);
    status.classList.toggle("preview-error", error);
  }
  function open() {
    if (active) return;
    active = true;
    previousFocus = document.activeElement;
    onEnter();
    document.getElementById("app").inert = true;
    overlay.classList.remove("hidden");
    closeButton.focus();
    void refreshLibrary();
  }
  function close() {
    if (!active) return;
    active = false;
    version++;
    viewer?.clearDrag();
    viewer?.dispose();
    viewer = null;
    jointPanel.render([]); jointsPanel.classList.add("hidden");
    viewport.replaceChildren();
    title.textContent = "模型预览";
    librarySelect.value = "";
    updatePlayback();
    tools.forEach(button => { button.disabled = true; });
    setStatus("拖入一个 XML，或从模型库选择。库内 XML 会自动加载配套资源；点击“运行仿真”观察运动，不记录数据。");
    overlay.classList.add("hidden");
    document.getElementById("app").inert = false;
    onExit();
    previousFocus?.focus();
  }
  async function load(files, libraryRequest = null) {
    open();
    const ticket = ++version;
    if (!libraryRequest && (files.length !== 1 || !files[0].name.toLowerCase().endsWith(".xml"))) {
      setStatus("请一次拖入一个 .xml 文件。", true);
      return;
    }
    const file = files[0];
    if (file && file.size > XML_LIMIT) { setStatus("XML 文件过大：单个 XML 最多 16 MiB（不含外部资源）。", true); return; }
    viewer?.clearDrag(); viewer?.setPaused(true);
    loading = true; jointPanel.sync(true);
    setStatus(`正在加载 ${file?.name || "模型及配套资源"}…`);
    tools.forEach(button => { button.disabled = true; });
    try {
      const payload = await request("/api/preview-model?binary=true", libraryRequest || { xml: validatePreviewXml(await file.text()), filename: file.name });
      const engine = await getEngine();
      if (ticket !== version || !active) return;
      if (!viewer) {
        viewer = new MujocoBrowserViewer(viewport, {
          recordSamples: false,
          useModelKeyframe: true,
          onTime: () => jointPanel.sync(),
          onPausedChange: updatePlayback,
          onError: message => { setStatus(message, true); onError(message); },
        });
        await viewer.init(engine);
      }
      if (ticket !== version || !active) return;
      await viewer.loadModel(payload.xml, [], {}, payload.assets, null, payload.joint_limits);
      viewer.setMode("camera");
      viewer.setDuration(Infinity);
      title.textContent = payload.name;
      tools.forEach(button => { button.disabled = false; button.classList.toggle("active", button.dataset.previewAction === "camera"); });
      loading = false;
      jointPanel.render(); jointsPanel.classList.remove("hidden");
      jointsButton.classList.add("active"); jointsButton.setAttribute("aria-expanded", "true");
      setStatus("");
      updatePlayback();
    } catch (error) {
      if (ticket !== version || !active) return;
      loading = false; jointPanel.sync(true);
      setStatus(error.message || "模型加载失败，请检查 XML 和当前 MuJoCo 的支持情况。", true);
      tools.forEach(button => { button.disabled = !viewer?.model; });
      updatePlayback();
    }
  }
  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  document.getElementById("choosePreviewFile").addEventListener("click", () => input.click());
  input.addEventListener("change", () => { if (input.files.length) void load([...input.files]); input.value = ""; });
  librarySelect.addEventListener("change", () => { if (librarySelect.value) void load([], JSON.parse(librarySelect.value)); });
  for (const button of tools) button.addEventListener("click", () => {
    if (!viewer?.model) return;
    const action = button.dataset.previewAction;
    if (["camera", "pan", "drag"].includes(action)) {
      viewer.setMode(action);
      tools.filter(tool => ["camera", "pan", "drag"].includes(tool.dataset.previewAction)).forEach(tool => tool.classList.toggle("active", tool === button));
    } else if (action === "play") {
      if (viewer.posePrepared) viewer.beginPreparedExperiment();
      viewer.setPaused(!viewer.paused);
    } else if (action === "reset") { viewer.reset(); updatePlayback(); jointPanel.sync(true); }
    else if (action === "home") viewer.homeCamera();
    else if (action === "contacts") button.classList.toggle("active", viewer.toggleContacts());
    else if (action === "joints") { const hidden = jointsPanel.classList.toggle("hidden"); button.classList.toggle("active", !hidden); button.setAttribute("aria-expanded", String(!hidden)); jointPanel.sync(true); }
  });
  window.addEventListener("dragover", event => {
    if (event.dataTransfer?.types.includes("Files")) { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; }
  });
  window.addEventListener("drop", event => {
    if (!event.dataTransfer?.types.includes("Files")) return;
    event.preventDefault();
    void load([...event.dataTransfer.files]);
  });
  window.addEventListener("keydown", event => {
    if (!active) return;
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.code === "Space" && !event.target.matches("input,select,button")) { event.preventDefault(); playButton.click(); }
    // Keep background task shortcuts, including Space, inactive in preview.
    if (event.code === "Space") event.stopImmediatePropagation();
    if (event.key === "Tab") {
      const buttons = [...overlay.querySelectorAll("button:not(:disabled),select:not(:disabled),input:not(:disabled)")].filter(element=>element.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }, { capture: true });
  window.addEventListener("beforeunload", () => viewer?.dispose());
  return { isActive: () => active };
}
