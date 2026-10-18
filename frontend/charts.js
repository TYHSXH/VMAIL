import {seriesName, formatValue} from "./labels.js";
const colors = ["#277d83", "#b65332", "#7860a0", "#567e48", "#b35068", "#9f7c2d"];

export class ChartStack {
  constructor(container, state) {
    this.container = container;
    this.state = state;
    this.cards = [];
    this.hoverTime = null;
    this.viewRange = null;
    this.observer = new ResizeObserver(() => this.draw());
    this.observer.observe(container);
  }
  rebuild() {
    this.container.replaceChildren();
    this.cards = [];
    this.hoverTime = null;
    this.viewRange = null;
    const configs = [...(this.state.task?.ui?.layout?.charts || [])];
    const declared = new Set(configs.flatMap(config => config.series || []));
    for (const load of this.state.task?.loads?.loads || []) {
      for (const fields of load.type === "wrench" ? [["fx","fy","fz"],["tx","ty","tz"]] : [["value"]]) {
        const keys = fields.map(field => `load.${load.id}.${field}`).filter(key => this.state.seriesUnits[key] && !declared.has(key));
        if (keys.length) configs.push({title: `${this.state.preview ? "" : "实际加载 · "}${load.label || load.id}${load.type === "wrench" ? fields[0] === "fx" ? " · 外力" : " · 质心力矩" : " · 输入"}`, series: keys});
      }
    }
    for (const config of configs) {
      const groups = new Map();
      for (const key of config.series || []) {
        const unit = this.state.seriesUnits[key] || "1";
        if (!groups.has(unit)) groups.set(unit, []);
        groups.get(unit).push(key);
      }
      for (const [unit, keys] of groups) {
        const card = document.createElement("section");
        card.className = "chart-card";
        const heading = document.createElement("h2");
        heading.textContent = groups.size > 1 ? seriesName(this.state.task, keys[0], unit) : config.title || seriesName(this.state.task, keys[0], unit);
        const canvas = document.createElement("canvas");
        canvas.setAttribute("role", "img");
        canvas.title = "悬停联动读取同一时刻；Shift＋滚轮缩放时间轴；双击恢复全程";
        canvas.setAttribute("aria-label", `${heading.textContent}，横轴时间（s），纵轴（${unit}）`);
        const legend = document.createElement("div");
        legend.className = "chart-readouts";
        const values = new Map();
        keys.forEach((key, index) => {
          const label = document.createElement("label");
          const check = document.createElement("input");
          check.type = "checkbox";
          check.checked = this.state.visibleSeries.has(key);
          check.setAttribute("aria-label", `显示${seriesName(this.state.task, key, unit)}`);
          check.addEventListener("change", () => {
            if (check.checked) this.state.visibleSeries.add(key); else this.state.visibleSeries.delete(key);
            this.draw();
          });
          const name = document.createElement("span");
          name.textContent = seriesName(this.state.task, key, unit);
          name.style.color = colors[index % colors.length];
          name.title = key;
          const output = document.createElement("output");
          output.textContent = `— ${unit}`;
          label.append(check, name, output);
          legend.append(label);
          values.set(key, output);
        });
        const stamp = document.createElement("p");
        stamp.className = "chart-time";
        const field = keys[0]?.split(".")[2];
        const angular = unit.startsWith("rad");
        const quantity = {position:angular?"转角":"位移",velocity:angular?"角速度":"速度",acceleration:angular?"角加速度":"加速度",force:unit==="N·m"?"力矩":"力"}[field] || (keys[0]?.startsWith("load.") ? unit==="N·m"?"力矩":unit==="N"?"力":"输入" : "物理量");
        const item = {card, heading, canvas, keys, unit, values, stamp, quantity, hover:null};
        canvas.addEventListener("pointermove", (event) => {
          const rect = canvas.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 66) / Math.max(1, rect.width - 82)));
          const time = this.state.series.time;
          if (!time.length) return;
          const [start, end] = this.viewRange || [time[0], time.at(-1)];
          this.hoverTime = start + ratio * (end - start);
          this.draw();
        });
        canvas.addEventListener("pointerleave", () => {this.hoverTime = null; this.draw();});
        canvas.addEventListener("dblclick", () => {this.viewRange = null; this.hoverTime = null; this.draw();});
        canvas.addEventListener("wheel", (event) => {
          if (!event.shiftKey || this.state.series.time.length < 2) return;
          event.preventDefault();
          const time = this.state.series.time;
          const first = time[0], last = time.at(-1), full = last - first;
          if (!(full > 0)) return;
          const [start, end] = this.viewRange || [first, last];
          const ratio = Math.max(0, Math.min(1, (event.clientX - canvas.getBoundingClientRect().left - 66) / Math.max(1, canvas.clientWidth - 82)));
          const span = Math.max(full / 1000, Math.min(full, (end - start) * (event.deltaY > 0 ? 1.3 : .75)));
          const center = start + ratio * (end - start);
          const left = Math.max(first, Math.min(last - span, center - ratio * span));
          this.viewRange = [left, left + span];this.hoverTime = null;this.draw();
        }, {passive:false});
        card.append(heading, canvas, stamp, legend);
        this.container.append(card);
        this.cards.push(item);
      }
    }
    this.draw();
  }
  draw() { for (const item of this.cards) this.drawCard(item); }
  drawCard(item) {
    const {canvas, keys, unit} = item;
    const active = keys.filter((key) => this.state.visibleSeries.has(key));
    const collapsed = active.length === 0;
    item.card.classList.toggle("chart-collapsed", collapsed);
    item.heading.hidden = collapsed;
    canvas.hidden = collapsed;
    item.stamp.hidden = collapsed;
    if (collapsed) {
      for (const [key, output] of item.values) output.textContent = `${formatValue(this.state.series[key]?.at(-1))} ${unit}`;
      return;
    }
    const width = Math.max(250, canvas.clientWidth || this.container.clientWidth - 28);
    const height = 220;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width*dpr) || canvas.height !== height*dpr) {
      canvas.width = Math.round(width*dpr); canvas.height = height*dpr;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle = "#fcfcfa"; ctx.fillRect(0,0,width,height);
    ctx.font = "11px Segoe UI, Microsoft YaHei UI, sans-serif";
    ctx.fillStyle = "#77816e";
    ctx.fillText(`${item.quantity} / ${unit}`, 12, 17);
    ctx.fillText("时间 / s", Math.max(72,width-80), height-6);
    const time = this.state.series.time;
    let index = time.length - 1;
    if (this.hoverTime !== null && time.length) {
      const target = this.hoverTime;
      let lo=0,hi=time.length-1;
      while(lo<hi){ const mid=(lo+hi)>>1; if(time[mid]<target)lo=mid+1;else hi=mid; }
      index=lo>0 && Math.abs(time[lo-1]-target)<Math.abs(time[lo]-target) ? lo-1 : lo;
    }
    item.stamp.textContent = index >= 0 ? `${this.state.preview ? "预览" : this.hoverTime === null ? "当前" : "读取"}时刻：${formatValue(time[index])} s` : "等待仿真数据";
    for (const [key, output] of item.values) output.textContent = `${formatValue(this.state.series[key]?.[index])} ${unit}`;
    if(time.length<2 || !active.length){
      ctx.fillText(!active.length?"勾选下方曲线以显示":"开始仿真后显示曲线",70,105);return;
    }
    const [viewStart, viewEnd] = this.viewRange || [time[0], time.at(-1)];
    let min=Infinity,max=-Infinity;
    for (const key of active) {
      const values=this.state.series[key] || [];
      for(let i=0;i<values.length;i++) if(time[i]>=viewStart && time[i]<=viewEnd && Number.isFinite(values[i])){min=Math.min(min,values[i]);max=Math.max(max,values[i]);}
    }
    if(!Number.isFinite(min)){ctx.fillText("暂无有效数据",70,105);return;}
    const margin = min === max ? Math.max(1, Math.abs(min)*.1) : (max-min)*.08;
    min-=margin;max+=margin;
    const left=66,top=28,bottom=184,w=width-left-16,h=bottom-top;
    const x=(t)=>left+(t-viewStart)/(viewEnd-viewStart || 1)*w;
    const y=(v)=>bottom-(v-min)/(max-min)*h;
    for(let i=0;i<=4;i++){
      const yy=top+i*h/4;
      ctx.strokeStyle="#e5e8e0";ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(width-16,yy);ctx.stroke();
      ctx.fillStyle="#77816e";ctx.fillText(formatValue(max-i*(max-min)/4),3,yy+4);
      const tt=viewStart+i*(viewEnd-viewStart)/4;
      ctx.fillText(formatValue(tt),Math.min(width-40,Math.max(left-5,x(tt)-10)),202);
    }
    for(const key of active){
      const values=this.state.series[key] || [];
      ctx.strokeStyle=colors[keys.indexOf(key)%colors.length];ctx.lineWidth=1.7;ctx.beginPath();
      // Pixel buckets preserve extrema without spreading arrays into function arguments.
      const bucket=Math.max(1,Math.ceil(values.length/Math.max(1,w)));
      let started=false;
      for(let start=0;start<values.length;start+=bucket){
        let a=-1,b=-1;
        for(let j=start;j<Math.min(start+bucket,values.length);j++){
          if(!Number.isFinite(values[j]) || time[j]<viewStart || time[j]>viewEnd)continue;
          if(a<0 || values[j]<values[a])a=j;
          if(b<0 || values[j]>values[b])b=j;
        }
        if(a<0){started=false;continue;}
        for(const j of a<b?[a,b]:a>b?[b,a]:[a]){
          if(!started){ctx.moveTo(x(time[j]),y(values[j]));started=true;}else ctx.lineTo(x(time[j]),y(values[j]));
        }
      }
      ctx.stroke();
    }
    if(this.hoverTime!==null && index>=0){
      ctx.strokeStyle="#929b88";ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(x(time[index]),top);ctx.lineTo(x(time[index]),bottom);ctx.stroke();ctx.setLineDash([]);
    }
  }
}
