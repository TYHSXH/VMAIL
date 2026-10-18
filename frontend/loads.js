// The server compiles expressions to this shared, data-only instruction format.
const functions = {
  abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
  exp: Math.exp, log: Math.log, sqrt: Math.sqrt, floor: Math.floor, ceil: Math.ceil,
  min: Math.min, max: Math.max, clamp: (x,lo,hi) => Math.max(lo,Math.min(hi,x)),
  step: x => Number(x>=0), ramp: x => Math.max(0,x),
};
export function evaluateSignal(node, data) {
  if (typeof node === "number") return node;
  const [op, ...args] = node;
  if (op === "t") return data.time;
  if (op === "q") return data.qpos[args[0]];
  if (op === "v") return data.qvel[args[0]];
  if (op === "where") return evaluateSignal(evaluateSignal(args[0], data) ? args[1] : args[2], data);
  if (op === "and") return Number(args.every(arg => evaluateSignal(arg, data)));
  if (op === "or") return Number(args.some(arg => evaluateSignal(arg, data)));
  if (op === "table") {
    const [times, values] = args, t = data.time;
    if (t <= times[0]) return values[0];
    for (let i = 1; i < times.length; i++) {
      if (t < times[i]) return values[i-1] + (values[i]-values[i-1]) * (t-times[i-1]) / (times[i]-times[i-1]);
    }
    return values.at(-1);
  }
  const x = args.map(arg => evaluateSignal(arg, data));
  switch (op) {
    case "+": return x[0]+x[1]; case "-": return x[0]-x[1]; case "*": return x[0]*x[1];
    case "/": return x[0]/x[1]; case "**": return x[0]**x[1];
    case "<": return Number(x[0]<x[1]); case "<=": return Number(x[0]<=x[1]);
    case ">": return Number(x[0]>x[1]); case ">=": return Number(x[0]>=x[1]);
    case "==": return Number(x[0]===x[1]); case "!=": return Number(x[0]!==x[1]);
  }
  if (!Object.hasOwn(functions,op)) throw new Error(`未知载荷运算：${op}`);
  return functions[op](...x);
}

export function applyLoads(program, model, data) {
  if (!program?.entries?.length) return {};
  data.qfrc_applied.fill(0); data.xfrc_applied.fill(0);
  const outputs = {};
  for (const entry of program.entries) {
    try {
      const value = node => {
        const number = evaluateSignal(node, data);
        if (!Number.isFinite(number)) throw new Error("表达式产生了无效数值");
        return number;
      };
      const prefix = `load.${entry.id}`;
      if (["joint", "actuator"].includes(entry.type)) {
        let number = value(entry.value);
        if (entry.range) number = Math.max(entry.range[0], Math.min(entry.range[1], number));
        if (entry.type === "joint") {
          data.qfrc_applied[entry.index] += number;
          if (!Number.isFinite(data.qfrc_applied[entry.index])) throw new Error("叠加载荷超出数值范围");
        }
        else data.ctrl[entry.index] = number;
        outputs[`${prefix}.value`] = number;
      } else {
        const body = entry.body, rotation = data.xmat.subarray(body*9,body*9+9);
        const rotate = vector => [0,1,2].map(i => rotation[i*3]*vector[0] + rotation[i*3+1]*vector[1] + rotation[i*3+2]*vector[2]);
        let force = entry.force.map(value), torque = entry.torque.map(value);
        if (entry.frame === "body") { force = rotate(force); torque = rotate(torque); }
        const center = data.xipos.subarray(body*3,body*3+3);
        const point = entry.site !== undefined ? data.site_xpos.subarray(entry.site*3,entry.site*3+3)
          : entry.point ? rotate(entry.point).map((x,i) => x+data.xpos[body*3+i]) : center;
        const r = point.map((x,i) => x-center[i]);
        const moment = [r[1]*force[2]-r[2]*force[1], r[2]*force[0]-r[0]*force[2], r[0]*force[1]-r[1]*force[0]];
        torque = torque.map((x,i) => x+moment[i]);
        [...force,...torque].forEach((number,i) => {
          if (!Number.isFinite(number)) throw new Error("空间载荷产生了无效数值");
          data.xfrc_applied[body*6+i] += number;
          if (!Number.isFinite(data.xfrc_applied[body*6+i])) throw new Error("叠加载荷超出数值范围");
          outputs[`${prefix}.${["fx","fy","fz","tx","ty","tz"][i]}`] = number;
        });
      }
    } catch (error) {
      data.qfrc_applied.fill(0); data.xfrc_applied.fill(0);
      throw new Error(`载荷 ${entry.label} 在 t=${Number(data.time).toFixed(6)} s 计算失败：${error.message}`);
    }
  }
  return outputs;
}
