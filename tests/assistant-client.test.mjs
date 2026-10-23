import {test} from "node:test";
import assert from "node:assert/strict";
import {prepareAssistantContext, readAssistantStream} from "../frontend/assistant-client.js";
import {classifyDroppedFiles, setupFileDrop} from "../frontend/file-drop.js";
import {validateImageFiles, imageMime} from "../frontend/assistant-images.js";

function response(text, split = false) {
  const bytes = new TextEncoder().encode(text);
  return new Response(new ReadableStream({start(controller) {
    if (split) for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
    else controller.enqueue(bytes);
    controller.close();
  }}));
}

test("stream handles UTF-8 split across bytes and final line without newline", async () => {
  let answer = "";
  const usage = await readAssistantStream(response('{"type":"delta","content":"单摆"}\n{"type":"done","usage":{"total_tokens":42}}', true), value => answer += value);
  assert.equal(answer, "单摆"); assert.equal(usage.total_tokens, 42);
});

test("truncated and failed streams cannot count as complete answers", async () => {
  await assert.rejects(readAssistantStream(response('{"type":"delta","content":"partial"}\n'), () => {}), /不完整/);
  await assert.rejects(readAssistantStream(response('{"type":"error","message":"余额不足"}\n'), () => {}), /余额不足/);
});

test("repair receives complete previous files and validation errors without mutating history", () => {
  const history = [{role: "user", content: "创建单摆"}, {role: "assistant", content: "长度一米"}, {role: "user", content: "修复草稿"}];
  const draft = {task_id: "pendulum", files: {"model.xml": "<mujoco/>"}};
  const {messages} = prepareAssistantContext(history, draft, ["missing joint"]);
  assert.match(messages.at(-1).content, /model.xml/);
  assert.match(messages.at(-1).content, /missing joint/);
  assert.equal(messages.at(-1).role, "user"); assert.equal(history.length, 3); assert.equal(history.at(-1).content, "修复草稿");
});

test("new user question carries the current files and long histories keep recent context", () => {
  const {messages} = prepareAssistantContext([{role: "user", content: "将质量改成2kg"}], {task_id: "pendulum", files: {}});
  assert.match(messages[0].content, /pendulum/); assert.match(messages[0].content, /2kg/);
  const history = Array.from({length: 401}, (_, i) => ({role: "user", content: `消息${i}`}));
  const prepared = prepareAssistantContext(history, null);
  assert.equal(history.length, 401);
  assert.equal(prepared.messages.length, 200);
  assert.equal(prepared.omitted, 201);
  assert.match(prepared.messages.at(-1).content, /消息400/);
});

test("image context is retained in chat, task generation, and repair without mutating history", () => {
  const image = {name: "diagram.png", data_url: "data:image/png;base64," + "A".repeat(200000)};
  const history = [{role: "user", content: "按图建模", images: [image]}];
  for (const errors of [[], ["bad joint"]]) {
    const {messages} = prepareAssistantContext(history, {task_id: "p", files: {}}, errors);
    assert.deepEqual(messages[0].images, [image]);
    assert.notEqual(messages[0].images[0], image);
    assert.equal(history[0].content, "按图建模");
  }
  const tooMany = Array.from({length: 3}, () => ({role: "user", content: "图", images: [image,image,image,image]}));
  const prepared = prepareAssistantContext(tooMany, null);
  assert.equal(prepared.omitted, 1);
  assert.equal(prepared.messages.flatMap(m => m.images || []).length, 8);
});

test("creation results are only delivered from a complete stream", async () => {
  const events = [];
  await readAssistantStream(response('{"type":"status","message":"校验中"}\n{"type":"draft","draft":{"task_id":"a"},"validation":{"valid":true}}\n{"type":"done"}\n'), () => {}, event => events.push(event));
  assert.equal(events[1].draft.task_id, "a");
  await assert.rejects(readAssistantStream(response('{"type":"draft","draft":{"task_id":"a"}}\n'), () => {}, () => {}), /不完整/);
});

test("image selection refuses unsupported files, excessive counts, and oversized attachments", () => {
  const image = {name: "diagram.PNG", type: "image/png", size: 100};
  validateImageFiles([image]);
  assert.throws(() => validateImageFiles([image], 4), /4 张/);
  assert.throws(() => validateImageFiles([{...image, size: 6 * 1024 * 1024}]), /5 MB/);
  assert.throws(() => validateImageFiles([{name: "model.xml", type: "text/xml", size: 100}]), /XML/);
  assert.throws(() => validateImageFiles([{name: "image.svg", type: "image/svg+xml", size: 100}]), /仅支持/);
  assert.equal(imageMime(new Uint8Array([137,80,78,71,13,10,26,10])), "image/png");
  assert.equal(imageMime(new TextEncoder().encode("<svg/>")), null);
});

test("file routing keeps image drops, XML drops and mixed drops separate", () => {
  const image = {name: "diagram.png", type: "image/png"};
  const xml = {name: "MODEL.XML", type: "text/xml"};
  assert.equal(classifyDroppedFiles([image]), "images");
  assert.equal(classifyDroppedFiles([xml]), "xml");
  assert.equal(classifyDroppedFiles([image,xml]), "mixed");
  assert.equal(classifyDroppedFiles([xml,xml]), "mixed");
  assert.equal(classifyDroppedFiles([{name: "diagram.jpg", type: ""}]), "images");
});

test("global drop dispatcher delivers each file set to exactly one owner", t => {
  const oldWindow = globalThis.window, oldDocument = globalThis.document;
  const listeners = {}, calls = [];
  globalThis.window = {addEventListener(name, fn) { listeners[name] = fn; }};
  globalThis.document = {getElementById() { return {classList: {add(){}, remove(){}}}; }};
  t.after(() => { globalThis.window = oldWindow; globalThis.document = oldDocument; });
  setupFileDrop({onXml: files => calls.push(["xml", files]), onImages: files => calls.push(["images", files]), onError: error => calls.push(["error", error])});
  const send = files => listeners.drop({dataTransfer: {types: ["Files"], files}, preventDefault(){}});
  send([{name: "diagram.png", type: "image/png"}]);
  send([{name: "model.xml", type: "text/xml"}]);
  send([{name: "diagram.png", type: "image/png"},{name: "model.xml", type: "text/xml"}]);
  assert.deepEqual(calls.map(([owner]) => owner), ["images", "xml", "error"]);
});
test("incomplete turns stay in the stored transcript but are excluded from model context", () => {
  const history = [
    {role: "user", content: "失败的问题", incomplete: true},
    {role: "assistant", content: "截断回答", incomplete: true},
    {role: "user", content: "重新发送的问题"},
  ];
  const {messages} = prepareAssistantContext(history, null);
  assert.deepEqual(messages, [{role: "user", content: "重新发送的问题"}]);
  assert.equal(history.length, 3);
});
