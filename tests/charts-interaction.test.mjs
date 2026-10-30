import {test} from "node:test";
import assert from "node:assert/strict";
import {ChartStack} from "../frontend/charts.js";

class Element {
  constructor(tag) {
    this.tagName=tag; this.children=[]; this.listeners={}; this.style={}; this.attributes={};
    this.clientWidth=300; this.flags=new Set();
    this.classList={toggle:(name,on)=>on?this.flags.add(name):this.flags.delete(name)};
    this.context=new Proxy({}, {get:(target,key)=>target[key]??(()=>{})});
  }
  append(...nodes) { for(const node of nodes){if(node.parent)node.parent.children=node.parent.children.filter(child=>child!==node);node.parent=this;this.children.push(node);} }
  replaceChildren(...nodes) { for(const child of this.children)child.parent=null;this.children=[];this.append(...nodes); }
  setAttribute(name,value) { this.attributes[name]=value; }
  addEventListener(name,callback) { this.listeners[name]=callback; }
  getBoundingClientRect() { return {left:0,width:300}; }
  getContext() { return this.context; }
  focus() { this.focused=true; }
  fire(name, options={}) { this.listeners[name]?.({clientX:120.5,preventDefault(){},...options}); }
}

const keys=["joint.slide_x.position","joint.slide_x.velocity","joint.slide_x.acceleration"];
function state(id="demo") {
  return {task:{id,ui:{layout:{charts:keys.map((key,index)=>({title:["位移","速度","加速度"][index],series:[key]}))}}},
    series:{time:[0,.5,1,1.5,2],...Object.fromEntries(keys.map(key=>[key,[0,1,2,3,4]]))},
    seriesUnits:Object.fromEntries(keys.map(key=>[key,"m"])),visibleSeries:new Set(keys)};
}
function setup() {
  const saved=new Map();
  globalThis.document={createElement:tag=>new Element(tag)};
  globalThis.window={devicePixelRatio:1};
  globalThis.ResizeObserver=class {observe(){}};
  globalThis.localStorage={getItem:key=>saved.get(key)??null,setItem:(key,value)=>saved.set(key,value)};
  const make=(data=state())=>{const charts=new ChartStack(new Element("div"),data);charts.rebuild();return charts;};
  return {make,saved};
}

test("click pins linked time across charts, leave and zoom; clicking another chart unlocks",()=>{
  const {make}=setup(),charts=make();
  const [a,b]=charts.cards;
  a.canvas.fire("pointermove"); a.canvas.fire("click");
  assert.equal(charts.cursorPinned,true); assert.equal(charts.hoverTime,.5);
  b.canvas.fire("pointermove",{clientX:284}); a.canvas.fire("pointerleave");
  b.canvas.fire("wheel",{clientX:200,shiftKey:true,deltaY:-1});
  assert.equal(charts.hoverTime,.5);
  for(const card of charts.cards)assert.match(card.stamp.textContent,/固定时刻：0.5 s/);
  b.canvas.fire("click",{clientX:230});
  assert.equal(charts.cursorPinned,false);
  const unlocked=charts.hoverTime;
  a.canvas.fire("pointermove",{clientX:100}); assert.notEqual(charts.hoverTime,unlocked);
  a.canvas.fire("pointerleave"); assert.equal(charts.hoverTime,null);
});

test("moving charts preserves series, fixed readings and per-task order across rebuild and refresh",()=>{
  const {make}=setup(),charts=make(),data=charts.state.series;
  charts.cards[0].canvas.fire("click");
  const fixed=charts.hoverTime, original=charts.cards.map(card=>card.id);
  charts.cards[0].down.fire("click");
  assert.deepEqual(charts.cards.map(card=>card.id),[original[1],original[0],original[2]]);
  assert.deepEqual(charts.container.children,charts.cards.map(card=>card.card));
  assert.equal(charts.cards[0].up.disabled,true); assert.equal(charts.cards[2].down.disabled,true);
  assert.equal(charts.hoverTime,fixed); assert.equal(charts.cursorPinned,true); assert.equal(charts.state.series,data);
  const refreshed=make(); assert.deepEqual(refreshed.cards.map(card=>card.id),charts.cards.map(card=>card.id));
  const other=make(state("other")); assert.deepEqual(other.cards.map(card=>card.id),original);
  charts.rebuild(); assert.deepEqual(charts.cards.map(card=>card.id),refreshed.cards.map(card=>card.id));
  assert.equal(charts.cursorPinned,false);
});

test("chart movement still works when browser storage is blocked",()=>{
  const {make}=setup();
  globalThis.localStorage={getItem(){throw Error("blocked");},setItem(){throw Error("blocked");}};
  const charts=make(),first=charts.cards[0].id;
  charts.cards[0].down.fire("click");charts.rebuild();assert.equal(charts.cards[1].id,first);
});

test("empty datasets cannot pin a cursor and rebuilding clears a stale pin",()=>{
  const {make}=setup(),charts=make();
  charts.cards[0].canvas.fire("click"); assert.equal(charts.cursorPinned,true);
  charts.state.series={time:[]}; charts.rebuild();charts.cards[0].canvas.fire("click");
  assert.equal(charts.cursorPinned,false);assert.equal(charts.hoverTime,null);
  assert.equal(charts.cards[0].stamp.textContent,"等待仿真数据");
});

test("identical chart configurations keep distinct positions when restoring order",()=>{
  const {make}=setup(),data=state();
  data.task.ui.layout.charts.push({...data.task.ui.layout.charts[0]});
  const charts=make(data),last=charts.cards.at(-1);
  assert.notEqual(last.id,charts.cards[0].id);
  charts.moveCard(last,-1);charts.moveCard(last,-1);
  const expected=charts.cards.map(card=>card.id);
  assert.deepEqual(make(data).cards.map(card=>card.id),expected);
});
