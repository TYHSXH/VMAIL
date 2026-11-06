import {test} from "node:test";
import assert from "node:assert/strict";
import {mergeTurnFiles, setupAssistantTurn} from "../frontend/assistant-turn.js";
import {fileStatusLabel} from "../frontend/assistant-workspace.js";
import {prepareAssistantContext} from "../frontend/assistant-client.js";

test("turn file metadata excludes file bodies and keeps creation and save state",()=>{
  let files=mergeTurnFiles([], [{task_id:"one",path:"notes.md",action:"created",status:"saved",content:"large body",diff:"large diff"}], "first");
  files=mergeTurnFiles(files,[{task_id:"one",path:"notes.md",action:"modified",status:"discarded"}],"first");
  assert.equal(files.length,1);
  assert.equal(files[0].action,"created");
  assert.equal(fileStatusLabel(files[0]),"已保存，后续改动未保存");
  assert.equal("content" in files[0],false);
  assert.equal("diff" in files[0],false);
  const next=mergeTurnFiles([], [{task_id:"one",path:"notes.md",action:"modified",status:"staged"}],"second");
  assert.equal(next[0].action,"modified");
  assert.equal(next[0].saved_before,false);
});

test("displayed reasoning and file metadata do not enter ordinary prompt messages",()=>{
  const {messages}=prepareAssistantContext([{role:"assistant",content:"已保存",thinking_text:"上游思考",turn_files:[{path:"notes.md"}]},{role:"user",content:"继续"}],null);
  assert.deepEqual(messages,[{role:"assistant",content:"已保存"},{role:"user",content:"继续"}]);
});

test("a previously saved file is not counted as saved in a new unsaved turn",()=>{
  const old=mergeTurnFiles([],[{task_id:"one",path:"notes.md",action:"modified",status:"saved"}],"first");
  const current=mergeTurnFiles(old,[{task_id:"one",path:"notes.md",action:"modified",status:"discarded"}],"second");
  assert.equal(current[0].saved_before,false);
  assert.equal(fileStatusLabel(current[0]),"未保存 · 已清理");
});

// Minimal DOM records work performed by the real component; layout reads fail.
class TestElement {
  constructor(tag) { this.tagName=tag;this.children=[];this.handlers={};this.className="";this.attributes={};this.open=false;this.data="";this._text="";this.writes=0;
    this.classList={add:()=>{},remove:()=>{},toggle:()=>{}};
  }
  set textContent(value){this._text=value;this.writes++;}
  get textContent(){return this._text;}
  append(...items){this.children.push(...items);}
  insertBefore(item,before){this.children.splice(this.children.indexOf(before),0,item);}
  replaceChildren(...items){this.children=items;}
  addEventListener(name,handler){this.handlers[name]=handler;}
  setAttribute(name,value){this.attributes[name]=value;}
  get scrollHeight(){throw new Error("Thinking rendering must not force synchronous layout");}
}
function turnDom(t,initial={}){
  const original=globalThis.document;
  globalThis.document={createElement:tag=>new TestElement(tag),createTextNode:data=>Object.assign(new TestElement("#text"),{data})};
  t.after(()=>{globalThis.document=original;});
  t.mock.timers.enable({apis:["setTimeout"]});
  const article=new TestElement("article"),body=new TestElement("div");article.append(body);
  const turn=setupAssistantTurn(article,body,initial);
  const thinking=article.children[0],pre=thinking.children[1],pages=thinking.children[2];
  return {turn,thinking,pre,pages};
}

test("forty thousand reasoning chunks batch into one bounded DOM text node",t=>{
  const {turn,thinking,pre}=turnDom(t);
  const chunk="核对长思考的流式渲染与单摆动画。\n";
  for(let i=0;i<40000;i++)turn.handle({type:"reasoning_delta",round:1,content:chunk});
  assert.equal(thinking.open,true);
  assert.equal(pre.children.length,1);
  assert.equal(pre.children[0].data,"");
  t.mock.timers.tick(100);
  assert.equal(pre.children[0].data.length,12000);
  assert.equal(turn.snapshot().thinking_text,chunk.repeat(40000));
  thinking.open=false;thinking.handlers.toggle();
  const lastPaint=pre.children[0].data;
  turn.handle({type:"reasoning_delta",round:1,content:"后续内容"});
  t.mock.timers.tick(1000);
  assert.equal(pre.children[0].data,lastPaint);
  turn.replyStarted();assert.equal(thinking.open,false);
  thinking.open=true;thinking.handlers.toggle();
  assert.equal(pre.children[0].data.endsWith("后续内容"),true);
  turn.finish();t.mock.timers.tick(1000);
  assert.equal(thinking.open,false);
});

test("long restored thinking stays lazy and every segment remains available",t=>{
  const text="a".repeat(12000)+"b".repeat(12000)+"c".repeat(12000);
  const {turn,thinking,pre,pages}=turnDom(t,{thinking_text:text,content:"已完成"});
  assert.equal(pre.children[0].data,"");
  thinking.open=true;thinking.handlers.toggle();
  assert.equal(pre.children[0].data,"c".repeat(12000));
  pages.children[0].handlers.click();assert.equal(pre.children[0].data,"b".repeat(12000));
  pages.children[0].handlers.click();assert.equal(pre.children[0].data,"a".repeat(12000));
  pages.children[1].handlers.click();assert.equal(pre.children[0].data,"b".repeat(12000));
  pages.children[2].handlers.click();assert.equal(pre.children[0].data,"c".repeat(12000));
  assert.equal(turn.snapshot().thinking_text,text);
});

test("finishing cancels a pending paint and enforces the stored preview limit",t=>{
  const {turn,thinking,pre}=turnDom(t);
  turn.handle({type:"reasoning_delta",content:"x".repeat(1000100)});
  assert.equal(turn.snapshot().thinking_text.length,1000000);
  assert.equal(turn.snapshot().thinking_truncated,true);
  turn.finish();t.mock.timers.tick(1000);
  assert.equal(pre.children[0].data,"");
  thinking.open=true;thinking.handlers.toggle();
  assert.equal(pre.children[0].data.length,12000);
});

