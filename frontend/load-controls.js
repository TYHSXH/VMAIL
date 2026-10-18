import katex from "katex";
import { ChartStack } from "./charts.js";
import { forecastLoads } from "./load-preview.js";

export function renderLoadFormula(container, entry) {
  const math = entry.math;
  if (!math) { container.textContent = "请重启后台，以显示格式化公式。"; return; }
  const rows = entry.type === "wrench" ? [
    `\\mathbf F(t)=\\begin{bmatrix}${math.force.join("\\\\")}\\end{bmatrix}\\;\\mathrm{N}`,
    `\\mathbf M_0(t)=\\begin{bmatrix}${math.torque.join("\\\\")}\\end{bmatrix}\\;\\mathrm{N\\cdot m}`,
  ] : [`${entry.type === "joint" ? entry.source.unit === "N" ? "F" : "M" : "u"}(t)=${math.value}`];
  for (const tex of rows) {
    const row = document.createElement("div");
    katex.render(tex, row, {throwOnError:false,trust:false,displayMode:true,strict:"ignore",maxExpand:1000});
    container.append(row);
  }
}

export class LoadPreviewPanel {
  constructor(getViewer, getTask, getDuration) {
    Object.assign(this,{getViewer,getTask,getDuration}); this.version=0;
  }
  clear() { this.version++; clearTimeout(this.timer); this.charts?.observer.disconnect(); this.charts=null; this.container?.remove(); this.container=null; }
  invalidate(message) {
    if(!this.container)return;
    this.version++;clearTimeout(this.timer);this.charts?.observer.disconnect();this.charts=null;this.plot.replaceChildren();this.status.textContent=message;
  }
  mount(parent) {
    this.clear();
    if (!this.getViewer()?.loadProgram?.entries?.length) return;
    this.container=document.createElement("section");this.container.className="load-preview";
    const heading=document.createElement("h2");heading.textContent="加载曲线 · 全时程";
    this.status=document.createElement("p");this.status.className="field-help";this.status.setAttribute("role","status");
    this.plot=document.createElement("div");this.plot.className="chart-stack";
    this.container.append(heading,this.status,this.plot);parent.append(this.container);
    this.refresh();
  }
  refresh() {
    if (!this.container) return;
    const version=++this.version;clearTimeout(this.timer);
    this.status.textContent="正在预计算完整加载曲线…";
    this.charts?.observer.disconnect();this.charts=null;this.plot.replaceChildren();
    this.timer=setTimeout(async()=>{
      try {
        const viewer=this.getViewer(),duration=this.getDuration();
        const series=await forecastLoads(viewer,duration,{cancelled:()=>version!==this.version});
        if(version!==this.version)return;
        const task=this.getTask();
        const chartState={task:{...task,ui:{...task.ui,layout:{charts:[]}}},preview:true,series,seriesUnits:viewer.loadProgram.units,visibleSeries:new Set(Object.keys(viewer.loadProgram.units))};
        this.charts=new ChartStack(this.plot,chartState);this.charts.rebuild();
        this.status.textContent=`0–${duration} s · 按实验起始姿态预计算。含反馈或随动载荷时，这是预测曲线；实际载荷以“数据”页记录为准。`;
      }catch(error){if(version===this.version&&error.name!=="AbortError")this.status.textContent=error.message;}
    },180);
  }
}
