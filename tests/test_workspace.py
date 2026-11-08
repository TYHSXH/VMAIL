from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

from backend import personal_models, main
from backend.preview import prepare_preview
from backend.task_io import list_tasks
from backend.workspace import migrate_legacy_tasks

ROOT = Path(__file__).resolve().parents[1]
XML = '<mujoco><worldbody><geom type="sphere" size=".1"/></worldbody></mujoco>'


class WorkspaceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.models = self.root / '.local/models'
        self.patcher = patch.object(personal_models, 'MODELS_DIR', self.models)
        self.patcher.start()
        self.addCleanup(self.patcher.stop)

    def test_new_workspace_is_empty_while_course_resources_remain_available(self):
        tasks = self.root / '.local/tasks'
        with patch.object(main, 'TASKS_DIR', tasks):
            self.assertEqual(main.api_list_tasks(), {'tasks': []})
            public = main.api_course_resources()['resources']
            self.assertTrue(any(item['kind'] == 'tasks' for item in public))
            resource = next(item for item in public if item['kind'] == 'tasks')
            copied = main.api_reproduce_resource(resource['id'])
            self.assertTrue((tasks / copied['id'] / 'model.xml').is_file())
            self.assertEqual(len(main.api_list_tasks()['tasks']), 1)
            self.assertEqual(main.api_course_resources()['resources'], public)

    def test_explicit_migration_preserves_inputs_and_results(self):
        legacy = self.root / 'tasks'
        source = ROOT / 'course_resources/tasks/course_team/example_mass_spring'
        shutil.copytree(source, legacy / 'example_mass_spring')
        (legacy / 'example_mass_spring/results').mkdir(exist_ok=True)
        (legacy / 'example_mass_spring/results/personal.csv').write_text('own data')
        (legacy / 'manifest.yaml').write_text('tasks: [{id: example_mass_spring, title: Personal}]')
        before = (legacy / 'example_mass_spring/model.xml').read_bytes()
        self.assertEqual(migrate_legacy_tasks(self.root), 1)
        private = self.root / '.local/tasks/example_mass_spring'
        self.assertEqual((private / 'model.xml').read_bytes(), before)
        self.assertEqual((private / 'results/personal.csv').read_text(), 'own data')
        self.assertEqual(list_tasks(legacy), [])
        self.assertEqual(migrate_legacy_tasks(self.root), 0)

    def test_migration_without_legacy_tasks_is_a_noop(self):
        self.assertEqual(migrate_legacy_tasks(self.root), 0)
        self.assertFalse((self.root / 'tasks').exists())
        self.assertFalse((self.root / '.local/tasks').exists())

    def test_model_is_persistent_loadable_and_removal_only_hides(self):
        saved = personal_models.save_model(xml=XML, filename='my-model.xml')
        self.assertEqual(personal_models.model_choices()[0]['model_id'], saved['model_id'])
        payload = prepare_preview(model_id=saved['model_id'], entry=saved['entry'])
        self.assertIn('mujoco', payload['xml'])
        folder = Path(personal_models.personal_models()[0]['folder'])
        (folder / 'notes.md').write_text('personal changes')
        self.assertTrue(personal_models.save_model(xml=XML, filename='again.xml')['existing'])
        self.assertEqual((folder / 'notes.md').read_text(), 'personal changes')
        personal_models.hide_model(saved['model_id'])
        self.assertEqual(personal_models.model_choices(), [])
        self.assertTrue((folder / 'model.xml').is_file())
        personal_models.save_model(xml=XML, filename='my-model.xml')
        self.assertEqual(len(personal_models.model_choices()), 1)

    def test_manual_model_folder_is_discovered_and_cannot_escape(self):
        folder = self.models / 'my_model'
        folder.mkdir(parents=True)
        (folder / 'model.xml').write_text(XML)
        self.assertEqual(personal_models.model_choices()[0]['title'], 'my_model')
        (folder / 'resource.yaml').write_text('entries: [../../outside.xml]')
        self.assertEqual(personal_models.model_choices(), [])

    def test_invalid_model_is_not_registered(self):
        with self.assertRaises(Exception):
            personal_models.save_model(xml='<invalid/>', filename='bad.xml')
        self.assertEqual(personal_models.model_choices(), [])


if __name__ == '__main__':
    unittest.main()
