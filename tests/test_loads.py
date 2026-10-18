import copy
import math
import unittest
from pathlib import Path

import mujoco
import numpy as np

from backend.loads import LoadError, compile_loads, compile_signal, evaluate, apply_loads
from backend.simulator import SimulationError, prepare_browser_model, run_mujoco_task
from backend.task_io import load_task

ROOT = Path(__file__).resolve().parents[1]
XML = '''<mujoco><compiler angle="radian"/><option gravity="0 0 0" timestep=".001"/>
<worldbody><body name="bar" quat=".7071067811865476 0 0 .7071067811865476">
<joint name="hinge" axis="0 0 1"/><geom size=".1 .03 .03" type="box" mass="2" pos=".2 0 0"/>
<site name="tip" pos="1 0 0"/></body></worldbody>
<actuator><motor name="motor" joint="hinge" ctrllimited="true" ctrlrange="-4 4"/></actuator></mujoco>'''


def fixture():
    model = mujoco.MjModel.from_xml_string(XML)
    data = mujoco.MjData(model)
    mujoco.mj_forward(model, data)
    return model, data


class LoadTests(unittest.TestCase):
    def test_expression_whitelist_lazy_branches_feedback_and_table(self):
        model, data = fixture()
        data.time, data.qpos[0], data.qvel[0] = .5, .2, -.3
        expression = "where(t < 1 and t >= 0, gain*(q('hinge')-v('hinge'))+sin(pi/2), 1/0)"
        self.assertAlmostEqual(evaluate(compile_signal(expression, {"gain": 2}, model, mujoco), data), 2)
        table = compile_signal({"table": [[0, 0], [1, 4], [2, 2]]}, {}, model, mujoco)
        for t, expected in [(-1, 0), (.5, 2), (1, 4), (1.5, 3), (3, 2)]:
            data.time = t
            self.assertEqual(evaluate(table, data), expected)
        for source in ["__import__('os')", "q.__class__", "q('missing')", "unknown+1", "[1,2][0]", "2^3", "sin(1,2)", True, {"table": [[0, 0], [0, 1]]}]:
            with self.subTest(source=source), self.assertRaises(LoadError):
                compile_signal(source, {}, model, mujoco)

    def test_body_frame_application_point_and_additive_loads(self):
        model, data = fixture()
        config = {"loads": [
            {"id": "tip", "type": "wrench", "site": "tip", "frame": "body", "force": [0, 10, 0], "torque": [0, 0, 2]},
            {"id": "center", "type": "wrench", "body": "bar", "force": [3, 0, 0]},
            {"id": "a", "type": "joint", "joint": "hinge", "value": 2, "unit": "N·m"},
            {"id": "b", "type": "joint", "joint": "hinge", "value": -1, "unit": "N·m"},
        ]}
        program = compile_loads(config, {}, model, mujoco)
        values = apply_loads(program, model, data)
        np.testing.assert_allclose(data.xfrc_applied[1], [-7, 0, 0, 0, 0, 10], atol=1e-12)
        self.assertAlmostEqual(values["load.tip.tz"], 10)
        self.assertEqual(data.qfrc_applied[0], 1)
        apply_loads(program, model, data)
        self.assertEqual(data.qfrc_applied[0], 1, "Do not accumulate forces across timesteps")
        config["loads"][0].pop("site"); config["loads"][0].update(body="bar", point=[1, 0, 0])
        apply_loads(compile_loads(config, {}, model, mujoco), model, data)
        self.assertAlmostEqual(data.xfrc_applied[1, 5], 10)

    def test_validation_and_actuator_limits(self):
        model, data = fixture()
        entry = {"id": "drive", "type": "actuator", "actuator": "motor", "unit": "N·m", "value": 100}
        program = compile_loads({"loads": [entry]}, {}, model, mujoco)
        self.assertEqual(apply_loads(program, model, data)["load.drive.value"], 4)
        for config in [
            {"loads": [entry, entry]},
            {"loads": [{**entry, "id": "other", "actuator": "missing"}]},
            {"loads": [{"id": "bad", "type": "joint", "joint": "hinge", "unit": "N", "value": 1}]},
            {"loads": [{"id": "bad", "type": "wrench", "body": "bar", "frame": "site", "force": [1, 0, 0]}]},
            {"loads": [{"id": "bad", "type": "wrench", "site": "tip", "point": [0, 0, 0], "force": [1, 0, 0]}]},
            {"loads": [{**entry, "unexpected": 1}]},
        ]:
            with self.subTest(config=config), self.assertRaises(LoadError): compile_loads(config, {}, model, mujoco)

    def test_runtime_error_reports_load_and_time(self):
        model, data = fixture()
        program = compile_loads({"loads": [{"id": "bad", "label": "测试载荷", "type": "joint", "joint": "hinge", "value": "1/(1-t)", "unit": "N·m"}]}, {}, model, mujoco)
        data.time = 1
        with self.assertRaisesRegex(LoadError, "测试载荷.*t=1"):
            apply_loads(program, model, data)

    def test_demo_full_duration_and_parameter_reload(self):
        task = load_task(ROOT / "tasks", "rotating_load_demo")
        payload = prepare_browser_model(task, {"amplitude": 3})
        self.assertEqual(payload["load_program"]["units"]["load.tip_force.fx"], "N")
        result = run_mujoco_task(task, {}, None, None)
        self.assertAlmostEqual(result["series"]["time"][-1], 6)
        self.assertAlmostEqual(result["series"]["load.tip_force.fx"][0], 2)
        self.assertTrue(all(math.isfinite(x) for values in result["series"].values() for x in values))
        changed = run_mujoco_task(task, {"amplitude": 0, "moment": 0}, .1, .002)
        self.assertTrue(all(abs(x) < 1e-12 for x in changed["series"]["joint.turn.position"]))
        bad = copy.deepcopy(task); bad["loads"]["loads"][0]["force"][0] = "1/(0.01-t)"
        with self.assertRaisesRegex(SimulationError, "载荷.*计算失败"):
            run_mujoco_task(bad, {}, .1, .01)

    def test_constant_force_matches_mass_acceleration(self):
        xml = '<mujoco><option gravity="0 0 0"/><worldbody><body><joint name="x" type="slide" axis="1 0 0"/><geom size=".1" mass="2"/></body></worldbody></mujoco>'
        task = {"id": "analytic", "path": str(ROOT), "model_xml": xml,
                "parameters": {}, "ui": {}, "task": {}, "observe": {"observe": {"joints": [{"name": "x", "fields": ["position", "velocity", "acceleration"]}]}},
                "loads": {"loads": [{"id": "force", "type": "joint", "joint": "x", "value": 3, "unit": "N"}]}}
        result = run_mujoco_task(task, {}, .2, .001)
        self.assertAlmostEqual(result["series"]["joint.x.velocity"][-1], .3, places=10)
        self.assertAlmostEqual(result["series"]["joint.x.position"][-1], .03015, places=10)
        self.assertTrue(all(abs(x-1.5) < 1e-12 for x in result["series"]["joint.x.acceleration"]))


if __name__ == "__main__":
    unittest.main()
