import {test} from "node:test";
import assert from "node:assert/strict";
import {mergeFileChanges} from "../frontend/assistant-workspace.js";
import {readAssistantStream} from "../frontend/assistant-client.js";

test("file history retains all created and edited files across multiple tool calls and turns", () => {
  let rows = mergeFileChanges([], [{task_id:"a",path:"model.xml",action:"created",status:"staged"}], "one");
  rows = mergeFileChanges(rows, [{task_id:"a",path:"notes.md",action:"created",status:"saved"}], "one");
  rows = mergeFileChanges(rows, [{task_id:"a",path:"model.xml",action:"modified",status:"saved",content:"latest"}], "two");
  assert.equal(rows.length, 2);
  assert.equal(rows[0].action, "created");
  assert.equal(rows[0].content, "latest");
  assert.equal(rows[0].run_id, "two");
  assert.equal(rows[1].path, "notes.md");
});

test("approval and command events arrive while the answer stream remains open", async () => {
  const events=[];
  const stream=new ReadableStream({start(controller){
    controller.enqueue(new TextEncoder().encode('{"type":"approval_required","approval_id":"a"}\n'));
    setTimeout(()=>{controller.enqueue(new TextEncoder().encode('{"type":"command_result","result":{"exit_code":0}}\n{"type":"done"}\n'));controller.close();},10);
  }});
  await readAssistantStream(new Response(stream),()=>{},event=>events.push(event));
  assert.deepEqual(events.map(e=>e.type),["approval_required","command_result"]);
});
