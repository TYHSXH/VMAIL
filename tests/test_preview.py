import base64
import unittest
import json
import struct

import mujoco

from backend.preview import LIBRARY_ROOT, prepare_preview, preview_choices, pack_preview
from backend.simulator import SimulationError


class PreviewTests(unittest.TestCase):
    def test_binary_bundle_preserves_mesh_bytes_and_manifest(self):
        payload = prepare_preview(model_id="unitree_z1", entry="scene.xml", binary_assets=True)
        packed = pack_preview(payload)
        length = struct.unpack("<I", packed[:4])[0]
        manifest = json.loads(packed[4:4 + length])
        self.assertEqual(manifest["xml"], payload["xml"])
        offset = 4 + length
        for resource in manifest["assets"]:
            self.assertEqual(packed[offset:offset + resource["bytes"]], payload["assets"][resource["name"]])
            offset += resource["bytes"]
        self.assertEqual(offset, len(packed))

    def test_library_scene_and_implicit_mesh_names_compile(self):
        payload = prepare_preview(model_id="kuka_iiwa_14", entry="scene.xml")
        assets = {name: base64.b64decode(blob) for name, blob in payload["assets"].items()}
        self.assertTrue(assets)
        self.assertNotIn("<include", payload["xml"])
        model = mujoco.MjModel.from_xml_string(payload["xml"], assets)
        self.assertGreater(model.nmesh, 0)

    def test_single_original_xml_finds_companion_scene_and_mesh(self):
        path = LIBRARY_ROOT / "02_flexible_structures/soft_gripper/gripper.xml"
        payload = prepare_preview(path.read_text(encoding="utf-8"), path.name)
        self.assertTrue(payload["assets"])
        mujoco.MjModel.from_xml_string(payload["xml"], {name: base64.b64decode(blob) for name, blob in payload["assets"].items()})

    def test_binary_stl_resources_compile(self):
        payload = prepare_preview(model_id="unitree_z1", entry="scene.xml")
        assets = {name: base64.b64decode(blob) for name, blob in payload["assets"].items()}
        self.assertTrue(any(name.lower().endswith(".stl") for name in assets))
        model = mujoco.MjModel.from_xml_string(payload["xml"], assets)
        self.assertGreater(model.nmesh, 0)

    def test_cannot_request_arbitrary_file(self):
        with self.assertRaises(SimulationError):
            prepare_preview(model_id="kuka_iiwa_14", entry="../../backend/main.py")

    def test_external_missing_file_has_actionable_error(self):
        with self.assertRaisesRegex(SimulationError, "missing.stl"):
            prepare_preview('<mujoco><asset><mesh file="missing.stl"/></asset></mujoco>', "custom.xml")

    def test_self_contained_xml_and_library_choices(self):
        payload = prepare_preview('<mujoco><worldbody><geom size=".1"/></worldbody></mujoco>', "custom.xml")
        self.assertEqual(payload["assets"], {})
        self.assertTrue(any(m["id"] == "kuka_iiwa_14" for m in preview_choices()))

    def test_joint_limit_metadata_inherits_defaults_and_respects_disabled_limits(self):
        payload = prepare_preview('<mujoco><default><joint range="-30 30"/></default><worldbody><body><joint/><geom size=".1"/><body><joint limited="false"/><geom size=".1"/></body></body></worldbody></mujoco>', 'custom.xml')
        self.assertEqual(payload['joint_limits'], [True, False])


if __name__ == "__main__":
    unittest.main()
