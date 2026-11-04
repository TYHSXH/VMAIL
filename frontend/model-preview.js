import { MujocoBrowserViewer } from "./mujoco-viewer.js";
import { decodePreviewBundle } from "./preview-bundle.js";
import { JointPanel } from "./joint-panel.js";
import './model-preview.css';

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
  const libraryList = document.getElementById("previewModelList");
  const libraryPanel = document.getElementById('previewLibraryPanel');
  const libraryButton = document.getElementById('togglePreviewLibrary');
  const compactPreview = window.matchMedia('(max-width: 700px)');
  let savedModels = [];
  try { const value = JSON.parse(localStorage.getItem('vmail.preview-models') || '[]'); if (Array.isArray(value)) savedModels = value.filter(item => typeof item.model_id === 'string' && typeof item.entry === 'string').slice(0, 200); } catch {}
  let selectedModel = '';
  const playButton = overlay.querySelector('[data-preview-action="play"]');
  const jointsPanel = document.getElementById("previewJoints");
  const jointsButton = document.getElementById("togglePreviewJoints");
  function setPanelVisible(name, visible, restoreFocus = false) {
    const panel = name === 'library' ? libraryPanel : jointsPanel;
    const button = name === 'library' ? libraryButton : jointsButton;
    if (visible && compactPreview.matches) setPanelVisible(name === 'library' ? 'joints' : 'library', false);
    panel.classList.toggle('hidden', !visible);
    button.setAttribute('aria-expanded', String(visible));
    button.classList.toggle('active', visible);
    if (restoreFocus) button.focus();
  }
  compactPreview.addEventListener('change', event => {
    if (!event.matches) return;
    setPanelVisible('library', false);
    setPanelVisible('joints', false);
  });
  const toolbarObserver = new ResizeObserver(entries => {
    const height = entries[0].target.getBoundingClientRect().height;
    if (height > 0) overlay.querySelector('.preview-workspace').style.setProperty('--preview-toolbar-height', `${height}px`);
  });
  toolbarObserver.observe(overlay.querySelector('.viewer-toolbar'));
  const tools = [...overlay.querySelectorAll("[data-preview-action]")];
  let viewer = null, version = 0, active = false, previousFocus = null;
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
  function refreshLibrary() {
    libraryList.replaceChildren();
    document.getElementById('previewModelCount').textContent = savedModels.length;
    if (!savedModels.length) { const p = document.createElement('p'); p.className = 'empty-state'; p.textContent = '模型库还是空的。从课程空间添加感兴趣的模型，或打开本地 XML。'; libraryList.append(p); }
    for (const item of savedModels) {
      const key = `${item.model_id}/${item.entry}`;
      const row = document.createElement('div'); row.className = `task-entry ${selectedModel === key ? 'active' : ''}`;
      const button = document.createElement('button'); button.className = 'task-item'; button.type = 'button'; button.textContent = `${item.title || item.model_id} · ${item.entry}`;
      if (selectedModel === key) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => { selectedModel = key; refreshLibrary(); void load([], { model_id: item.model_id, entry: item.entry }); });
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete-task'; remove.textContent = '×'; remove.setAttribute('aria-label', `从列表移除${item.title || item.model_id}`);
      remove.addEventListener('click', () => { savedModels = savedModels.filter(model => model !== item); persistLibrary(); refreshLibrary(); });
      row.append(button, remove); libraryList.append(row);
    }
  }
  function persistLibrary() { try { localStorage.setItem('vmail.preview-models', JSON.stringify(savedModels)); } catch { onError('浏览器无法保存模型列表，本次仍可预览。'); } }
  function addModel(item) {
    if (!savedModels.some(model => model.model_id === item.model_id && model.entry === item.entry)) savedModels.push(item);
    selectedModel = `${item.model_id}/${item.entry}`; persistLibrary(); refreshLibrary(); return load([], { model_id: item.model_id, entry: item.entry });
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
    setPanelVisible('library', !compactPreview.matches);
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
    selectedModel = '';
    updatePlayback();
    tools.forEach(button => { button.disabled = true; });
    setStatus("从左侧选择模型，或拖入 XML 开始预览。预览仿真不记录数据。");
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
      if (ticket !== version || !active) return;
      viewer.setMode("camera");
      viewer.setDuration(Infinity);
      title.textContent = payload.name;
      tools.forEach(button => { button.disabled = false; button.classList.toggle("active", button.dataset.previewAction === "camera"); });
      for (const action of ["shadows", "lighting"]) {
        const button = tools.find(tool => tool.dataset.previewAction === action);
        const enabled = action === "shadows" ? viewer.shadowsEnabled : viewer.lightingEnabled;
        button.classList.toggle("active", enabled); button.setAttribute("aria-pressed", String(enabled));
      }
      for(const action of ["loads","inertia","com","axes"]){
        const button=tools.find(tool=>tool.dataset.previewAction===action),key=action==="axes"?"joints":action;
        const enabled=viewer.overlays?.options[key] ?? key==="loads";
        button.classList.toggle("active",enabled);button.setAttribute("aria-pressed",String(enabled));
      }
      loading = false;
      jointPanel.render();
      setPanelVisible('joints', !compactPreview.matches);
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
  libraryButton.addEventListener('click', () => {
    setPanelVisible('library', libraryPanel.classList.contains('hidden'));
  });
  document.getElementById('collapsePreviewLibrary').addEventListener('click', () => setPanelVisible('library', false, true));
  document.getElementById('collapsePreviewJoints').addEventListener('click', () => setPanelVisible('joints', false, true));
  document.getElementById("choosePreviewFile").addEventListener("click", () => input.click());
  input.addEventListener("change", () => { if (input.files.length) void load([...input.files]); input.value = ""; });
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
    else if (["loads","inertia","com","axes"].includes(action)) {
      const enabled=viewer.setOverlay(action==="axes"?"joints":action,button.getAttribute("aria-pressed")!=="true");
      button.classList.toggle("active",enabled);button.setAttribute("aria-pressed",String(enabled));
    }
    else if (action === "shadows" || action === "lighting") {
      const enabled = action === "shadows" ? viewer.setShadows(!viewer.shadowsEnabled) : viewer.setLighting(!viewer.lightingEnabled);
      button.classList.toggle("active", enabled); button.setAttribute("aria-pressed", String(enabled));
    }
    else if (action === "joints") { setPanelVisible('joints', jointsPanel.classList.contains('hidden')); jointPanel.sync(true); }
  });
  window.addEventListener("keydown", event => {
    if (!active) return;
    if (document.querySelector('#courseSpace[open], #courseDetail[open]')) return;
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.code === "Space" && !event.target.matches("input,select,button")) { event.preventDefault(); playButton.click(); }
    // Keep background task shortcuts, including Space, inactive in preview.
    if (event.code === "Space") event.stopImmediatePropagation();
    if (event.key === "Tab") {
      const buttons = [...overlay.querySelectorAll("button:not(:disabled),a[href],select:not(:disabled),input:not(:disabled)")].filter(element=>element.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }, { capture: true });
  window.addEventListener("beforeunload", () => { toolbarObserver.disconnect(); viewer?.dispose(); });
  return { isActive: () => active, loadFiles: files => load(files), addModel, pause: () => viewer?.setPaused(true), close };
}
