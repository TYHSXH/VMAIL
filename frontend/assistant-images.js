import {isImageFile} from "./file-drop.js";

export const IMAGE_LIMIT = 5 * 1024 * 1024;
export const ATTACHMENT_LIMIT = 4;
export const CONVERSATION_IMAGE_LIMIT = 8;
export const CONVERSATION_BYTE_LIMIT = 20 * 1024 * 1024;

export function imageMime(bytes) {
  const starts = values => values.every((value, i) => bytes[i] === value);
  if (starts([137,80,78,71,13,10,26,10])) return "image/png";
  if (starts([255,216,255])) return "image/jpeg";
  if (starts([71,73,70,56]) && [55,57].includes(bytes[4]) && bytes[5] === 97) return "image/gif";
  if (starts([82,73,70,70]) && [87,69,66,80].every((value, i) => bytes[i + 8] === value)) return "image/webp";
  return null;
}

export function validateImageFiles(files, currentCount = 0) {
  if (files.length + currentCount > ATTACHMENT_LIMIT) throw new Error("每条消息最多添加 4 张图片。");
  for (const file of files) {
    if (!isImageFile(file)) throw new Error("仅支持 PNG、JPEG、GIF、WebP 图片；XML 请单独拖入模型预览。");
    if (!file.size || file.size > IMAGE_LIMIT) throw new Error("每张图片需大于 0 且不超过 5 MB，请缩小后重试。");
  }
}

export async function readAssistantImage(file) {
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("无法读取图片，请重新选择。"));
    reader.readAsDataURL(file);
  });
  const base64 = data.slice(data.indexOf(",") + 1);
  const mime = imageMime(Uint8Array.from(atob(base64.slice(0, 64)), c => c.charCodeAt(0)));
  if (!mime) throw new Error("图片内容不是支持的格式，请导出为 PNG 或 JPEG 后重试。");
  const data_url = `data:${mime};base64,${base64}`;
  const preview = new Image(); preview.src = data_url;
  try { await preview.decode(); } catch { throw new Error("图片无法解码，请重新导出后再上传。"); }
  if (Math.max(preview.naturalWidth, preview.naturalHeight) > 8192) throw new Error("图片单边最长 8192 像素，请缩小后重试。");
  return {name: file.name.slice(0, 120), data_url};
}
