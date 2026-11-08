import {fileStatusLabel, mergeFileChanges} from "./assistant-workspace.js";

// Display metadata never becomes a user/assistant prompt or a tool instruction.
const THINKING_PREVIEW_LIMIT = 1_000_000;
const THINKING_PAGE_SIZE = 12_000;
const THINKING_PAINT_INTERVAL = 100;
const fileFields = ["task_id", "path", "action", "status", "temporary", "bytes", "run_id", "saved_before"];

export function mergeTurnFiles(previous, incoming, runId = "") {
  const rows = incoming.map(row => Object.fromEntries(fileFields.filter(key => key in row).map(key => [key, row[key]])));
  return mergeFileChanges(previous, rows, runId);
}

export function setupAssistantTurn(article, body, initial = {}, {onOpenFile = () => {}} = {}) {
  const thinking = document.createElement("details"); thinking.className = "assistant-thinking hidden";
  const thinkingTitle = document.createElement("summary");
  const thinkingText = document.createElement("pre"); thinkingText.className = "assistant-thinking-content"; thinkingText.tabIndex = 0;
  const thinkingNode = document.createTextNode(""); thinkingText.append(thinkingNode);
  const thinkingPages = document.createElement("nav"); thinkingPages.className = "assistant-thinking-pages hidden";
  thinkingPages.setAttribute("aria-label", "思考内容分段浏览");
  const previousPage = document.createElement("button"), nextPage = document.createElement("button"), latestPage = document.createElement("button"), pagePosition = document.createElement("span");
  for (const [button, label] of [[previousPage, "上一段"], [nextPage, "下一段"], [latestPage, "最新内容"]]) { button.type = "button"; button.textContent = label; }
  thinkingPages.append(previousPage, nextPage, latestPage, pagePosition);
  const thinkingNote = document.createElement("p"); thinkingNote.className = "assistant-thinking-note hidden";
  thinkingNote.textContent = "思考内容较长，预览已截断；后台推理不受影响。";
  thinking.append(thinkingTitle, thinkingText, thinkingPages, thinkingNote);
  article.insertBefore(thinking, body);

  const filePanel = document.createElement("details"); filePanel.className = "assistant-turn-files hidden";
  const fileTitle = document.createElement("summary"), fileList = document.createElement("ul");
  filePanel.append(fileTitle, fileList); article.append(filePanel);
  let text = initial.thinking_text || "", truncated = !!initial.thinking_truncated;
  let files = mergeTurnFiles([], initial.turn_files || []), runId = "", round = 0, phase = "idle", hasReply = !!initial.content;
  let paintTimer = null, pageEnd = null;

  // Keep history in memory, not thousands of DOM nodes. Never measure layout on
  // a token callback: it would reflow all preceding tokens before every paint.
  function paintThinking() {
    clearTimeout(paintTimer); paintTimer = null;
    if (!thinking.open) return;
    const end = Math.min(pageEnd ?? text.length, text.length), start = Math.max(0, end - THINKING_PAGE_SIZE);
    const visible = text.slice(start, end);
    if (thinkingNode.data !== visible) {
      thinkingNode.data = visible;
      if (pageEnd === null) thinkingText.scrollTop = 1e9;
    }
    thinkingPages.classList.toggle("hidden", text.length <= THINKING_PAGE_SIZE);
    previousPage.disabled = start === 0; nextPage.disabled = end === text.length; latestPage.disabled = pageEnd === null;
    pagePosition.textContent = `${start + 1}–${end} / ${text.length} 字`;
    thinkingNote.classList.toggle("hidden", !truncated);
  }
  function cancelPaint() { clearTimeout(paintTimer); paintTimer = null; }
  function schedulePaint() { if (thinking.open && paintTimer === null) paintTimer = setTimeout(paintThinking, THINKING_PAINT_INTERVAL); }
  thinking.addEventListener("toggle", () => { cancelPaint(); if (thinking.open) paintThinking(); });
  previousPage.addEventListener("click", () => { pageEnd = Math.max(THINKING_PAGE_SIZE, (pageEnd ?? text.length) - THINKING_PAGE_SIZE); paintThinking(); });
  nextPage.addEventListener("click", () => { pageEnd = Math.min(text.length, (pageEnd ?? text.length) + THINKING_PAGE_SIZE); paintThinking(); });
  latestPage.addEventListener("click", () => { pageEnd = null; paintThinking(); });

  function drawThinking() {
    thinking.classList.toggle("hidden", !text);
    thinkingNote.classList.toggle("hidden", !truncated);
    thinkingTitle.textContent = phase === "thinking" ? `DeepSeek 正在思考 · 第 ${round} 轮` : "思考过程";
  }
  function drawFiles() {
    filePanel.classList.toggle("hidden", !files.length);
    const created = files.filter(row => row.action === "created").length;
    const saved = files.filter(row => row.status === "saved" || row.saved_before).length;
    fileTitle.textContent = `本轮文件 ${files.length} · 创建 ${created} / 修改 ${files.length - created}${saved ? ` · 已保存 ${saved}` : ""}`;
    fileList.replaceChildren();
    for (const row of files) {
      const li = document.createElement("li"), button = document.createElement("button"), status = document.createElement("span");
      button.type = "button"; button.textContent = `${row.action === "created" ? "＋" : "~"} ${row.task_id}/${row.path}`;
      button.title = "查看此文件的最新内容与差异";
      button.addEventListener("click", () => onOpenFile(row.task_id, row.path));
      status.textContent = fileStatusLabel(row); status.className = row.temporary ? "temporary" : row.status;
      li.append(button, status); fileList.append(li);
    }
  }
  function collapseThinking() {
    if (phase !== "answer") { phase = "answer"; cancelPaint(); thinking.open = false; drawThinking(); }
  }
  function replyStarted() {
    hasReply = true; body.classList.remove("hidden"); collapseThinking();
  }
  function handle(item) {
    if (item.type === "run_started") runId = item.run_id;
    if (item.type === "reasoning_delta" && item.content) {
      const nextRound = item.round || 1;
      const separator = text && round && nextRound !== round ? `\n\n—— 第 ${nextRound} 轮 ——\n` : "";
      const available = Math.max(0, THINKING_PREVIEW_LIMIT - text.length);
      const addition = (separator + item.content).slice(0, available);
      truncated ||= separator.length + item.content.length > available;
      text += addition;
      if (phase !== "thinking" || round !== nextRound) {
        thinking.open = true; pageEnd = null;
        if (!hasReply) body.classList.add("hidden");
        round = nextRound; phase = "thinking"; drawThinking();
      }
      schedulePaint();
    }
    if (["approval_required", "command_result", "draft", "task_saved"].includes(item.type)) {
      collapseThinking(); if (!hasReply) body.classList.add("hidden");
    }
    if (item.type === "file_changes") {
      files = mergeTurnFiles(files, item.files, item.run_id || runId); drawFiles();
    }
  }
  function finish(latestFiles = []) {
    const known = new Map(files.map(row => [`${row.task_id}/${row.path}`, row]));
    files = mergeTurnFiles(files, latestFiles.filter(row => (!runId || row.run_id === runId) && known.has(`${row.task_id}/${row.path}`))
      .map(row => ({...row, action: known.get(`${row.task_id}/${row.path}`).action})), runId);
    cancelPaint(); phase = "finished"; thinking.open = false; filePanel.open = false;
    body.classList.remove("hidden");
    drawThinking(); drawFiles();
  }
  drawThinking(); drawFiles(); filePanel.open = false;
  return {handle, replyStarted, finish, snapshot: () => ({thinking_text: text, thinking_truncated: truncated, turn_files: files})};
}
