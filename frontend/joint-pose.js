// Project a pose onto MuJoCo's equality constraints without advancing time.
// The edited joint stays fixed; other rigid scalar joints follow the linkage.
export function projectJointPose(viewer, jointId, target) {
  const { mujoco: mj, model, data } = viewer;
  const address = model.jnt_qposadr[jointId];
  if (!model.neq) { data.qpos[address] = target; mj.mj_forward(model, data); return true; }
  const variables = viewer.getInteractiveControls().joints.filter(joint => joint.id !== jointId);
  const residual = () => {
    mj.mj_forward(model, data);
    const result = [];
    for (let row = 0; row < data.nefc; row++) {
      if (data.efc_type[row] === mj.mjtConstraint.mjCNSTR_EQUALITY.value) result.push(data.efc_pos[row]);
    }
    return result;
  };
  const norm = values => values.reduce((sum, value) => sum + value * value, 0);
  const solve = (matrix, rhs) => {
    const n = rhs.length, rows = matrix.map((row, i) => [...row, rhs[i]]);
    for (let col = 0; col < n; col++) {
      let pivot = col;
      for (let i = col + 1; i < n; i++) if (Math.abs(rows[i][col]) > Math.abs(rows[pivot][col])) pivot = i;
      [rows[col], rows[pivot]] = [rows[pivot], rows[col]];
      const divisor = rows[col][col];
      if (Math.abs(divisor) < 1e-18) return null;
      for (let j = col; j <= n; j++) rows[col][j] /= divisor;
      for (let i = 0; i < n; i++) {
        if (i === col) continue;
        const factor = rows[i][col];
        for (let j = col; j <= n; j++) rows[i][j] -= factor * rows[col][j];
      }
    }
    return rows.map(row => row[n]);
  };
  const start = data.qpos[address];
  const angular = model.jnt_type[jointId] === mj.mjtJoint.mjJNT_HINGE.value;
  // Small increments preserve the current assembly branch through a full turn.
  const steps = Math.max(1, Math.min(72, Math.ceil(Math.abs(target - start) / (angular ? Math.PI / 18 : .05))));
  for (let step = 1; step <= steps; step++) {
    data.qpos[address] = start + (target - start) * step / steps;
    let r = residual();
    for (let iteration = 0; iteration < 60 && norm(r) > 1e-14; iteration++) {
      const base = variables.map(joint => data.qpos[model.jnt_qposadr[joint.id]]);
      const columns = variables.map((joint, i) => {
        const adr = model.jnt_qposadr[joint.id], epsilon = 1e-5;
        data.qpos[adr] = base[i] + epsilon;
        const next = residual(); data.qpos[adr] = base[i];
        return r.map((value, row) => (next[row] - value) / epsilon);
      });
      const matrix = r.map((_, row) => r.map((__, col) => columns.reduce((sum, column) => sum + column[row] * column[col], row === col ? 1e-8 : 0)));
      const solution = solve(matrix, r);
      if (!solution) return false;
      const delta = columns.map(column => -column.reduce((sum, value, row) => sum + value * solution[row], 0));
      // Scale the whole direction together, especially at a straight-link singularity.
      const stepScale = Math.max(1, ...delta.map((value, i) => Math.abs(value) / (variables[i].angular ? .3 : .1)));
      for (let i = 0; i < delta.length; i++) delta[i] /= stepScale;
      let accepted = false;
      for (let scale = 1; scale >= 1 / 128; scale /= 2) {
        for (let i = 0; i < variables.length; i++) {
          const joint = variables[i];
          let value = base[i] + delta[i] * scale;
          if (joint.limited) value = Math.max(joint.min, Math.min(joint.max, value));
          data.qpos[model.jnt_qposadr[joint.id]] = value;
        }
        const next = residual();
        if (norm(next) < norm(r)) { r = next; accepted = true; break; }
      }
      if (!accepted) return false;
    }
    if (!r.every(value => Number.isFinite(value) && Math.abs(value) < 1e-6)) return false;
  }
  return true;
}
