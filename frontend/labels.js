const names = {
  mass: "质量", stiffness: "刚度", damping: "阻尼", initial_displacement: "初始位移",
  initial_velocity: "初始速度", slide_x: "滑块", slider_x: "滑块B", slider: "滑块",
  slider_center: "滑块中心", crank_hinge: "曲柄", connecting_rod: "连杆AB",
  crank_speed: "曲柄角速度", constant_speed_drive: "曲柄角速度",
  point_b: "B点", point_c: "C点", rod_hinge_a: "连杆", disk_orbit: "圆心公转", disk_spin: "圆盘自转",
};
export function shortName(name) {
  return names[name] || name.replaceAll("_", " ");
}
export function seriesName(task, key, unit = "") {
  const [group, name, field, component] = key.split(".");
  if (group === "load") {
    const label = task?.loads?.loads?.find(item => item.id === name)?.label || shortName(name);
    const quantity = {fx:"力 X",fy:"力 Y",fz:"力 Z",tx:"质心力矩 X",ty:"质心力矩 Y",tz:"质心力矩 Z",value:"输入"}[field] || field;
    return `${label} · ${quantity}`;
  }
  const plural = {joint:"joints",body:"bodies",site:"sites",equality:"equalities"}[group];
  const spec = task?.observe?.observe?.[plural]?.find((item) => item.name === name);
  const label = spec?.label || shortName(name);
  const angular = unit.startsWith("rad") || component?.startsWith("w");
  const quantity = {position:angular?"转角":"位移",velocity:angular?"角速度":"速度",acceleration:angular?"角加速度":"加速度",force:unit==="N·m"?"力矩":"力"}[field] || field;
  const axis = component && component !== "magnitude" ? ` ${component.at(-1).toUpperCase()}` : "";
  return `${label.replace(/水平运动|刚体|点$/g, "")}${quantity}${axis}`;
}
export function formatValue(value) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 10000 || (value !== 0 && Math.abs(value) < 0.0001)) return value.toExponential(3);
  return value.toFixed(4).replace(/\.?0+$/, "") || "0";
}
