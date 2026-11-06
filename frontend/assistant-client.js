import {CONVERSATION_IMAGE_LIMIT, CONVERSATION_BYTE_LIMIT} from "./assistant-images.js";

export function usageText(usage) {
  if (!usage?.total_tokens) return "";
  const cost = usage.estimated_cost_cny;
  const amount = cost !== null && cost !== undefined && cost !== "" ? Number(cost) : NaN;
  const fee = Number.isFinite(amount) && amount >= 0
    ? amount > 0 && amount < .000001 ? "估算费用不足 0.000001 元" : `估算费用 ${amount.toFixed(6)} 元`
    : "估算费用暂不可用";
  return `本次消耗 ${usage.total_tokens.toLocaleString()} tokens · ${fee}`;
}

// Transport helpers are independent of the DOM so stream failures are testable.
export async function readAssistantStream(response, onDelta, onEvent = () => {}) {
  if (!response.body) throw new Error("浏览器无法读取流式回答，请更换浏览器后重试。");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "", done = false, usage = null;
  let batchStarted = performance.now(), consumed = 0;
  function consume(line) {
    if (!line.trim()) return;
    const item = JSON.parse(line);
    if (item.type === "error") throw new Error(item.message);
    if (item.type === "delta") onDelta(item.content);
    if (item.type === "done") { done = true; usage = item.usage; }
    if (!["delta", "done", "error"].includes(item.type)) onEvent(item);
  }
  try {
    while (true) {
      const item = await reader.read();
      buffer += decoder.decode(item.value, {stream: !item.done});
      let newline, offset = 0;
      while ((newline = buffer.indexOf("\n", offset)) >= 0) {
        consume(buffer.slice(offset, newline)); offset = newline + 1;
        // A buffered response can contain thousands of tokens. Give rendering
        // and the Stop button a turn even when reader.read() resolves at once.
        if (++consumed % 128 === 0 && performance.now() - batchStarted >= 8) {
          await new Promise(resolve => setTimeout(resolve, 0));
          batchStarted = performance.now();
        }
      }
      buffer = buffer.slice(offset);
      if (item.done) break;
    }
    if (buffer.trim()) consume(buffer);
    if (!done) throw new Error("连接提前结束，回答不完整，请重试。");
    return usage;
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function prepareAssistantContext(history, draft, errors = []) {
  const messages = history.filter(message => !message.incomplete).map(({role, content, images}) => ({role, content,
    ...(images?.length ? {images: images.map(({name, data_url}) => ({name, data_url}))} : {})}));
  const context = draft ? "当前任务文件（是否已保存以对话中的程序结果为准）：\n" + JSON.stringify(draft) +
    (errors.length ? "\n上次程序报告的问题：\n" + errors.join("\n") : "") : "";
  if (context && messages.length) {
    messages[messages.length - 1].content = context + "\n\n学生消息：\n" + messages.at(-1).content;
  }
  if (messages.at(-1)?.content.length > 100000) {
    throw new Error("单次消息或当前任务文件过长，请缩小任务规模或分段描述。");
  }
  function tooLarge() {
    const images = messages.flatMap(m => m.images || []);
    const imageBytes = images.reduce((total, image) => {
      const base64 = image.data_url.slice(image.data_url.indexOf(",") + 1);
      return total + base64.length * .75 - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
    }, 0);
    return messages.length > 200 || messages.some(m => m.content.length > 100000) ||
      messages.reduce((total, m) => total + m.content.length, 0) > 148000 ||
      images.length > CONVERSATION_IMAGE_LIMIT || imageBytes > CONVERSATION_BYTE_LIMIT;
  }
  let omitted = 0;
  while (tooLarge() && messages.length > 1) {
    messages.shift(); omitted++;
    while (messages.length > 1 && messages[0].role === "assistant") { messages.shift(); omitted++; }
  }
  if (tooLarge()) throw new Error("当前消息或图片过大，请缩小后再发送。");
  if (omitted && messages[0].content.length < 99500) messages[0].content = `[较早的 ${omitted} 条消息未随本次请求发送，如缺少建模条件请向学生询问。]\n` + messages[0].content;
  return {messages, omitted};
}
