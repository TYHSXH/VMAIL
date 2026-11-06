// Presentation and responsive navigation, independent of the physics engine.
export function renderWorkbenchWelcome(container) {
  container.innerHTML = `
    <div class="welcome-workbench">
      <div class="welcome-caption"><span class="welcome-status-dot"></span> VMAIL / VIRTUAL MECHANICS AI LAB</div>
      <div class="welcome-main">
        <div class="welcome-copy">
          <p class="welcome-eyebrow">从一个问题，到一次发现</p>
          <h2>让力学，<br>在眼前<span>发生。</span></h2>
          <div class="welcome-actions"><button class="primary-button" data-welcome-course type="button">探索课程任务 <span aria-hidden="true">↗</span></button><button class="welcome-ai" data-welcome-assistant type="button">和 AI 一起建模 <span aria-hidden="true">→</span></button></div>
        </div>
        <div class="mechanics-art" aria-hidden="true">
          <svg viewBox="0 0 400 430" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><radialGradient id="massFill" cx=".35" cy=".25" r=".85"><stop stop-color="#e8b092"/><stop offset=".5" stop-color="#bd6b49"/><stop offset="1" stop-color="#743a29"/></radialGradient></defs>
            <g stroke="#a6b3ac" stroke-opacity=".17"><path d="M20 360H380M200 36V394"/><circle cx="200" cy="200" r="148"/><ellipse cx="200" cy="200" rx="182" ry="64" transform="rotate(-30 200 200)"/><path d="M40 100h8m-4-4v8m300 226h8m-4-4v8M46 300h8m-4-4v8"/></g>
            <path d="M200 102v245" stroke="#a6b3ac" stroke-opacity=".35" stroke-dasharray="3 6"/>
            <path d="M70 300a178 178 0 0 0 260 0" stroke="#cf825c" stroke-opacity=".5" stroke-dasharray="2 7"/>
            <path d="M158 82h84m-74-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8" stroke="#aab6ae" stroke-opacity=".6"/>
            <g class="pendulum-arm"><path d="M200 84v216" stroke="#ced6cc" stroke-width="1.8"/><path d="M194 90v204" stroke="#ced6cc" stroke-opacity=".12" stroke-width="8"/><circle cx="200" cy="300" r="26" fill="url(#massFill)"/><circle cx="200" cy="300" r="33" stroke="#d8946c" stroke-opacity=".25"/><g class="gravity-vector"><path d="M200 338v39m-5-7 5 7 5-7" stroke="#d59a79"/><text x="214" y="367" fill="#ba8c70" font-size="12" font-family="Georgia,serif" font-style="italic">mg</text></g></g>
            <circle cx="200" cy="84" r="5" fill="#d7ddd1"/><circle cx="200" cy="84" r="11" stroke="#a6b3ac" stroke-opacity=".25"/>
            <text class="pendulum-angle-label" text-anchor="middle" dominant-baseline="middle" fill="#a6b49f" font-size="15" font-family="Georgia,serif" font-style="italic">θ</text>
            <path class="pendulum-angle-arc" stroke="#a6b49f" stroke-opacity=".7"/>
          </svg>
        </div>
      </div>
      <nav class="welcome-path" aria-label="课程教学路径">
        <div class="path-group"><h3>知识学习</h3><ol class="path-steps">
          <li><a href="/help#doc-0-1-解题思路" target="_blank" rel="noopener noreferrer"><span class="path-step-number">01</span><strong>解题思路</strong></a></li>
          <li><a href="/help#doc-0-2-仿真验证" target="_blank" rel="noopener noreferrer"><span class="path-step-number">02</span><strong>仿真验证</strong></a></li>
          <li><a href="/help#doc-0-3-调参优化" target="_blank" rel="noopener noreferrer"><span class="path-step-number">03</span><strong>调参优化</strong></a></li>
        </ol></div>
        <div class="path-group"><h3>工程应用</h3><ol class="path-steps" start="4">
          <li><a href="/help#doc-0-1-仿真设计" target="_blank" rel="noopener noreferrer"><span class="path-step-number">04</span><strong>仿真设计</strong></a></li>
          <li><a href="/help#doc-0-2-实验实践" target="_blank" rel="noopener noreferrer"><span class="path-step-number">05</span><strong>实验实践</strong></a></li>
          <li><a href="/help#doc-0-3-前沿拓展" target="_blank" rel="noopener noreferrer"><span class="path-step-number">06</span><strong>前沿拓展</strong></a></li>
        </ol></div>
      </nav>
    </div>`;
  animatePendulum(container);
}

export function pendulumGeometry(degrees) {
  const radians = degrees * Math.PI / 180;
  return {
    end: {x: 200 - 54 * Math.sin(radians), y: 84 + 54 * Math.cos(radians)},
    label: {x: 200 - 78 * Math.sin(radians / 2), y: 84 + 78 * Math.cos(radians / 2)},
    sweep: degrees > 0 ? 1 : 0,
    opacity: Math.min(1, Math.abs(degrees) / 5),
  };
}

function animatePendulum(container) {
  const arm = container.querySelector('.pendulum-arm');
  const gravity = container.querySelector('.gravity-vector');
  const arc = container.querySelector('.pendulum-angle-arc');
  const label = container.querySelector('.pendulum-angle-label');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let frame, start;
  function draw(degrees) {
    const geometry = pendulumGeometry(degrees);
    arm.setAttribute('transform', `rotate(${degrees} 200 84)`);
    gravity.setAttribute('transform', `rotate(${-degrees} 200 300)`);
    arc.setAttribute('d', Math.abs(degrees) < .05 ? '' : `M200 138 A54 54 0 0 ${geometry.sweep} ${geometry.end.x} ${geometry.end.y}`);
    label.setAttribute('x', geometry.label.x);
    label.setAttribute('y', geometry.label.y);
    label.setAttribute('opacity', geometry.opacity);
  }
  function tick(now) {
    start ??= now;
    // One shared angle drives the rod, gravity, arc and angle bisector.
    draw(-24 * Math.cos((now - start) * Math.PI / 7000));
    frame = requestAnimationFrame(tick);
  }
  function updateMotion() {
    cancelAnimationFrame(frame);
    start = undefined;
    draw(-24);
    if (!preference.matches) frame = requestAnimationFrame(tick);
  }
  const observer = new MutationObserver(() => {
    if (container.contains(arm)) return;
    cancelAnimationFrame(frame);
    preference.removeEventListener('change', updateMotion);
    observer.disconnect();
  });
  observer.observe(container, {childList: true});
  preference.addEventListener('change', updateMotion);
  updateMotion();
}

export function setupWorkbenchUI() {
  const sidebar = document.getElementById('taskSidebar');
  const inspector = document.getElementById('inspector');
  const expand = document.getElementById('expandTasks');
  const collapse = document.getElementById('collapseTasks');
  const toggle = document.getElementById('toggleInspector');
  const narrow = matchMedia('(max-width: 720px)');
  const overlay = matchMedia('(max-width: 1080px)');
  function closeTasks() { sidebar.classList.add('collapsed'); expand.classList.remove('hidden'); }
  function syncPanels() {
    const tasksOpen = !sidebar.classList.contains('collapsed');
    const inspectorOpen = !inspector.classList.contains('collapsed');
    sidebar.inert = !tasksOpen;
    inspector.inert = !inspectorOpen;
    expand.setAttribute('aria-expanded', String(tasksOpen));
    collapse.setAttribute('aria-expanded', String(tasksOpen));
    expand.setAttribute('aria-controls', 'taskSidebar');
    collapse.setAttribute('aria-controls', 'taskSidebar');
    toggle.setAttribute('aria-expanded', String(inspectorOpen));
  }
  const observer = new MutationObserver(records => {
    if (narrow.matches) {
      for (const record of records) {
        if (record.target === inspector && !inspector.classList.contains('collapsed')) closeTasks();
        else if (record.target === sidebar && !sidebar.classList.contains('collapsed')) inspector.classList.add('collapsed');
      }
    }
    syncPanels();
  });
  observer.observe(sidebar, {attributes: true, attributeFilter: ['class']});
  observer.observe(inspector, {attributes: true, attributeFilter: ['class']});
  if (narrow.matches) closeTasks();
  narrow.addEventListener('change', event => { if (event.matches) closeTasks(); });
  document.getElementById('mobileSidebarBackdrop').addEventListener('click', () => { closeTasks(); expand.focus(); });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-welcome-course]')) document.querySelector('.course-entry').click();
    if (event.target.closest('[data-welcome-assistant]')) document.getElementById('openAssistant').click();
    if (narrow.matches && event.target.closest('#expandTasks')) { syncPanels(); collapse.focus(); }
    if (narrow.matches && event.target.closest('#collapseTasks')) expand.focus();
    if (narrow.matches && event.target.closest('#taskList .task-item')) { closeTasks(); document.getElementById('taskTitle').focus(); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' && narrow.matches && !sidebar.classList.contains('collapsed') && !document.querySelector('dialog[open], #modelPreview:not(.hidden)')) {
      const controls = [...sidebar.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || !sidebar.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !sidebar.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    }
    if (event.key !== 'Escape' || document.querySelector('dialog[open], #modelPreview:not(.hidden)')) return;
    if (narrow.matches && !sidebar.classList.contains('collapsed')) { closeTasks(); expand.focus(); }
    else if (overlay.matches && !inspector.classList.contains('collapsed')) { inspector.classList.add('collapsed'); toggle.focus(); }
  });
  const topbar = document.querySelector('.topbar');
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--topbar-height', `${topbar.getBoundingClientRect().height}px`);
  }).observe(topbar);
  syncPanels();
}
