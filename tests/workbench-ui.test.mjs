import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pendulumGeometry} from '../frontend/workbench-ui.js';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);

test('theta arc ends on the rod in both swing directions and the label bisects the angle', () => {
  for (const degrees of [-24, -12, -1, 1, 12, 24]) {
    const {end, label, sweep} = pendulumGeometry(degrees);
    close(Math.hypot(end.x - 200, end.y - 84), 54);
    close(Math.hypot(label.x - 200, label.y - 84), 78);
    close(Math.atan2(-(end.x - 200), end.y - 84) * 180 / Math.PI, degrees);
    close(Math.atan2(-(label.x - 200), label.y - 84) * 180 / Math.PI, degrees / 2);
    assert.equal(sweep, degrees > 0 ? 1 : 0);
  }
});

test('theta disappears at the vertical reference rather than implying a nonzero angle', () => {
  const {end, label, opacity} = pendulumGeometry(0);
  assert.deepEqual(end, {x: 200, y: 138});
  assert.deepEqual(label, {x: 200, y: 162});
  assert.equal(opacity, 0);
  assert.ok(pendulumGeometry(.1).opacity < pendulumGeometry(1).opacity);
});
