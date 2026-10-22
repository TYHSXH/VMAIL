export const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/gif", "image/webp"]);

export function isImageFile(file) {
  return IMAGE_TYPES.has(file.type) || (!file.type && /\.(png|jpe?g|gif|webp)$/i.test(file.name));
}

export function classifyDroppedFiles(files) {
  if (!files.length) return "none";
  if (files.length === 1 && /\.xml$/i.test(files[0].name)) return "xml";
  if (files.some(file => /\.xml$/i.test(file.name))) return "mixed";
  return files.every(isImageFile) ? "images" : "unsupported";
}

// One owner for global file drops: images must never reach the XML loader.
export function setupFileDrop({onImages, onXml, onError}) {
  const hint = document.getElementById("fileDropHint");
  let depth = 0;
  const hasFiles = event => Array.from(event.dataTransfer?.types || []).includes("Files");
  const clear = () => { depth = 0; hint.classList.add("hidden"); };
  window.addEventListener("dragenter", event => {
    if (!hasFiles(event)) return;
    event.preventDefault(); depth++; hint.classList.remove("hidden");
  });
  window.addEventListener("dragover", event => {
    if (!hasFiles(event)) return;
    event.preventDefault(); event.dataTransfer.dropEffect = "copy";
  });
  window.addEventListener("dragleave", event => { if (hasFiles(event) && --depth <= 0) clear(); });
  window.addEventListener("drop", event => {
    if (!hasFiles(event)) return;
    event.preventDefault(); clear();
    const files = Array.from(event.dataTransfer.files);
    switch (classifyDroppedFiles(files)) {
      case "xml": void onXml(files); break;
      case "images": void onImages(files); break;
      case "mixed": onError("图片与 XML 请分开拖入；模型预览一次接收一个 XML 文件。"); break;
      case "unsupported": onError("请选择 PNG、JPEG、GIF、WebP 图片，或单个 MuJoCo XML 文件。"); break;
    }
  });
  window.addEventListener("dragend", clear);
  window.addEventListener("blur", clear);
}
