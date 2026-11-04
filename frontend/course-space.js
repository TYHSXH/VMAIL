import './course-space.css';
// Course content is folder-backed; user selections stay in the workspace.
export function setupCourseSpace({ onModel, onTask, onEnter, onExit }) {
  const get = id => document.getElementById(id);
  const space = get('courseSpace'), detail = get('courseDetail');
  let resources = [], kind = 'models', selected = null, busy = false;
  const node = (tag, className, text) => { const el = document.createElement(tag); el.className = className; if (text) el.textContent = text; return el; };
  function artwork(item) {
    if (item.preview) { const img = node('img', 'course-thumbnail'); img.src = item.preview; img.alt = `${item.title}预览`; img.loading = 'lazy'; return img; }
    const fallback = node('div', 'course-placeholder'); fallback.append(node('span', '', item.kind === 'models' ? '◇' : '▤'), node('small', '', '暂无预览图')); return fallback;
  }
  function options(el, values, placeholder) {
    const previous = el.value; el.replaceChildren(new Option(placeholder, ''));
    for (const [value, title] of values) el.add(new Option(title, value));
    el.value = values.some(([value]) => value === previous) ? previous : '';
  }
  function filters() {
    const items = resources.filter(item => item.kind === kind);
    options(get('courseGroup'), [...new Map(items.map(item => [item.group, item.group_label]))], '全部来源');
    const categories = [...new Set(items.filter(item => !get('courseGroup').value || item.group === get('courseGroup').value).map(item => item.category))];
    options(get('courseCategory'), categories.map(value => [value, value]), '全部分类');
  }
  function render() {
    get('courseModelCount').textContent = resources.filter(item => item.kind === 'models').length;
    get('courseTaskCount').textContent = resources.filter(item => item.kind === 'tasks').length;
    get('courseLibraryTitle').textContent = kind === 'models' ? '发现优秀模型' : '开始一次完整的力学探究';
    get('courseLibraryIntro').textContent = kind === 'models' ? '添加到模型预览，观察结构、调整关节并运行仿真。' : '复现到学习任务，保留模型、参数、观测与实验说明。';
    const query = get('courseSearch').value.trim().toLocaleLowerCase();
    const visible = resources.filter(item => item.kind === kind && (!get('courseGroup').value || item.group === get('courseGroup').value) && (!get('courseCategory').value || item.category === get('courseCategory').value) && `${item.title} ${item.description} ${item.provider || item.author}`.toLocaleLowerCase().includes(query));
    get('courseResultCount').textContent = `共 ${visible.length} 项${kind === 'models' ? '模型' : '任务'}资源`;
    const grid = get('courseGrid'); grid.replaceChildren();
    if (!visible.length) grid.append(node('p', 'course-empty', '没有找到匹配的资源。试试其他关键词或分类。'));
    for (const item of visible) {
      const card = node('button', 'course-card'); card.type = 'button'; card.setAttribute('aria-label', `查看${item.title}`);
      card.append(artwork(item)); const copy = node('div', 'course-card-copy');
      const footer = node('div', 'course-card-footer');
      footer.append(node('span', 'course-card-provider', item.provider || item.author), node('span', 'course-card-link', '查看详情 ↗'));
      copy.append(node('span', 'course-card-source', item.category), node('h3', '', item.title), footer); card.append(copy);
      card.addEventListener('click', () => showDetail(item)); grid.append(card);
    }
  }
  async function refresh() {
    get('refreshCourse').disabled = true;
    try { const response = await fetch('/api/course-resources'); if (!response.ok) throw new Error('课程资源读取失败，请稍后重试。'); resources = (await response.json()).resources; filters(); render(); }
    catch (error) { get('courseResultCount').textContent = error.message; }
    finally { get('refreshCourse').disabled = false; }
  }
  function showDetail(item) {
    selected = item; get('courseDetailTitle').textContent = item.title; get('courseDetailDescription').textContent = item.description;
    get('courseDetailSource').textContent = `${item.group_label} / ${item.category}`; get('courseDetailAuthor').textContent = `提供者：${item.provider || item.author}`;
    get('courseDetailImage').replaceChildren(artwork(item)); get('courseDetailStatus').textContent = '';
    get('courseEntryLabel').hidden = item.kind !== 'models'; get('courseDetailEntry').replaceChildren(...item.entries.map(entry => new Option(entry, entry)));
    get('reproduceCourse').textContent = item.kind === 'models' ? '添加并打开模型预览' : '复现到学习任务';
    get('courseDetailHint').textContent = item.kind === 'models' ? '模型加入此浏览器的侧边库，配套资源从课程原件读取。' : '在本机创建独立任务副本，不含原作者的实验结果；重复添加会打开已有副本。';
    detail.showModal();
  }
  document.querySelectorAll('[data-open-course]').forEach(button => button.addEventListener('click', () => {
    kind = button.closest('#modelPreview') ? 'models' : button.classList.contains('course-entry') ? 'tasks' : kind;
    setKind(kind); onEnter?.(); space.showModal(); void refresh();
  }));
  function setKind(value) { kind = value; document.querySelectorAll('[data-course-type]').forEach(button => { const active = button.dataset.courseType === kind; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); }); filters(); render(); }
  document.querySelectorAll('[data-course-type]').forEach(button => button.addEventListener('click', () => setKind(button.dataset.courseType)));
  get('courseGroup').addEventListener('change', () => { filters(); render(); }); get('courseCategory').addEventListener('change', render); get('courseSearch').addEventListener('input', render);
  get('refreshCourse').addEventListener('click', refresh); get('closeCourse').addEventListener('click', () => space.close()); space.addEventListener('close', () => onExit?.());
  get('closeCourseDetail').addEventListener('click', () => detail.close()); detail.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
  get('reproduceCourse').addEventListener('click', async () => {
    if (!selected || busy) return;
    busy = true; get('reproduceCourse').disabled = true; get('closeCourseDetail').disabled = true; get('courseDetailStatus').textContent = '正在准备资源…';
    try {
      const item = selected;
      if (item.kind === 'models') {
        const entry = get('courseDetailEntry').value;
        if (!entry) throw new Error('该模型没有可用的 XML 入口。');
        detail.close(); space.close(); await onModel({ model_id: item.model_id, entry, title: item.title });
      } else {
        const response = await fetch(`/api/course-resources/${item.id}/reproduce`, { method: 'POST', headers: { 'X-VMAIL-Assistant': '1' } });
        const result = await response.json(); if (!response.ok) throw new Error(result.detail || '任务复现失败。');
        detail.close(); space.close(); await onTask(result);
      }
    } catch (error) { get('courseDetailStatus').textContent = error.message; }
    finally { busy = false; get('reproduceCourse').disabled = false; get('closeCourseDetail').disabled = false; }
  });
}
