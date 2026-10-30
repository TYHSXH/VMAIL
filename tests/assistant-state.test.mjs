import {test} from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source=fs.readFileSync(new URL("../frontend/assistant.js",import.meta.url),"utf8");
const start=source.indexOf("  function persist(");
const persistSource=source.slice(start,source.indexOf("  function scheduleSave(",start));

for(const saved of [true,false])test(`clearing an input-only conversation ${saved?"saves the empty draft":"does not create an empty new record"}`,async()=>{
  const requests=[];
  const makePersist=new Function("api","el","drawHistory","status",`
    let history=[],draft=null,attachments=[],conversationId="draft-one",savedTask=false,validation=null;
    let conversations=${saved?'[{id:"draft-one",title:"旧草稿"}]':'[]'},saveQueue=Promise.resolve(true),saveTimer;
    ${persistSource}
    return persist;
  `);
  const persist=makePersist(async(path,options)=>{requests.push({path,body:options.body});return{json:async()=>({id:"draft-one",title:"新对话"})};},
    {Input:{value:""},HistoryState:{}},()=>{},()=>{});
  await persist();
  assert.equal(requests.length,saved?1:0);
  if(saved){assert.equal(requests[0].body.input,"");assert.deepEqual(requests[0].body.messages,[]);}
});
