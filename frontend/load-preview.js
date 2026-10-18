import { applyLoads } from "./loads.js";

// Private MjData keeps forecasts out of the live scene and experiment recorder.
export async function forecastLoads(viewer, duration, { cancelled = () => false } = {}) {
  const { mujoco: mj, model, loadProgram: program } = viewer;
  if (!model || !program?.entries?.length) return { time: [] };
  const timestep = viewer.configuredTimestep;
  if (!Number.isFinite(duration) || duration <= 0 || Math.ceil(duration/timestep) > 200000) throw new Error("请设置有效的仿真时长（最多 200000 步）。");
  const scratch = new mj.MjData(model);
  const series = Object.fromEntries(["time", ...Object.keys(program.units)].map(key => [key, []]));
  const start = viewer.posePrepared ? viewer.data : viewer.experimentStart;
  try {
    if (start) { scratch.qpos.set(start.qpos); scratch.qvel.set(viewer.posePrepared ? new Float64Array(model.nv) : start.qvel); }
    scratch.ctrl.set(viewer.data.ctrl); scratch.act.set(start?.act || viewer.data.act); scratch.time = 0;
    let nextSample = 0, finished = false;
    while (!finished) {
      if (cancelled() || viewer.model !== model) throw new DOMException("加载曲线计算已取消", "AbortError");
      const savedStep = model.opt.timestep, deadline = performance.now()+8;
      try {
        do {
          mj.mj_forward(model, scratch);
          const values = applyLoads(program, model, scratch);
          if (scratch.time + 1e-10 >= nextSample || scratch.time + 1e-10 >= duration) {
            series.time.push(Number(scratch.time));
            for (const key of Object.keys(program.units)) series[key].push(values[key]);
            nextSample = scratch.time + duration/5000;
          }
          if (scratch.time + 1e-10 >= duration) { finished = true; break; }
          const before = scratch.time;
          model.opt.timestep = Math.min(timestep, duration-before);
          mj.mj_step(model, scratch);
          if (!Number.isFinite(scratch.time) || scratch.time <= before || scratch.qpos.some(value => !Number.isFinite(value)) || scratch.qvel.some(value => !Number.isFinite(value))) throw new Error(`加载曲线预计算在 t=${before.toFixed(4)} s 不稳定，请调整参数或步长。`);
        } while (performance.now() < deadline);
      } finally { model.opt.timestep = savedStep; }
      if (!finished) await new Promise(resolve => setTimeout(resolve, 0));
    }
    return series;
  } finally { scratch.delete(); }
}
