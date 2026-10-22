// A completed run owns its inputs and output. Later UI edits cannot rewrite it.
export function captureIntegrationState(viewer) {
  const mj = viewer.mujoco, spec = mj.mjtState.mjSTATE_INTEGRATION.value;
  const buffer = new mj.DoubleBuffer(mj.mj_stateSize(viewer.model, spec));
  try {
    mj.mj_getState(viewer.model, viewer.data, buffer, spec);
    const state = Array.from(buffer.GetView());
    if (state.some(value => !Number.isFinite(value))) throw new Error("起始状态含无效数值，请调整模型后重试。");
    return state;
  } finally { buffer.delete(); }
}

export class ExperimentRecorder {
  constructor(viewer, {parameters, duration, timestep, model_revision}) {
    if (viewer.drag || viewer.posePrepared || Math.abs(viewer.getTime()) > 1e-12) throw new Error("请先准备姿态，再从 t=0 开始一次完整实验。");
    this.request = structuredClone({parameters, duration, timestep, replay: {
      version: 1, model_revision, initial_state: captureIntegrationState(viewer), control_events: [], sample_steps: [],
    }});
    this.completed = null;
  }
  controlChanged(viewer) {
    if (this.completed) return;
    const step = viewer.physicsStep || 0;
    const event = {step, controls: Array.from(viewer.data.ctrl)};
    const events = this.request.replay.control_events;
    if (events.at(-1)?.step === step) events[events.length - 1] = event;
    else if (events.length < 10000) events.push(event);
    else throw new Error("本次实验中途调节次数过多，请重置后减少调节次数。");
  }
  finish(series, units) {
    if (this.completed) return this.completed;
    const {duration, timestep} = this.request, last = series.time.at(-1);
    if (!series.time.length || series.time[0] !== 0 || Math.abs(last - duration) > 1e-8) return null;
    const steps = Math.ceil(duration / timestep);
    this.request.replay.sample_steps = series.time.map(time => Math.abs(time - duration) < 1e-9 ? steps : Math.round(time / timestep));
    this.request.replay.control_events = this.request.replay.control_events.filter(event => event.step < steps);
    this.completed = structuredClone({request: this.request, series, units});
    return this.completed;
  }
}

export function compareExperiments(web, native) {
  let maxAbsolute = 0, consistent = true;
  const left = web.series, right = native.series;
  if (left.time.length !== right.time.length) return {consistent: false, maxAbsolute: Infinity};
  for (const key of Object.keys(left)) {
    if (!right[key] || right[key].length !== left[key].length) return {consistent: false, maxAbsolute: Infinity};
    left[key].forEach((value, index) => {
      const other = right[key][index], difference = Math.abs(value - other);
      if (value == null || other == null || !Number.isFinite(difference)) { consistent = false; return; }
      maxAbsolute = Math.max(maxAbsolute, difference);
      if (difference > 1e-8 + 1e-6 * Math.max(Math.abs(value), Math.abs(other))) consistent = false;
    });
  }
  return {consistent, maxAbsolute};
}
