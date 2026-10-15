export function decodePreviewBundle(buffer) {
  if (buffer.byteLength < 4) throw new Error("模型资源包不完整，请重新加载。");
  const headerLength = new DataView(buffer).getUint32(0, true);
  let offset = 4 + headerLength;
  if (offset > buffer.byteLength) throw new Error("模型资源包头部不完整。");
  const header = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 4, headerLength)));
  const assets = {};
  for (const entry of header.assets) {
    if (!Number.isSafeInteger(entry.bytes) || entry.bytes < 0 || offset + entry.bytes > buffer.byteLength) throw new Error("模型配套文件传输不完整。");
    assets[entry.name] = new Uint8Array(buffer, offset, entry.bytes);
    offset += entry.bytes;
  }
  if (offset !== buffer.byteLength) throw new Error("模型资源包长度不匹配。");
  return { xml: header.xml, name: header.name, joint_limits: header.joint_limits, assets };
}
