import json
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch
import yaml
from backend import course_resources as course
from backend.preview import prepare_preview
from backend.task_io import TaskValidationError, delete_task


class CourseResourceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.course = self.root / 'course_resources'
        self.tasks = self.root / 'tasks'
        self.tasks.mkdir()
        (self.tasks / 'manifest.yaml').write_text('tasks: []', encoding='utf-8')
        self.patcher = patch.object(course, 'COURSE_ROOT', self.course)
        self.patcher.start()
        self.addCleanup(self.patcher.stop)

    def add_task(self):
        folder = self.course / 'tasks/course_team/vibration/spring'
        shutil.copytree(course.ROOT / 'course_resources/tasks/course_team/example_mass_spring', folder, ignore=shutil.ignore_patterns('results'))
        (folder / 'results').mkdir()
        (folder / 'results/personal.txt').write_text('private')
        return folder

    def test_nested_folder_discovery_and_public_metadata(self):
        self.add_task()
        folder = self.course / 'models/2026/mechanics/pendulum'
        folder.mkdir(parents=True)
        (folder / 'resource.yaml').write_text('title: Pendulum\nentries: [model.xml]')
        items = course.course_resources()
        model = next(item for item in items if item['kind'] == 'models')
        task = next(item for item in items if item['kind'] == 'tasks')
        self.assertEqual(model['group_label'], '2026届')
        self.assertEqual(model['category'], 'mechanics')
        self.assertEqual(task['group_label'], '课程组')
        self.assertNotIn('_folder', json.dumps(course.public_resource(model)))

    def test_provider_includes_cohort_student_number_and_name(self):
        self.assertEqual(course.provider_label('2026', '张同学', '26001234'), '2026届-26001234-张同学')
        self.assertEqual(course.provider_label('course_team', '课程组', ''), '课程组')
        self.assertEqual(course.provider_label('2026', '张同学', ''), '2026届-张同学')
        folder = self.course / 'models/2026/pendulum'
        folder.mkdir(parents=True)
        (folder / 'resource.yaml').write_text('title: Pendulum\nauthor: 张同学\nstudent_id: "00260001"\nentries: [model.xml]', encoding='utf-8')
        item = course.course_resources()[0]
        self.assertEqual(item['student_id'], '00260001')
        self.assertEqual(item['provider'], '2026届-00260001-张同学')

    def test_reproduction_is_independent_idempotent_and_excludes_results(self):
        folder = self.add_task()
        original = (folder / 'task.yaml').read_bytes()
        item = course.course_resources()[0]
        result = course.reproduce_task(item['id'], self.tasks)
        copied = self.tasks / result['id']
        self.assertFalse((copied / 'results').exists())
        self.assertEqual(yaml.safe_load((copied / 'task.yaml').read_text(encoding='utf-8'))['id'], result['id'])
        (copied / 'notes.md').write_text('changed')
        self.assertNotEqual((folder / 'notes.md').read_text(encoding='utf-8'), 'changed')
        self.assertEqual((folder / 'task.yaml').read_bytes(), original)
        repeated = course.reproduce_task(item['id'], self.tasks)
        self.assertTrue(repeated['existing'])
        self.assertEqual(repeated['id'], result['id'])
        delete_task(self.tasks, result['id'])
        self.assertFalse(course.reproduce_task(item['id'], self.tasks)['existing'])

    def test_bad_copy_rolls_back_without_registering_task(self):
        folder = self.add_task()
        (folder / 'parameters.yaml').write_text('parameters: {x: {value: invalid}}')
        key = course.course_resources()[0]['id']
        with self.assertRaises(TaskValidationError):
            course.reproduce_task(key, self.tasks)
        self.assertEqual(list(self.tasks.iterdir()), [self.tasks / 'manifest.yaml'])

    def test_contributed_model_compiles_and_blocks_escape(self):
        folder = self.course / 'models/2026/demo'
        folder.mkdir(parents=True)
        (folder / 'resource.yaml').write_text('title: Demo\nentries: [model.xml]')
        (folder / 'model.xml').write_text('<mujoco><worldbody><geom size=".1"/></worldbody></mujoco>')
        item = course.course_resources()[0]
        payload = prepare_preview(model_id=item['model_id'], entry='model.xml')
        self.assertIn('mujoco', payload['xml'])
        (folder / 'resource.yaml').write_text('title: Demo\nentries: [../../outside.xml]')
        self.assertEqual(course.contributed_models(), [])

    def test_incomplete_tasks_and_malformed_model_entries_do_not_break_listing(self):
        folder = self.course / 'tasks/2026/incomplete'
        folder.mkdir(parents=True)
        (folder / 'task.yaml').write_text('title: Incomplete')
        folder = self.course / 'models/2026/invalid'
        folder.mkdir(parents=True)
        (folder / 'resource.yaml').write_text('entries: invalid')
        self.assertEqual(course.course_resources(), [])


if __name__ == '__main__':
    unittest.main()
