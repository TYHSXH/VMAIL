import io
from pathlib import Path
import unittest
import zipfile
import tempfile

import mujoco
from backend.main import task_template
from backend.simulator import _model_source

ROOT = Path(__file__).resolve().parents[1]


class TemplateTests(unittest.TestCase):
    def test_downloaded_template_is_self_contained_and_compiles(self):
        archive = zipfile.ZipFile(io.BytesIO(task_template().body))
        self.assertEqual(set(archive.namelist()), {"model.xml", "assets/logo-gray.png"})
        model = mujoco.MjModel.from_xml_string(archive.read("model.xml").decode("utf-8"), {"assets/logo-gray.png": archive.read("assets/logo-gray.png")})
        self.assertEqual(model.ntex, 1)
        data = mujoco.MjData(model)
        mujoco.mj_step(model, data)
        self.assertGreater(data.time, 0)

    def test_template_assets_work_through_task_resource_loader(self):
        archive = zipfile.ZipFile(io.BytesIO(task_template().body))
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            archive.extractall(folder)
            xml, assets = _model_source({"path": str(folder), "model_xml": (folder / "model.xml").read_text(encoding="utf-8")})
        model = mujoco.MjModel.from_xml_string(xml, assets)
        floor = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_GEOM, "floor")
        self.assertGreaterEqual(floor, 0)
        self.assertEqual(model.geom_type[floor], mujoco.mjtGeom.mjGEOM_PLANE)
        self.assertEqual(len(assets), 1)
        self.assertTrue(next(iter(assets.values())) == (ROOT / "assets/logos/logo-gray.png").read_bytes())
