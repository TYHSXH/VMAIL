import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveHelpLink, headingSlug } from '../frontend/help-navigation.js';

const origin = 'http://127.0.0.1:8000';
test('help resolves nested Markdown links relative to each document', () => {
  assert.deepEqual(resolveHelpLink('load-controls.md', 'docs/user-guide.md', origin), {path:'docs/load-controls.md', anchor:''});
  assert.deepEqual(resolveHelpLink('../tasks/AGENTS.md', 'docs/README.md', origin), {path:'tasks/AGENTS.md', anchor:''});
  assert.deepEqual(resolveHelpLink('01_engineering_mechanisms/fridge_door/SOURCE.md', 'model_library/README.md', origin), {path:'model_library/01_engineering_mechanisms/fridge_door/SOURCE.md', anchor:''});
  assert.deepEqual(resolveHelpLink('#安装步骤', 'docs/user-guide.md', origin), {path:'docs/user-guide.md', anchor:'安装步骤'});
  assert.deepEqual(resolveHelpLink('task-package-spec.md#notesmd', 'docs/user-guide.md', origin), {path:'docs/task-package-spec.md', anchor:'notesmd'});
});
test('external links and non-Markdown resources remain unchanged', () => {
  assert.equal(resolveHelpLink('https://github.com/example/README.md', 'docs/user-guide.md', origin), null);
  assert.equal(resolveHelpLink('https://example.com', 'docs/user-guide.md', origin), null);
  assert.equal(resolveHelpLink('model.xml', 'docs/user-guide.md', origin), null);
});
test('heading slugs support Chinese and Markdown file names', () => {
  assert.equal(headingSlug('学生首次使用'), '学生首次使用');
  assert.equal(headingSlug('notes.md'), 'notesmd');
  assert.equal(headingSlug('方式一：一键配置和启动（推荐）'), '方式一一键配置和启动推荐');
});
