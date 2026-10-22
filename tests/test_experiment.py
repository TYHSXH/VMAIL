import copy
import json
from pathlib import Path
import tempfile
import unittest

import mujoco
import numpy as np

from backend.simulator import prepare_browser_model, run_mujoco_task, SimulationError
from backend.task_io import load_task, save_run_result

ROOT = Path(__file__).resolve().parents[1]


class ExperimentReplayTests(unittest.TestCase):
    def setUp(self):
        self.task = load_task(ROOT / "tasks", "example_mass_spring")
        self.parameters = {"mass": 2}
        payload = prepare_browser_model(self.task, self.parameters, .005, .02)
        model = mujoco.MjModel.from_xml_string(payload["xml"])
        data = mujoco.MjData(model)
        data.qpos[0] = .37
        data.qvel[0] = -.2
        mujoco.mj_forward(model, data)
        spec = int(mujoco.mjtState.mjSTATE_INTEGRATION)
        state = np.empty(mujoco.mj_stateSize(model, spec))
        mujoco.mj_getState(model, data, state, spec)
        self.replay = {"version": 1, "model_revision": payload["model_revision"], "initial_state": state.tolist(),
                       "sample_steps": [0, 2, 4], "control_events": []}

    def run_replay(self, replay=None, parameters=None):
        return run_mujoco_task(self.task, parameters or self.parameters, .02, .005, replay=replay or self.replay)

    def test_nondefault_pose_velocity_parameters_and_sample_schedule_are_inherited(self):
        result = self.run_replay()
        name = self.task["observe"]["observe"]["joints"][0]["name"]
        self.assertEqual(result["parameters"]["mass"], 2)
        self.assertEqual(result["series"][f"joint.{name}.position"][0], .37)
        self.assertEqual(result["series"][f"joint.{name}.velocity"][0], -.2)
        np.testing.assert_allclose(result["series"]["time"], [0, .01, .02], atol=1e-12)

    def test_changed_model_or_loads_refuses_old_experiment(self):
        with self.assertRaisesRegex(SimulationError, "已改变"):
            self.run_replay(parameters={"mass": 1})
        self.task["loads"] = {"loads": []}
        with self.assertRaisesRegex(SimulationError, "已改变"):
            self.run_replay()

    def test_incomplete_state_and_nonfinite_values_are_rejected(self):
        for mutate in [lambda r: r["initial_state"].pop(), lambda r: r["initial_state"].__setitem__(1, float("nan")),
                       lambda r: r["initial_state"].__setitem__(0, .5)]:
            replay = copy.deepcopy(self.replay); mutate(replay)
            with self.assertRaises(SimulationError):
                self.run_replay(replay)

    def test_incomplete_or_unordered_sampling_and_control_events_are_rejected(self):
        for steps in ([1, 2, 4], [0, 2], [0, 3, 2, 4], [0, 2, 2, 4], [0, 2.5, 4]):
            replay = {**self.replay, "sample_steps": steps}
            with self.subTest(steps=steps), self.assertRaises(SimulationError):
                self.run_replay(replay)
        for events in ([{"step": 1, "controls": [1]}], [{"step": 4, "controls": []}],
                       [{"step": 2, "controls": []}, {"step": 1, "controls": []}]):
            with self.subTest(events=events), self.assertRaises(SimulationError):
                self.run_replay({**self.replay, "control_events": events})

    def test_saved_run_keeps_the_exact_replay_conditions(self):
        result = self.run_replay()
        with tempfile.TemporaryDirectory() as folder:
            saved = save_run_result(Path(folder), self.task["id"], result)
            record = json.loads((Path(saved["data_csv"]).parent / "experiment.json").read_text(encoding="utf-8"))
            self.assertEqual(record["replay"], self.replay)
            repeated = run_mujoco_task(self.task, record["parameters"], record["duration"], record["timestep"], replay=record["replay"])
            self.assertEqual(repeated["series"], result["series"])
