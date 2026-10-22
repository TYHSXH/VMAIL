import "./styles.css";
import { renderTaskNotes } from "./task-notes.js";
import { headingSlug, resolveHelpLink } from "./help-navigation.js";

const content = document.getElementById("helpContent");
const navigation = document.getElementById("helpNavigation");
try {
  const response = await fetch("/api/help-documents", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { documents } = await response.json();
  if (!documents?.length) throw new Error("没有可阅读的文档");
  const fragment = document.createDocumentFragment();
  const targets = new Map();
  for (const [index, doc] of documents.entries()) {
    const section = document.createElement("section");
    section.id = `doc-${index}`;
    section.className = "help-document";
    renderTaskNotes(section, doc.source);
    const menu = document.createElement("details");
    menu.open = index === 0;
    const summary = document.createElement("summary");
    summary.textContent = doc.title;
    menu.append(summary);
    const start = document.createElement("a");
    start.href = `#${section.id}`;
    start.textContent = "概览";
    menu.append(start);
    const counts = new Map();
    const headings = new Map();
    for (const heading of section.querySelectorAll("h2")) {
      const base = headingSlug(heading.textContent);
      const count = counts.get(base) || 0;
      counts.set(base, count + 1);
      const slug = count ? `${base}-${count}` : base;
      heading.id = `${section.id}-${slug}`;
      headings.set(slug, heading.id);
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      menu.append(link);
    }
    targets.set(doc.path, { section, headings });
    fragment.append(section);
    navigation.append(menu);
  }
  for (const doc of documents) {
    for (const link of targets.get(doc.path).section.querySelectorAll("a[href]")) {
      const resolved = resolveHelpLink(link.getAttribute("href"), doc.path, location.origin);
      const target = resolved && targets.get(resolved.path);
      if (!target) {
        if (resolved) link.href = `/${resolved.path}${resolved.anchor ? "#" + encodeURIComponent(resolved.anchor) : ""}`;
        continue;
      }
      link.href = `#${target.headings.get(resolved.anchor) || target.section.id}`;
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  }
  content.replaceChildren(fragment);
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
} catch (error) {
  content.textContent = `使用手册加载失败（${error.message}）。请确认后台服务已重启后刷新页面。`;
}
