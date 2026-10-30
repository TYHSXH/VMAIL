"""Exercise the distributed app over HTTP, using disposable tasks and history."""
import io
import json
from pathlib import Path
import shutil
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class ReleaseHTTPTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temporary = tempfile.TemporaryDirectory(prefix="vmail-http-")
        folder = Path(cls.temporary.name)
        cls.tasks_dir = folder / "tasks"
        shutil.copytree(ROOT / "tasks", folder / "tasks", ignore=shutil.ignore_patterns("results", "__pycache__"))
        with socket.socket() as probe:
            probe.bind(("127.0.0.1", 0))
            port = probe.getsockname()[1]
        cls.base = f"http://127.0.0.1:{port}"
        script = """from pathlib import Path
import sys, uvicorn
from backend import main, assistant
from backend.assistant_history import ConversationStore
from backend.assistant_credentials import CredentialStore
main.TASKS_DIR = Path(sys.argv[1]) / 'tasks'
assistant.TASKS_DIR = main.TASKS_DIR
assistant.HISTORY = ConversationStore(Path(sys.argv[1]) / 'history.sqlite3')
assistant.STORE = CredentialStore(Path(sys.argv[1]) / 'deepseek.key')
uvicorn.run(main.app, host='127.0.0.1', port=int(sys.argv[2]), log_level='error')
"""
        cls.process = subprocess.Popen([sys.executable, "-c", script, str(folder), str(port)], cwd=ROOT,
                                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(100):
            try:
                cls.request("/api/health")
                return
            except OSError:
                if cls.process.poll() is not None:
                    break
                time.sleep(.1)
        cls.tearDownClass()
        raise RuntimeError("HTTP test server failed to start")

    @classmethod
    def tearDownClass(cls):
        cls.process.terminate()
        cls.process.wait(timeout=15)
        cls.temporary.cleanup()

    @classmethod
    def request(cls, path, body=None, method=None, headers=None):
        request = Request(cls.base + path, data=json.dumps(body).encode() if body is not None else None,
                          method=method, headers={"Content-Type": "application/json", **(headers or {})})
        with urlopen(request, timeout=30) as response:
            raw = response.read()
            content = json.loads(raw) if "json" in response.headers.get("content-type", "") else raw
            return content, response.headers

    def test_all_built_resources_and_gray_template_are_served(self):
        self.assertIn(b"VMAIL", self.request("/")[0])
        manifest = json.loads((ROOT / "app/.vite/manifest.json").read_text(encoding="utf-8"))
        for entry in manifest.values():
            for resource in [entry["file"], *entry.get("css", []), *entry.get("assets", [])]:
                raw, headers = self.request("/static/" + resource)
                self.assertTrue(raw)
                if resource.endswith(".wasm"):
                    self.assertEqual(headers.get_content_type(), "application/wasm")
        archive = zipfile.ZipFile(io.BytesIO(self.request("/api/task-template")[0]))
        self.assertEqual(set(archive.namelist()), {"model.xml", "assets/logo-gray.png", "LICENSE", "NOTICE", "COPYRIGHT.md", "assets/LOGO_RIGHTS.txt"})
        for document in ("LICENSE", "NOTICE", "COPYRIGHT.md", "CONTRIBUTING.md"):
            self.assertEqual(self.request("/" + document)[0], (ROOT / document).read_bytes())
        self.assertEqual(archive.read("LICENSE"), self.request("/LICENSE")[0])
        self.assertEqual(archive.read("NOTICE"), self.request("/NOTICE")[0])
        self.assertEqual(archive.read("COPYRIGHT.md"), self.request("/COPYRIGHT.md")[0])
        self.assertEqual(archive.read("assets/LOGO_RIGHTS.txt"), (ROOT / "assets/logos/LICENSE.txt").read_bytes())
        self.assertEqual(archive.read("assets/logo-gray.png"), (ROOT / "assets/logos/logo-gray.png").read_bytes())
        self.assertEqual(len(self.request("/api/help-documents")[0]["documents"]), 3)

    def test_every_task_loads_simulates_and_exports_csv(self):
        for task in self.request("/api/tasks")[0]["tasks"]:
            identifier = task["id"]
            with self.subTest(task=identifier):
                self.request(f"/api/tasks/{identifier}/browser-model", {})
                result = self.request(f"/api/tasks/{identifier}/simulate", {"duration": .05, "timestep": .001})[0]
                run_id = result["saved"]["run_id"]
                raw, headers = self.request(f"/api/tasks/{identifier}/results/{run_id}/data.csv")
                self.assertIn("time", raw.decode("utf-8-sig").splitlines()[0])
                self.assertEqual(headers.get_content_type(), "text/csv")

    def test_bad_task_configuration_returns_a_readable_error_and_service_recovers(self):
        path = self.tasks_dir / "example_mass_spring" / "ui.yaml"
        original = path.read_bytes()
        try:
            path.write_text("layout:\n  charts:\n  - title: invalid\n    series: null\n", encoding="utf-8")
            for suffix, body in (("", None), ("/browser-model", {}), ("/simulate", {})):
                with self.subTest(suffix=suffix), self.assertRaises(HTTPError) as raised:
                    self.request("/api/tasks/example_mass_spring" + suffix, body)
                self.assertEqual(raised.exception.code, 400)
                self.assertIn("series", json.loads(raised.exception.read())["detail"])
        finally:
            path.write_bytes(original)
        self.assertEqual(self.request("/api/health")[0]["status"], "ok")
        self.request("/api/tasks/example_mass_spring/browser-model", {})

    def test_history_roundtrip_delete_isolated_and_no_cache(self):
        headers = {"X-VMAIL-Assistant": "1"}
        state = {"messages": [{"role": "user", "content": "独立对话"}], "input": "草稿"}
        for identifier in ("one", "two"):
            self.request(f"/api/assistant/conversations/{identifier}", state, "PUT", headers)
        data, response_headers = self.request("/api/assistant/conversations/one", headers=headers)
        self.assertEqual(data["input"], "草稿")
        self.assertEqual(response_headers["Cache-Control"], "no-store")
        self.request("/api/assistant/conversations/one", method="DELETE", headers=headers)
        remaining = self.request("/api/assistant/conversations", headers=headers)[0]["conversations"]
        self.assertEqual([item["id"] for item in remaining], ["two"])

    def test_cross_site_rebinding_and_unmarked_history_requests_are_rejected(self):
        for path, headers in [("/api/tasks", {"Origin": "https://other.example"}),
                              ("/api/tasks", {"Host": "other.example"}),
                              ("/api/assistant/conversations", {})]:
            with self.subTest(path=path, headers=headers), self.assertRaises(HTTPError) as raised:
                self.request(path, headers=headers)
            self.assertEqual(raised.exception.code, 403)
