const paths = {
  "panel-left": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-10-2 2 2 2"/>',
  "panel-right": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16m-7-10 2 2-2 2"/>',
  refresh: '<path d="M20 10a8 8 0 0 0-14-4L3 9m0-5v5h5m-4 5a8 8 0 0 0 14 4l3-3m0 5v-5h-5"/>',
  reset: '<path d="M4 9a8 8 0 1 1 0 6m0-11v5h5"/>',
  cube: '<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 9 9-4m-9 4L3 8m9 4v10m-5-17 9 5"/>',
  sliders: '<path d="M5 3v7m0 4v7m7-18v2m0 4v12m7-18v10m0 4v4M2 10h6m1-5h6m1 8h6"/>',
  orbit: '<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-35 12 12)"/><path d="M7 6c-1-4 1-5 4-2s7 12 6 16-5 0-7-4"/>',
  move: '<path d="M12 3v18M3 12h18M9 6l3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3"/>',
  hand: '<path d="M8 12V5a2 2 0 0 1 4 0v7-8a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v9a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-4-6a2 2 0 0 1 3-2l1 1Z"/>',
  frame: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><circle cx="12" cy="12" r="3"/>',
  step: '<path d="m5 4 12 8-12 8V4Zm14 0v16"/>',
  edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-4L4 15v5Z"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
  check: '<path d="m5 12 4 4L20 5"/>',
  back: '<path d="M20 12H4m6-6-6 6 6 6"/>',
};

export function icon(name) {
  return `<svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ""}</svg>`;
}

export function decorateIcons() {
  document.querySelectorAll("[data-icon]").forEach(element => element.insertAdjacentHTML("afterbegin", icon(element.dataset.icon)));
}
