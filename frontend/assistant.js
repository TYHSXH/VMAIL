import {renderTaskNotes} from "./task-notes.js";
import {prepareAssistantContext, readAssistantStream} from "./assistant-client.js";
import {readAssistantImage, validateImageFiles} from "./assistant-images.js";

export function setupAssistant({onOpen, onCreated, onError, getTask = () => null}) {
  const panel = document.getElementById("panel-assistant");
  panel.innerHTML = `
    <div class="assistant-heading"><div><span class="panel-kicker">DEEPSEEK</span><h2>把问题变成实验</h2></div><button id="aiNew" class="quiet-button" type="button">新对话</button></div>
    <div class="assistant-history"><label for="aiHistory">历史对话</label><select id="aiHistory" aria-label="选择历史对话"><option value="">新对话</option></select><button id="aiDelete" class="quiet-button" type="button">删除此对话</button><span id="aiHistoryState" role="status"></span></div>
    <details id="aiSettings" class="assistant-settings">
      <summary><span>连接设置</span><span id="aiConnectionState" class="ai-connection-state">读取中</span></summary>
      <form id="aiConnectionForm" class="assistant-connection">
        <p>使用你自己的 API Key，无需填写账号密码。<a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer">获取 API Key ↗</a></p>
        <label>API Key<input id="aiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-…" aria-describedby="aiKeyHelp" /></label>
        <label>对话模型<select id="aiModel"><option value="deepseek-flash">DeepSeek Flash（支持图片）</option><option value="deepseek-v4-pro">DeepSeek V4 Pro（仅文字）</option></select></label>
        <label class="assistant-remember"><input id="aiRemember" type="checkbox" />在这台电脑记住密钥（Windows 加密）</label>
        <p id="aiKeyHelp">默认仅在本次运行中保留。对话和草稿会发送给 DeepSeek，费用由你的 API 账户承担。</p>
        <div class="assistant-row"><button id="aiSave" class="primary-button" type="submit">保存连接</button><button id="aiTest" class="quiet-button" type="button">测试连接</button><button id="aiForget" class="quiet-button" type="button">解除绑定</button></div>
      </form>
    </details>
    <div id="aiConversation" class="assistant-conversation" role="log" aria-label="与 DeepSeek 的对话" aria-live="off">
      <div id="aiWelcome" class="assistant-welcome"><span class="assistant-orbit" aria-hidden="true">＋</span><h3>你想研究什么现象？</h3><button id="aiExample" type="button">试试：比较单摆在不同初始角度下的周期 ↗</button></div>
    </div>
    <section id="aiDraft" class="assistant-draft hidden" aria-label="任务草稿">
      <div class="assistant-draft-heading"><strong>任务文件</strong><span id="aiDraftId"></span></div>
      <p id="aiValidation"></p><ul id="aiErrors" class="assistant-errors"></ul>
      <details><summary>查看生成的文件 <span id="aiFileCount"></span></summary><label class="sr-only" for="aiFile">草稿文件</label><select id="aiFile"></select><pre id="aiFileContent" tabindex="0"></pre></details>
    </section>
    <div class="assistant-bottom">
      <p id="aiStatus" class="assistant-status" role="status"></p>
      <form id="aiChatForm" class="assistant-composer"><div id="aiAttachments" class="assistant-attachments hidden" aria-label="待发送的图片"></div><label class="sr-only" for="aiInput">你的研究问题</label><textarea id="aiInput" rows="3" maxlength="12000" placeholder="描述机构、已知条件；也可以添加题目图或草图…" title="Enter 发送，Shift+Enter 换行"></textarea><input id="aiImageFiles" class="hidden" type="file" accept="image/png,image/jpeg,image/gif,image/webp" multiple /><div class="assistant-compose-actions"><button id="aiChooseImages" class="quiet-button" type="button" aria-label="添加图片">＋ 图片</button><button id="aiStop" class="quiet-button hidden" type="button">停止等待</button><button id="aiSend" class="primary-button" type="submit">发送</button></div></form>
    </div>`;
  const ids = ["Settings", "ConnectionState", "ConnectionForm", "Key", "Model", "Remember", "Save", "Test", "Forget", "Conversation", "Welcome", "Example", "New", "Draft", "DraftId", "Validation", "Errors", "FileCount", "File", "FileContent", "Status", "ChatForm", "Input", "Stop", "Send", "Attachments", "ChooseImages", "ImageFiles"];
  const el = Object.fromEntries(ids.map(name => [name, document.getElementById("ai" + name)]));
  for (const name of ["History", "Delete", "HistoryState"]) el[name] = document.getElementById("ai" + name);
  let history = [], draft = null, validation = null, configured = false, busy = false, controller = null, savedTask = false;
  let attachments = [], readingImages = false, configuredModel = "deepseek-flash";
  let conversationId = crypto.randomUUID(), conversations = [], saveQueue = Promise.resolve(true), saveTimer;

  async function api(path, {method = "GET", body, signal} = {}) {
    const response = await fetch("/api/assistant" + path, {method, signal, headers: {"Content-Type": "application/json", "X-VMAIL-Assistant": "1"}, body: body === undefined ? undefined : JSON.stringify(body)});
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const detail = data.detail;
      throw new Error(typeof detail === "string" ? detail : detail?.message ? detail.message + " " + (detail.errors || []).join("；") : `请求失败（${response.status}），请检查输入或服务状态。`);
    }
    return response;
  }
  function status(text, error = false) {
    el.Status.textContent = text;
    el.Status.classList.toggle("error", error);
  }
  function drawHistory() {
    el.History.replaceChildren(new Option("新对话", ""));
    for (const item of conversations) el.History.add(new Option(item.title, item.id));
    el.History.value = conversations.some(item => item.id === conversationId) ? conversationId : "";
    sync();
  }
  function persist() {
    clearTimeout(saveTimer);
    if (!history.length && !el.Input.value && !attachments.length && !draft) return saveQueue;
    const id = conversationId;
    const state = JSON.parse(JSON.stringify({messages: history, input: el.Input.value, attachments, draft, validation, saved_task: savedTask}));
    el.HistoryState.textContent = "正在保存…";
    saveQueue = saveQueue.then(async () => {
      try {
        const item = await (await api(`/conversations/${id}`, {method: "PUT", body: state})).json();
        conversations = [item, ...conversations.filter(other => other.id !== id)];
        drawHistory(); el.HistoryState.textContent = "已保存到本机";
        return true;
      } catch (error) {
        el.HistoryState.textContent = "保存失败，内容仍在页面中";
        status(error.message, true); return false;
      }
    });
    return saveQueue;
  }
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(persist, 500); }
  function showConversation(state = {}) {
    history = state.messages || []; draft = state.draft || null; validation = state.validation || {valid: false, errors: []};
    savedTask = !!state.saved_task; attachments = state.attachments || []; el.Input.value = state.input || "";
    for (const item of el.Conversation.querySelectorAll(".assistant-message")) item.remove();
    el.Welcome.classList.toggle("hidden", !!history.length);
    for (const item of history) {
      const body = message(item.role, item.content, false, item.images || []);
      if (item.incomplete) { body.classList.add("incomplete"); body.append(document.createTextNode("\n（本轮未完成；如需继续，请重新发送。）")); }
    }
    drawAttachments(); drawDraft(); drawHistory();
  }
  async function selectConversation(id) {
    const state = await (await api(`/conversations/${id}`)).json();
    conversationId = id; showConversation(state);
    el.HistoryState.textContent = "已恢复本机记录";
  }
  function sync() {
    const working = busy || readingImages;
    el.Send.disabled = working || !configured;
    el.Input.disabled = working;
    el.ChooseImages.disabled = working;
    for (const item of [el.New, el.Save, el.Model, el.Key]) item.disabled = working;
    el.History.disabled = working;
    el.Delete.disabled = working || !conversations.some(item => item.id === conversationId);
    el.Remember.disabled = working || el.Remember.dataset.supported === "false";
    el.Test.disabled = working || !configured;
    el.Forget.disabled = working || !configured;
    el.Attachments.querySelectorAll("button").forEach(button => { button.disabled = working; });
    el.Stop.classList.toggle("hidden", !controller);
    panel.setAttribute("aria-busy", String(working));
  }
  function connection(data) {
    configured = data.configured;
    configuredModel = data.model;
    el.ConnectionState.textContent = configured ? "已绑定" : "未绑定";
    el.ConnectionState.classList.toggle("ready", configured);
    el.Model.value = data.model; el.Remember.checked = data.remember;
    el.Remember.dataset.supported = String(data.can_remember);
    el.Key.placeholder = configured ? "已保存；留空保留原密钥" : "sk-…";
    if (!configured) el.Settings.open = true;
    sync();
    if (data.notice) status(data.notice, true);
  }
  function message(role, text, plain = false, images = []) {
    el.Welcome.classList.add("hidden");
    const article = document.createElement("article"); article.className = "assistant-message " + role;
    const label = document.createElement("span"); label.className = "assistant-message-role"; label.textContent = role === "user" ? "你" : "DeepSeek";
    const body = document.createElement("div"); body.className = "task-prose";
    if (role === "user" || plain) body.textContent = text; else renderTaskNotes(body, text);
    article.append(label);
    if (images.length) {
      const gallery = document.createElement("div"); gallery.className = "assistant-message-images";
      for (const image of images) {
        const img = document.createElement("img"); img.src = image.data_url; img.alt = image.name || "上传的图片";
        gallery.append(img);
      }
      article.append(gallery);
    }
    article.append(body); el.Conversation.append(article);
    article.scrollIntoView({block: "nearest"});
    return body;
  }
  function drawAttachments() {
    el.Attachments.replaceChildren();
    el.Attachments.classList.toggle("hidden", !attachments.length);
    attachments.forEach((image, index) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img"); img.src = image.data_url; img.alt = image.name;
      const caption = document.createElement("figcaption"); caption.textContent = image.name; caption.title = image.name;
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×";
      remove.setAttribute("aria-label", `移除图片 ${image.name}`);
      remove.addEventListener("click", () => {
        attachments.splice(index, 1); drawAttachments(); sync(); scheduleSave();
        status(attachments.length ? `还有 ${attachments.length} 张图片待发送。` : "已移除待发送图片。");
      });
      figure.append(img, caption, remove); el.Attachments.append(figure);
    });
  }
  async function addImages(files) {
    if (busy || readingImages) { status("请等待当前请求处理完成后再添加图片。", true); return; }
    if (!files.length) return;
    readingImages = true; sync();
    try {
      validateImageFiles(files, attachments.length);
      const images = await Promise.all(Array.from(files, readAssistantImage));
      attachments.push(...images); drawAttachments(); scheduleSave();
      status(configured && configuredModel !== "deepseek-flash" ? "图片已添加。请在连接设置中切换为 DeepSeek Flash 并保存后发送。" : `已添加 ${images.length} 张图片，点击发送后才会传给 DeepSeek。`);
    } catch (error) { status(error.message, true); }
    finally { readingImages = false; sync(); }
  }
  function usageText(usage) {
    return usage?.total_tokens ? `本次 ${usage.total_tokens.toLocaleString()} tokens` : "";
  }
  function drawDraft() {
    el.Draft.classList.toggle("hidden", !draft);
    if (!draft) return;
    el.DraftId.textContent = draft.task_id;
    const updating = draft.operation === "update";
    el.Validation.textContent = savedTask ? (updating ? "已更新，可在左侧任务列表打开" : "已创建，可在左侧任务列表打开") : validation.valid ? "文件已通过校验" : (updating ? "修改未保存，可继续对话修正" : "尚未创建，可继续对话修正");
    el.Validation.className = validation.valid ? "passed" : "error";
    el.Errors.replaceChildren();
    for (const error of validation.errors || []) { const li = document.createElement("li"); li.textContent = error; el.Errors.append(li); }
    el.File.replaceChildren();
    for (const name of Object.keys(draft.files)) { const option = document.createElement("option"); option.value = name; option.textContent = name; el.File.append(option); }
    el.FileCount.textContent = `（${Object.keys(draft.files).length}）`;
    el.FileContent.textContent = draft.files[el.File.value];
    el.Draft.scrollIntoView({block: "nearest"}); sync();
  }
  async function chat() {
    const originalText = el.Input.value.trim();
    const text = originalText || (attachments.length ? "请分析图片中的题目或机构，帮助我明确建模条件和实验方案。" : "");
    if (!text || busy || readingImages || !configured) return;
    if (configuredModel !== "deepseek-flash" && (attachments.length || history.some(m => m.images?.length))) {
      el.Settings.open = true; status("图片理解需要 DeepSeek Flash，请切换模型并保存；或者新建纯文字对话。", true); return;
    }
    const images = attachments;
    const turn = {role: "user", content: text, incomplete: true, ...(images.length ? {images} : {})};
    history.push(turn); message("user", text, false, images);
    attachments = []; drawAttachments();
    el.Input.value = "";
    busy = true; controller = new AbortController(); sync(); status("DeepSeek 正在思考…");
    void persist();
    const body = message("assistant", "正在连接…", true);
    let answer = "", taskEvent = null;
    try {
      const context = history.map(item => item === turn ? {...item, incomplete: false} : item);
      const {messages, omitted} = prepareAssistantContext(context, savedTask && getTask() ? null : draft, false, savedTask ? [] : validation?.errors || []);
      const response = await api("/chat", {method: "POST", body: {messages, current_task_id: getTask()}, signal: controller.signal});
      const usage = await readAssistantStream(response, delta => {
        const nearBottom = el.Conversation.scrollHeight - el.Conversation.scrollTop - el.Conversation.clientHeight < 100;
        answer += delta; body.textContent = answer;
        if (nearBottom) el.Conversation.scrollTop = el.Conversation.scrollHeight;
      }, item => {
        if (item.type === "status") status(item.message);
        if (item.type === "draft") taskEvent = item;
        if (item.type === "task_error") answer += "\n\n程序结果：" + item.message;
      });
      if (taskEvent) {
        draft = taskEvent.draft; validation = taskEvent.validation; savedTask = false;
        if (validation.valid) {
          controller = null; sync(); status("正在保存任务…");
          try {
            const updating = taskEvent.operation === "update";
            const result = await (await api(updating ? `/tasks/${encodeURIComponent(draft.task_id)}` : "/tasks", {method: updating ? "PATCH" : "POST", body: updating ? taskEvent.edit : draft})).json();
            savedTask = true;
            if (result.task.base_revision) draft.base_revision = result.task.base_revision;
            answer += `\n\n程序结果：已${updating ? "更新" : "创建"}任务「${result.task.title}」，可以在左侧打开。`;
            try { await onCreated(result.task); } catch (error) { onError("任务已保存，刷新列表后可打开。" + error.message); }
          } catch (error) { validation = {valid: false, errors: [error.message]}; }
        }
        if (!validation.valid) answer += "\n\n程序结果：" + (draft.operation === "update" ? "修改未保存，原任务保留。" : "任务尚未创建。") + "\n" + validation.errors.map(error => "- " + error).join("\n") + "\n可以继续告诉我如何修改，或让我根据错误重试。";
        drawDraft();
      }
      if (!answer.trim()) answer = "本次未保存任务变更，可以继续描述你的需求。";
      turn.incomplete = false;
      renderTaskNotes(body, answer); history.push({role: "assistant", content: answer});
      status([usageText(usage), omitted ? `本次使用近期上下文，较早 ${omitted} 条消息仍可在上方查看。` : ""].filter(Boolean).join(" · "));
    } catch (error) {
      history.push({role: "assistant", content: answer || "未获得完整回答。", incomplete: true});
      if (!el.Input.value.trim()) el.Input.value = originalText;
      if (!attachments.length) { attachments = images; drawAttachments(); }
      body.textContent = answer || "未获得完整回答。";
      body.classList.add("incomplete");
      status(error.name === "AbortError" ? "已停止等待；已发出的请求仍可能产生 API 费用。" : error.message, true);
    } finally { busy = false; controller = null; sync(); void persist(); el.Input.focus(); }
  }
  el.ChatForm.addEventListener("submit", event => { event.preventDefault(); chat(); });
  el.ChooseImages.addEventListener("click", () => el.ImageFiles.click());
  el.ImageFiles.addEventListener("change", () => { void addImages(Array.from(el.ImageFiles.files)); el.ImageFiles.value = ""; });
  el.Input.addEventListener("paste", event => {
    const files = Array.from(event.clipboardData?.items || []).filter(item => item.kind === "file" && item.type.startsWith("image/")).map(item => item.getAsFile()).filter(Boolean);
    if (files.length) { event.preventDefault(); void addImages(files); }
  });
  el.Input.addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey && !event.isComposing) { event.preventDefault(); chat(); } });
  el.Stop.addEventListener("click", () => controller?.abort());
  el.File.addEventListener("change", () => { el.FileContent.textContent = draft?.files[el.File.value] || ""; });
  el.Example.addEventListener("click", () => { el.Input.value = "我想创建一个单摆实验，比较不同初始角度下的周期。请先和我确认建模条件及需要观察的量。"; scheduleSave(); el.Input.focus(); });
  el.Input.addEventListener("input", scheduleSave);
  el.New.addEventListener("click", async () => {
    busy = true; sync();
    try {
      if (!await persist()) return;
      conversationId = crypto.randomUUID(); showConversation();
      el.HistoryState.textContent = "";
      status("新对话已开始；之前的对话可从历史列表恢复。"); el.Input.focus();
    } finally { busy = false; sync(); }
  });
  el.History.addEventListener("change", async () => {
    const id = el.History.value;
    if (!id) { el.New.click(); return; }
    busy = true; sync();
    try { if (await persist()) { await selectConversation(id); status("对话已恢复；助手将以左侧当前选中任务为操作对象，也可在消息中指定任务编号。"); } }
    catch (error) { status(error.message, true); }
    finally { busy = false; drawHistory(); }
  });
  el.Delete.addEventListener("click", async () => {
    if (!window.confirm("删除此对话及其图片、草稿？已创建的任务与实验结果会保留。此操作无法撤销。")) return;
    busy = true; sync(); clearTimeout(saveTimer);
    try {
      await saveQueue;
      await api(`/conversations/${conversationId}`, {method: "DELETE"});
      conversations = conversations.filter(item => item.id !== conversationId);
      conversationId = crypto.randomUUID(); showConversation();
      el.HistoryState.textContent = "";
      status("对话已删除，已创建的任务与实验结果保留。");
    } catch (error) { status(error.message, true); }
    finally { busy = false; sync(); }
  });
  el.ConnectionForm.addEventListener("submit", async event => {
    event.preventDefault(); if (busy) return;
    busy = true; sync(); status("正在保存连接设置…");
    try {
      const response = await api("/connection", {method: "PUT", body: {api_key: el.Key.value, model: el.Model.value, remember: el.Remember.checked}});
      el.Key.value = ""; connection(await response.json()); el.Settings.open = false;
      status("连接设置已保存。可测试连接，或直接开始对话。");
    } catch (error) { status(error.message, true); }
    finally { busy = false; sync(); }
  });
  el.Test.addEventListener("click", async () => {
    busy = true; sync(); status("正在验证 API Key 和模型访问权限…");
    try { await api("/connection/test", {method: "POST"}); status("连接成功，可以开始对话。"); }
    catch (error) { status(error.message, true); }
    finally { busy = false; sync(); }
  });
  el.Forget.addEventListener("click", async () => {
    busy = true; sync();
    try { const response = await api("/connection", {method: "DELETE"}); connection(await response.json()); el.Key.value = ""; status("已清除本次运行和本机保存的密钥。"); }
    catch (error) { status(error.message, true); }
    finally { busy = false; sync(); }
  });
  function open() { onOpen(); if (window.innerWidth <= 720) document.getElementById("collapseTasks").click(); (configured ? el.Input : el.Key).focus(); }
  document.getElementById("openAssistant").addEventListener("click", open);
  sync();
  busy = true; sync();
  api("/conversations").then(response => response.json()).then(async data => {
    conversations = data.conversations; drawHistory();
    if (conversations.length) await selectConversation(conversations[0].id);
  }).catch(error => status(error.message, true)).finally(() => { busy = false; sync(); });
  api("/connection").then(response => response.json()).then(connection).catch(error => { status(error.message, true); onError(error.message); });
  return {open, addImages};
}
