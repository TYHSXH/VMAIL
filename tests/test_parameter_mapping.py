"""Real model compilation for linked parameter mappings; all writes are temporary."""
import copy
from pathlib import Path
import shutil
import tempfile
import unittest
import xml.etree.ElementTree as ET

import mujoco
import yaml

from backend.parameter_mapping import ParameterMappingError, mjcf_targets
from backend.simulator import SimulationError, _apply_mjcf_overrides, _merged_parameter_values, prepare_browser_model, run_mujoco_task
from backend.task_io import REQUIRED_FILES, TaskValidationError, load_task
from backend.validate_task import validate_task

ROOT = Path(__file__).resolve().parents[1]


class ParameterMappingTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="vmail-linked-parameters-")
        self.addCleanup(self.temporary.cleanup)
        self.tasks = Path(self.temporary.name)
        self.folder = self.tasks / "example_mass_spring"
        self.folder.mkdir()
        for name in REQUIRED_FILES:
            shutil.copyfile(ROOT / "tasks/example_mass_spring" / name, self.folder / name)
        self.task = load_task(self.tasks, self.folder.name)

    def linked(self):
        task = copy.deepcopy(self.task)
        entries = task["parameters"]["parameters"]
        entries["mass"].pop("mjcf")
        entries["length"] = {"value": .4, "unit": "m", "min": .1, "max": 2, "mjcf": [
            {"tag": "geom", "name": "slider_geom", "attribute": "size", "value": ["length / 2", .08, .08]},
            {"tag": "geom", "name": "slider_geom", "attribute": "pos", "value": ["length / 2", 0, 0]},
            {"tag": "geom", "name": "slider_geom", "attribute": "mass", "value": "mass * length"},
            {"tag": "site", "name": "slider_center", "attribute": "pos", "value": ["length / 2", 0, 0]},
        ]}
        return task

    def test_linked_geometry_and_mass_compile_and_run_in_both_paths(self):
        task = self.linked()
        (self.folder / "parameters.yaml").write_text(yaml.safe_dump(task["parameters"]), encoding="utf-8")
        task = load_task(self.tasks, self.folder.name)
        self.assertEqual(validate_task(self.folder.name, self.tasks), [])
        payload = prepare_browser_model(task, {"length": .8, "mass": 2}, duration_override=.02)
        model = mujoco.MjModel.from_xml_string(payload["xml"])
        geom = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "slider_geom")
        body = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, "slider")
        self.assertAlmostEqual(model.geom_size[geom, 0], .4)
        self.assertAlmostEqual(model.geom_pos[geom, 0], .4)
        self.assertAlmostEqual(model.body_mass[body], 1.6)
        self.assertGreater(model.body_inertia[body, 0], 0)
        result = run_mujoco_task(task, {"length": .8, "mass": 2}, duration_override=.02, timestep_override=.005)
        self.assertTrue(result["series"]["time"])
        self.assertAlmostEqual(result["series"]["time"][-1], .02)

    def test_existing_single_target_and_omitted_value_still_work(self):
        values = _merged_parameter_values(self.task, {"mass": 2})
        root = ET.fromstring(_apply_mjcf_overrides(self.task["model_xml"], self.task, values))
        self.assertEqual(float(root.find(".//geom[@name='slider_geom']").get("mass")), 2)
        self.task["parameters"]["parameters"]["mass"]["mjcf"] = [self.task["parameters"]["parameters"]["mass"]["mjcf"]]
        self.assertEqual(_apply_mjcf_overrides(self.task["model_xml"], self.task, values), ET.tostring(root, encoding="unicode"))

    def test_invalid_targets_and_expressions_fail_with_parameter_name(self):
        for invalid in ([], "geom", [1], [{"tag": "geom"}], [{"tag": "geom", "attribute": "pos", "value": [[1]]}]):
            with self.subTest(invalid=invalid), self.assertRaisesRegex(ParameterMappingError, "length"):
                mjcf_targets({"mjcf": invalid}, "length")
        for expression in ("missing + 1", "t", "q('slide_x')", "1 / 0", "sqrt(-1)", "1e309", "__import__('os')", "mass.__class__"):
            task = self.linked()
            task["parameters"]["parameters"]["length"]["mjcf"][0]["value"] = expression
            with self.subTest(expression=expression), self.assertRaisesRegex(SimulationError, "length"):
                prepare_browser_model(task, {})
        task = self.linked()
        task["parameters"]["parameters"]["length"]["mjcf"][0]["name"] = "missing_geometry"
        with self.assertRaisesRegex(SimulationError, "目标不存在"):
            prepare_browser_model(task, {})

    def test_bad_mapping_is_rejected_when_loading_without_changing_files(self):
        original = (self.folder / "model.xml").read_bytes()
        task = self.linked()
        task["parameters"]["parameters"]["length"]["mjcf"] = [1]
        (self.folder / "parameters.yaml").write_text(yaml.safe_dump(task["parameters"]), encoding="utf-8")
        with self.assertRaisesRegex(TaskValidationError, "length"):
            load_task(self.tasks, self.folder.name)
        self.assertEqual((self.folder / "model.xml").read_bytes(), original)
