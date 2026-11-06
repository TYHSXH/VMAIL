export function mergeFileChanges(previous, incoming, runId = "") {
  const entries = new Map(previous.map(row => [`${row.task_id}/${row.path}`, row]));
  for (const row of incoming) {
    const previousRow = entries.get(`${row.task_id}/${row.path}`);
    const nextRun = row.run_id || runId;
    const sameRun = previousRow?.run_id === nextRun;
    entries.set(`${row.task_id}/${row.path}`, {...previousRow, ...row, action: previousRow?.action === "created" ? "created" : row.action,
      saved_before: !!((sameRun && (previousRow?.saved_before || previousRow?.status === "saved")) || row.saved_before || row.status === "saved"), run_id: nextRun});
  }
  return [...entries.values()];
}

const states = {staged: "待保存", saved: "已保存", cleaned: "临时 · 已清理", discarded: "未保存 · 已清理"};

export function fileStatusLabel(row) {
  return row.status === "discarded" && row.saved_before ? "已保存，后续改动未保存" : states[row.status] || row.status;
}

export function setupAssistantWorkspace(container, {api, changed = () => {}}) {
  container.innerHTML = `
    <section class="assistant-approval hidden" aria-label="操作审批" aria-live="polite">
      <div class="assistant-approval-heading"><strong></strong><span>自动审查</span></div>
      <p class="assistant-review-result"></p><p class="assistant-approval-description"></p>
      <pre class="assistant-command hidden"></pre>
      <details class="assistant-approval-files"><summary>查看操作内容与文件差异</summary><div></div></details>
      <p class="assistant-approval-error error" role="status"></p>
      <div class="assistant-approval-actions"><button type="button" data-decision="once" class="primary-button">本次同意</button><button type="button" data-decision="turn" class="quiet-button">本轮同类操作同意</button><button type="button" data-decision="deny" class="quiet-button">拒绝</button></div>
    </section>
    <details class="assistant-workspace-files hidden"><summary>本次对话文件 <span></span></summary>
      <div class="assistant-workspace-body"><label>创建 / 修改的文件<select aria-label="本次对话创建或修改的文件"></select></label><p></p>
      <div class="assistant-file-view"><button type="button" data-view="content" aria-pressed="true">文件内容</button><button type="button" data-view="diff" aria-pressed="false">修改差异</button></div><pre tabindex="0"></pre></div>
    </details>
    <details class="assistant-activity hidden"><summary>操作记录 <span></span></summary><div></div></details>`;
  const card = container.querySelector(".assistant-approval"), filePanel = container.querySelector(".assistant-workspace-files");
  const selector = filePanel.querySelector("select"), preview = filePanel.querySelector("pre");
  const activityPanel = container.querySelector(".assistant-activity");
  let files = [], activity = [], pending = null, runId = "", view = "content";
  function snapshot() { return {file_changes: files, activity}; }
  function record(row) { activity.push({...row, at: new Date().toISOString()}); activity = activity.slice(-500); drawActivity(); changed(); }
  function drawActivity() {
    activityPanel.classList.toggle("hidden", !activity.length);
    activityPanel.querySelector("summary span").textContent = `（${activity.length}）`;
    const body = activityPanel.querySelector("div"); body.replaceChildren();
    for (const item of activity.slice().reverse()) {
      const row = document.createElement("details"), title = document.createElement("summary"), detail = document.createElement("pre");
      title.textContent = item.kind === "command" ? item.command : `${item.title || "操作审批"} · ${{once: "本次同意", turn: "本轮同类操作同意", deny: "已拒绝", revised: "已由修正消息取消", expired: "已过期", stopped: "已停止"}[item.decision] || item.decision}`;
      detail.textContent = item.result ? JSON.stringify(item.result, null, 2) : `${item.task_id || ""}\n${item.command || ""}\n${item.review || ""}`;
      row.append(title, detail); body.append(row);
    }
  }
  function drawPreview() {
    const row = files.find(item => `${item.task_id}/${item.path}` === selector.value);
    preview.textContent = row ? (view === "diff" ? row.diff || "无文本差异" : row.content || "") : "";
    filePanel.querySelector(".assistant-workspace-body > p").textContent = row ? `${row.task_id} · ${fileStatusLabel(row)} · ${row.bytes.toLocaleString()} bytes${row.truncated ? " · 预览已截断" : ""}` : "";
    for (const button of filePanel.querySelectorAll("[data-view]")) button.setAttribute("aria-pressed", String(button.dataset.view === view));
  }
  function drawFiles() {
    const selected = selector.value;
    filePanel.classList.toggle("hidden", !files.length);
    filePanel.querySelector("summary span").textContent = `（${files.length}）`;
    selector.replaceChildren();
    for (const row of files) selector.add(new Option(`${row.action === "created" ? "＋ 创建" : "~ 修改"} · ${row.task_id}/${row.path} · ${fileStatusLabel(row)}`, `${row.task_id}/${row.path}`));
    if (files.some(row => `${row.task_id}/${row.path}` === selected)) selector.value = selected;
    drawPreview();
  }
  selector.addEventListener("change", drawPreview);
  filePanel.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => { view = button.dataset.view; drawPreview(); }));
  function showApproval(item) {
    pending = item;
    card.classList.remove("hidden");
    card.querySelector("strong").textContent = item.title;
    card.querySelector(".assistant-review-result").textContent = item.review?.summary || "平台范围检查通过，等待你的选择。";
    card.querySelector(".assistant-approval-description").textContent = `${item.task_id} · ${item.description}`;
    const command = card.querySelector(".assistant-command"); command.classList.toggle("hidden", !item.command); command.textContent = item.command || "";
    const content = card.querySelector(".assistant-approval-files > div"); content.replaceChildren();
    for (const file of item.files || []) {
      const title = document.createElement("p"), pre = document.createElement("pre");
      title.textContent = `${file.action === "created" ? "创建" : "修改"} ${file.path} · ${file.bytes} bytes`;
      pre.textContent = file.diff || file.content; content.append(title, pre);
    }
    if (item.source) { const pre = document.createElement("pre"); pre.textContent = item.source; content.append(pre); }
    const details = card.querySelector(".assistant-approval-files"); details.classList.toggle("hidden", !item.files?.length && !item.source); details.open = false;
    card.querySelector(".assistant-approval-error").textContent = "";
    card.querySelectorAll("button").forEach(button => { button.disabled = false; });
    card.scrollIntoView({block: "nearest"});
  }
  for (const button of card.querySelectorAll("[data-decision]")) button.addEventListener("click", async () => {
    if (!pending) return;
    const proposal = pending;
    card.querySelectorAll("button").forEach(item => { item.disabled = true; });
    try {
      await api(`/runs/${proposal.run_id}/approvals/${proposal.approval_id}`, {method: "POST", body: {decision: button.dataset.decision}});
      // The stream acknowledges the decision; don't hide a newer proposal here.
    } catch (error) {
      if (pending !== proposal) return;
      card.querySelector(".assistant-approval-error").textContent = error.message;
      card.querySelectorAll("button").forEach(item => { item.disabled = false; });
    }
  });
  function handle(item) {
    if (item.type === "run_started") runId = item.run_id;
    if (item.type === "approval_required") showApproval(item);
    if (item.type === "approval_resolved" && pending?.approval_id === item.approval_id) {
      record({kind: "approval", title: pending.title, task_id: pending.task_id, command: pending.command, decision: item.decision, review: pending.review?.summary});
      pending = null; card.classList.add("hidden");
    }
    if (item.type === "file_changes") { files = mergeFileChanges(files, item.files, item.run_id || runId); drawFiles(); changed(); }
    if (item.type === "command_result") record({kind: "command", task_id: item.task_id, command: item.command, result: item.result});
  }
  async function finish() {
    if (pending) { record({kind: "approval", title: pending.title, task_id: pending.task_id, decision: "stopped"}); pending = null; }
    card.classList.add("hidden");
    // Confirm cleanup through the server, including after an aborted stream.
    await reconcile(runId);
  }
  async function reconcile(endingRun) {
    if (!endingRun) return;
    for (let attempt = 0; attempt < 12; attempt++) {
      try {
        const result = await (await api(`/runs/${endingRun}`)).json();
        if (!result.active) {
          files = files.map(row => row.run_id === endingRun && row.status === "staged" ? {...row, status: row.temporary ? "cleaned" : "discarded"} : row);
          drawFiles(); changed(); return;
        }
      } catch { return; }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  return {handle, snapshot, finish, openFile(taskId, path) {
    const key = `${taskId}/${path}`;
    if (!files.some(row => `${row.task_id}/${row.path}` === key)) return false;
    selector.value = key; filePanel.open = true; drawPreview();
    filePanel.scrollIntoView({block: "nearest"});
    return true;
  }, restore(state = {}) {
    files = state.file_changes || []; activity = state.activity || []; pending = null; runId = "";
    card.classList.add("hidden"); drawFiles(); drawActivity();
    for (const id of new Set(files.filter(row => row.status === "staged").map(row => row.run_id).filter(Boolean))) void reconcile(id);
  }};
}
