import { shortName } from "./labels.js";

export function jointLabel(name) {
  const known = shortName(name);
  if (known !== name.replaceAll("_", " ")) return known;
  const words = {left:"左",right:"右",hip:"髋",knee:"膝",ankle:"踝",shoulder:"肩",elbow:"肘",wrist:"腕",waist:"腰",torso:"躯干",head:"头",hand:"手",finger:"手指",pitch:"俯仰",roll:"侧摆",yaw:"偏航",joint:"关节",hinge:"转轴",slide:"滑动"};
  const tokens = name.split("_");
  return tokens.some(token => words[token]) ? tokens.map(token => words[token] || token).join("") : known.replace(/joint\s*(\d+)/i,"关节 $1");
}

export class JointPanel {
  constructor(container, { getViewer, canEdit = () => true, onChange = () => {}, onReset, onBlocked = () => {} }) {
    Object.assign(this, { container, getViewer, canEdit, onChange, onReset, onBlocked });
    this.mode = "degree"; this.rows = []; this.lastSync = 0;
    const header = document.createElement("div"); header.className = "joint-panel-header";
    const title = document.createElement("h2"); title.textContent = "关节姿态";
    this.unitSelect = document.createElement("select"); this.unitSelect.setAttribute("aria-label", "关节角度单位");
    this.unitSelect.append(new Option("角度 °", "degree"), new Option("弧度 rad", "radian"));
    this.unitSelect.addEventListener("change", () => { this.mode = this.unitSelect.value; this.render(this.items, this.note); });
    this.reset = document.createElement("button"); this.reset.type = "button"; this.reset.className = "quiet-button"; this.reset.textContent = "恢复姿态";
    this.reset.addEventListener("click", () => { if (!this.canEdit()) return this.onBlocked(); this.onReset?.(); this.sync(true); });
    header.append(title, this.unitSelect, this.reset);
    this.hint = document.createElement("p"); this.hint.className = "field-help";
    this.list = document.createElement("div"); this.list.className = "joint-panel-list";
    container.replaceChildren(header, this.hint, this.list);
    this.render([]);
  }

  read(item) { return item.read ? item.read() : this.getViewer()?.getJointPosition(item.id ?? item.name) ?? item.value; }

  render(items = this.getViewer()?.getInteractiveControls().joints || [], note = "") {
    this.items = items; this.note = note; this.rows = []; this.list.replaceChildren();
    this.hint.textContent = note || (items.length ? "调整时暂停仿真；点击运行后从当前姿态继续。" : this.getViewer()?.model?.nflex ? "柔性部件不提供关节调节，请通过仿真观察形变。" : "当前模型没有可单独调整的转动或滑动关节。");
    for (const item of items) {
      const angular = item.angular ?? item.kindLabel?.includes("(rad)") ?? item.unit === "rad";
      const factor = angular && this.mode === "degree" ? 180 / Math.PI : 1;
      const unit = angular ? (this.mode === "degree" ? "°" : "rad") : "m";
      const row = document.createElement("div"); row.className = "joint-row"; row.dataset.jointName = item.name;
      const heading = document.createElement("div"); heading.className = "joint-row-heading";
      const label = item.label || jointLabel(item.name);
      const name = document.createElement("strong"); name.textContent = label; name.title = item.name;
      const unitLabel = document.createElement("span"); unitLabel.textContent = unit; heading.append(name, unitLabel);
      const inputs = document.createElement("div"); inputs.className = "joint-row-inputs";
      const slider = document.createElement("input"); slider.type = "range"; slider.step = "any"; slider.min = item.min * factor; slider.max = item.max * factor; slider.setAttribute("aria-label", `${label} 滑块`);
      const number = document.createElement("input"); number.type = "number"; number.step = "any"; number.setAttribute("aria-label", `${label} 数值`);
      if (item.limited !== false || item.cyclic) { number.min = Math.floor(item.min * factor * 10000) / 10000; number.max = Math.ceil(item.max * factor * 10000) / 10000; }
      const range = document.createElement("div"); range.className = "joint-row-range";
      const lower = document.createElement("span"), upper = document.createElement("span");
      lower.textContent = this.format(item.min * factor); upper.textContent = this.format(item.max * factor);
      range.append(lower, upper);
      const apply = raw => {
        if (!this.canEdit()) { this.onBlocked(); this.sync(true); return; }
        if (!String(raw).trim() || !Number.isFinite(Number(raw))) { this.sync(true); return; }
        let value = Number(raw) / factor;
        if (item.limited !== false || item.cyclic) value = Math.max(item.min, Math.min(item.max, value));
        const viewer = this.getViewer(); if (!viewer) return;
        const applied = item.apply ? item.apply(value) : viewer.setJointPosition(item.id, value);
        if (applied !== false) this.onChange();
        this.sync(true);
      };
      slider.addEventListener("input", () => apply(slider.value));
      number.addEventListener("change", () => apply(number.value));
      number.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); apply(number.value); number.blur(); } });
      inputs.append(slider, number); row.append(heading, inputs, range); this.list.append(row);
      this.rows.push({ item, factor, slider, number });
    }
    this.sync(true);
  }

  format(value) { return Number.isFinite(value) ? String(Number(value.toFixed(4))) : "0"; }

  sync(force = false) {
    if (!force && (performance.now() - this.lastSync < 100 || !this.container.getClientRects().length)) return;
    this.lastSync = performance.now();
    const enabled = Boolean(this.getViewer()?.model) && this.canEdit();
    this.reset.disabled = !enabled || !this.rows.length;
    for (const { item, factor, slider, number } of this.rows) {
      slider.disabled = number.disabled = !enabled;
      if (!force && (document.activeElement === slider || document.activeElement === number)) continue;
      let position = this.read(item);
      if (item.cyclic && (position < item.min || position > item.max)) position = ((position % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const value = position * factor;
      if (item.limited === false && !item.cyclic) { slider.min = Math.min(item.min * factor, value); slider.max = Math.max(item.max * factor, value); }
      slider.value = value; number.value = this.format(value);
    }
  }
}
