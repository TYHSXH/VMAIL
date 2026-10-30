import copy
import shutil
import tempfile
import threading
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeout
import unittest
from pathlib import Path
from unittest.mock import patch

from fastapi import HTTPException

from backend import main
from backend.simulator import SimulationError, prepare_browser_model, run_mujoco_task, _model_source, MAX_MODEL_RESOURCE_BYTES
from backend.task_io import TaskValidationError, list_tasks, load_task, rename_task, save_run_result, TITLE_LOCK
from backend.validate_task import validate_task
import yaml


ROOT = Path(__file__).resolve().parents[1]


class WorkbenchTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.tasks = Path(self.temporary.name) / "tasks"
        self.tasks.mkdir()
        shutil.copytree(ROOT / "tasks" / "example_mass_spring", self.tasks / "example_mass_spring", ignore=shutil.ignore_patterns("results", "__pycache__"))
        (self.tasks / "manifest.yaml").write_text("tasks:\n  - id: example_mass_spring\n    title: Original\n", encoding="utf-8")
        self.task = load_task(self.tasks, "example_mass_spring")

    def tearDown(self):
        self.temporary.cleanup()

    def test_rename_survives_reload_and_updates_both_files(self):
        rename_task(self.tasks, "example_mass_spring", "  中文标题：实验一  ")
        self.assertEqual(load_task(self.tasks, "example_mass_spring")["task"]["title"], "中文标题：实验一")
        self.assertEqual(list_tasks(self.tasks)[0]["title"], "中文标题：实验一")
        with self.assertRaises(TaskValidationError):
            rename_task(self.tasks, "example_mass_spring", "\n")

    def test_failed_rename_rolls_back_first_file(self):
        paths = [self.tasks / "manifest.yaml", self.tasks / "example_mass_spring" / "task.yaml"]
        before = [p.read_bytes() for p in paths]
        replace = Path.replace

        def fail_manifest(path, target):
            if Path(target).name == "manifest.yaml":
                raise OSError("read-only manifest")
            return replace(path, target)

        with patch.object(Path, "replace", fail_manifest), self.assertRaises(TaskValidationError):
            rename_task(self.tasks, "example_mass_spring", "New")
        self.assertEqual([p.read_bytes() for p in paths], before)
        self.assertFalse(list(self.tasks.rglob("*.tmp")))

    def test_invalid_parameters_are_rejected(self):
        for value in (10, -1, "abc", float("nan"), float("inf")):
            with self.subTest(value=value), self.assertRaises(SimulationError):
                prepare_browser_model(self.task, {"mass": value})

    def test_malformed_task_configuration_reports_validation_errors(self):
        cases = [
            ("parameters.yaml", {"parameters": {"mass": {"value": 1, "unit": "kg", "mjcf": "bad"}}}),
            ("parameters.yaml", {"parameters": {"mass": {"value": 1, "unit": "kg", "initial_state": []}}}),
            ("ui.yaml", {"layout": {"charts": [{"title": "bad", "series": None}]}}),
            ("ui.yaml", {"camera": []}),
            ("ui.yaml", {"camera": {"position": "bad", "target": [0, 0, 0]}}),
            ("observe.yaml", {"observe": {"joints": [{"name": "slide_x", "fields": [{}]}]}}),
        ]
        for filename, document in cases:
            with self.subTest(filename=filename, document=document):
                path = self.tasks / "example_mass_spring" / filename
                original = path.read_bytes()
                try:
                    path.write_text(yaml.safe_dump(document), encoding="utf-8")
                    with self.assertRaises(TaskValidationError):
                        load_task(self.tasks, "example_mass_spring")
                    self.assertTrue(validate_task("example_mass_spring", self.tasks))
                finally:
                    path.write_bytes(original)

    def test_non_utf8_task_text_reports_the_file_instead_of_crashing(self):
        for filename in ("model.xml", "notes.md", "parameters.yaml"):
            with self.subTest(filename=filename):
                path = self.tasks / "example_mass_spring" / filename
                original = path.read_bytes()
                try:
                    path.write_bytes(b"\xff\xfe\x80")
                    with self.assertRaisesRegex(TaskValidationError, filename):
                        load_task(self.tasks, "example_mass_spring")
                finally:
                    path.write_bytes(original)

    def test_task_reader_waits_for_a_complete_multi_file_update(self):
        folder = self.tasks / "example_mass_spring"
        written, finish, reading = threading.Event(), threading.Event(), threading.Event()
        new_xml = self.task["model_xml"] + "\n<!-- complete update -->\n"
        def writer():
            with TITLE_LOCK:
                metadata = dict(self.task["task"], title="Updated")
                (folder / "task.yaml").write_text(yaml.safe_dump(metadata), encoding="utf-8")
                written.set()
                if not finish.wait(5):
                    raise RuntimeError("Reader test did not finish")
                (folder / "model.xml").write_text(new_xml, encoding="utf-8")
        def reader():
            reading.set()
            return load_task(self.tasks, "example_mass_spring")
        with ThreadPoolExecutor(max_workers=2) as pool:
            write = pool.submit(writer)
            self.assertTrue(written.wait(5))
            read = pool.submit(reader)
            try:
                self.assertTrue(reading.wait(5))
                with self.assertRaises(FutureTimeout):
                    read.result(timeout=.1)
            finally:
                finish.set()
            write.result(timeout=5)
            result = read.result(timeout=5)
        self.assertEqual(result["task"]["title"], "Updated")
        self.assertEqual(result["model_xml"], new_xml)

    def test_zero_negative_and_excessive_simulations_rejected(self):
        for duration, timestep in ((0, .005), (1, 0), (1, -.1), (float("inf"), .01), (100, .00001)):
            with self.subTest(duration=duration, timestep=timestep), self.assertRaises(SimulationError):
                run_mujoco_task(self.task, {}, duration, timestep)

    def test_browser_and_batch_have_identical_parameterized_model(self):
        import mujoco
        payload = prepare_browser_model(self.task, {"mass": 2}, .005)
        model = mujoco.MjModel.from_xml_string(payload["xml"])
        self.assertAlmostEqual(float(model.body_mass[1]), 2)
        result = run_mujoco_task(self.task, {"mass": 2}, .011, .005)
        self.assertAlmostEqual(result["series"]["time"][-1], .011)
        self.assertEqual(len(result["series"]["time"]), 4)

    def test_unique_save_and_utf8_csv(self):
        result = run_mujoco_task(self.task, {}, .01, .005)
        a = save_run_result(self.tasks, "example_mass_spring", result)
        b = save_run_result(self.tasks, "example_mass_spring", result)
        self.assertNotEqual(a["run_id"], b["run_id"])
        self.assertTrue(Path(a["data_csv"]).read_bytes().startswith(b"\xef\xbb\xbf"))

    def test_cancel_does_not_save(self):
        event = threading.Event()
        event.set()
        with self.assertRaisesRegex(SimulationError, "取消"):
            run_mujoco_task(self.task, {}, .1, .005, cancel_event=event)
        self.assertFalse((self.tasks / "example_mass_spring" / "results").exists())

    def test_cancel_before_request_registration(self):
        token = "unit_test_early_cancel"
        main.api_cancel_run(token)
        with patch.object(main, "TASKS_DIR", self.tasks), self.assertRaises(HTTPException) as raised:
            main.api_simulate("example_mass_spring", main.SimulationRequest(run_token=token))
        self.assertEqual(raised.exception.status_code, 422)
        self.assertFalse((self.tasks / "example_mass_spring" / "results").exists())
        main.RUNS.pop(token, None)

    def test_default_actuator_matches_initial_disk_motion(self):
        task = load_task(ROOT / "tasks", "rolling_disk_points_bc")
        result = run_mujoco_task(task, {}, .01, .001)
        self.assertEqual(result["controls"]["crank_speed"], -2)
        self.assertLess(abs(result["series"]["joint.crank_hinge.acceleration"][0]), 10)

    def test_safe_include_and_missing_resource(self):
        task = copy.deepcopy(self.task)
        folder = Path(task["path"])
        (folder / "parts.xml").write_text('<mujoco><worldbody><body name="b"><joint name="j"/><geom size=".1"/></body></worldbody></mujoco>')
        task["model_xml"] = '<mujoco><include file="parts.xml"/></mujoco>'
        task["parameters"] = {"parameters": {}}
        task["observe"] = {"observe": {}}
        payload = prepare_browser_model(task, {})
        self.assertIn('name="j"', payload["xml"])
        task["model_xml"] = '<mujoco><include file="../outside.xml"/></mujoco>'
        with self.assertRaisesRegex(SimulationError, "目录"):
            prepare_browser_model(task, {})
        task["model_xml"] = '<mujoco><include file="missing.xml"/></mujoco>'
        with self.assertRaisesRegex(SimulationError, "不存在"):
            prepare_browser_model(task, {})

    def test_resource_limit_counts_references_excludes_xml_and_unused_files(self):
        folder = Path(self.task["path"])
        (folder / "mesh.bin").write_bytes(b"0123456789")
        (folder / "unused.bin").write_bytes(b"x" * 200)
        task = {"path": str(folder), "model_xml": '<mujoco><asset><mesh file="mesh.bin"/></asset></mujoco>'}
        self.assertEqual(MAX_MODEL_RESOURCE_BYTES, 128 * 1024 * 1024)
        with patch("backend.simulator.MAX_MODEL_RESOURCE_BYTES", 10):
            _, assets = _model_source(task)
            self.assertEqual(sum(map(len, assets.values())), 10)
            task["model_xml"] = '<mujoco><asset><mesh file="mesh.bin"/><mesh file="mesh.bin"/></asset></mujoco>'
            with self.assertRaisesRegex(SimulationError, "128 MiB"):
                _model_source(task)


if __name__ == "__main__":
    unittest.main()
