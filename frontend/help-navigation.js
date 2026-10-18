// Resolve relative Markdown links using the source document's directory.
export function resolveHelpLink(href, documentPath, origin) {
  const url = new URL(href, new URL(`/${documentPath}`, origin));
  if (url.origin !== origin || !url.pathname.endsWith(".md")) return null;
  return { path: decodeURIComponent(url.pathname.slice(1)), anchor: decodeURIComponent(url.hash.slice(1)) };
}

export function headingSlug(text) {
  return text.trim().toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, "").replace(/\s/g, "-");
}
