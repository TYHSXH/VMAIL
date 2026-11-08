import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {prepareAssistantContext, readAssistantStream} from "../frontend/assistant-client.js";

const source=fs.readFileSync(new URL("../frontend/assistant.js",import.meta.url),"utf8");
const start=source.indexOf("  function persist(");
const persistSource=source.slice(start,source.indexOf("  function scheduleSave(",start));

for(const saved of [true,false])test(`clearing an input-only conversation ${saved?"saves the empty draft":"does not create an empty new record"}`,async()=>{
  const requests=[];
  const makePersist=new Function("api","el","drawHistory","status",`
    let history=[],draft=null,attachments=[],conversationId="draft-one",savedTask=false,validation=null;
    const agentWorkspace={snapshot:()=>({file_changes:[],activity:[]})};
    let conversations=${saved?'[{id:"draft-one",title:"旧草稿"}]':'[]'},saveQueue=Promise.resolve(true),saveTimer;
    ${persistSource}
    return persist;
  `);
  const persist=makePersist(async(path,options)=>{requests.push({path,body:options.body});return{json:async()=>({id:"draft-one",title:"新对话"})};},
    {Input:{value:""},Thinking:{checked:true},Effort:{value:"high"},HistoryState:{}},()=>{},()=>{});
  await persist();
  assert.equal(requests.length,saved?1:0);
  if(saved){assert.equal(requests[0].body.input,"");assert.deepEqual(requests[0].body.messages,[]);assert.equal(requests[0].body.reasoning_effort,"high");}
});

function chatHarness(events, {truncated = false} = {}) {
  const requests = [], created = [], statuses = [];
  const el = {Input: {value: "创建任务", focus() {}}, Thinking:{checked:true},Effort:{value:"high"}, Settings: {}, Conversation: {scrollHeight: 0, scrollTop: 0, clientHeight: 100}};
  const body = {classList: {add() {}}};
  const chatStart = source.indexOf("  async function chat(");
  const chatSource = source.slice(chatStart, source.indexOf("  el.ChatForm.addEventListener", chatStart));
  const create = new Function("deps", `
    const {el, api, status, message, prepareAssistantContext, readAssistantStream, onCreated} = deps;
    const sync = () => {}, drawDraft = () => {}, drawAttachments = () => {}, persist = () => {}, onError = () => {};
    const getTask = () => null, renderTaskNotes = (body, text) => body.textContent = text;
    const usageText = usage => usage?.total_tokens ? String(usage.total_tokens) : "";
    let history = [], draft = null, validation = null, savedTask = false, attachments = [], busy = false, controller = null;
    let readingImages = false, configured = true, configuredModel = "deepseek-flash";
    let activeRunId="",steeringSending=false;const steeringMessages=new Map();
    const turnView={handle:()=>{},replyStarted:()=>{},finish:()=>{},snapshot:()=>({thinking_text:"",thinking_truncated:false,turn_files:[]})};
    const messageViews={get:()=>turnView};
    const conversationId="test-chat",agentWorkspace={handle:()=>{},finish:async()=>{},snapshot:()=>({file_changes:[]})};
    ${chatSource}
    return {chat, state: () => ({history, draft, validation, savedTask, busy})};
  `);
  const harness = create({el, status: text => statuses.push(text), message: () => body, prepareAssistantContext, readAssistantStream,
    onCreated: async task => created.push(task),
    api: async (path, options) => {
      requests.push({path, options});
      return new Response(events.map(event => JSON.stringify(event)).join("\n") + (truncated ? "" : '\n{"type":"done","usage":{"total_tokens":30}}\n'));
    }});
  return {...harness, requests, created, statuses, body, el};
}

const failedDraft = {type: "draft", draft: {task_id: "pendulum", files: {"model.xml": "broken"}}, validation: {valid: false, errors: ["missing joint"]}};
const saved = {type: "task_saved", draft: {task_id: "pendulum", files: {"model.xml": "fixed"}}, validation: {valid: true, errors: []}, task: {id: "pendulum", title: "单摆"}};

test("automatic repair consumes one chat stream and never submits a second save", async () => {
  const harness = chatHarness([failedDraft, {type: "status", message: "正在自动修复"}, saved]);
  await harness.chat();
  assert.deepEqual(harness.requests.map(item => item.path), ["/chat"]);
  assert.deepEqual(harness.created, [saved.task]);
  assert.equal(harness.state().savedTask, true);
  assert.equal(harness.state().draft.files["model.xml"], "fixed");
  assert.match(harness.body.textContent, /已创建任务「单摆」/);
  assert.equal(harness.state().history.length, 2);
  assert.equal(harness.state().history[0].incomplete, false);
});

test("a confirmed backend save survives a disconnect before done", async () => {
  const harness = chatHarness([saved], {truncated: true});
  await harness.chat();
  assert.equal(harness.state().savedTask, true);
  assert.deepEqual(harness.created, [saved.task]);
  assert.equal(harness.state().history[0].incomplete, false);
  assert.match(harness.statuses.at(-1), /不影响保存结果/);
  assert.equal(harness.el.Input.value, "");
});

test("a confirmed save survives a later failed edit and disconnect", async () => {
  const harness=chatHarness([saved,failedDraft],{truncated:true});
  await harness.chat();
  assert.deepEqual(harness.created,[saved.task]);
  assert.match(harness.body.textContent,/已创建任务「单摆」/);
  assert.equal(harness.state().history[0].incomplete,false);
});

test("failed retries retain the latest draft for the next turn", async () => {
  const harness = chatHarness([failedDraft, {type: "task_error", message: "达到调用上限"}]);
  await harness.chat();
  assert.equal(harness.state().savedTask, false);
  assert.equal(harness.created.length, 0);
  assert.deepEqual(harness.state().draft, failedDraft.draft);
  assert.match(harness.body.textContent, /missing joint/);
  assert.match(harness.body.textContent, /达到调用上限/);
});

test("a correction separates the old response, student message and revised answer in history",async()=>{
  const harness=chatHarness([{type:"run_started",run_id:"one"},{type:"delta",content:"原方案"},
    {type:"steering_applied",messages:[{id:"update",content:"改为只解释"}]},{type:"delta",content:"已修正"}]);
  await harness.chat();
  const history=harness.state().history;
  assert.deepEqual(history.map(m=>m.role),["user","assistant","user","assistant"]);
  assert.deepEqual(history.map(m=>m.content),["创建任务","原方案","改为只解释","已修正"]);
  assert.equal(harness.requests[0].options.body.deep_thinking,true);
  assert.equal(harness.requests[0].options.body.reasoning_effort,"high");
  assert.ok(history.every(m=>!m.incomplete));
});
