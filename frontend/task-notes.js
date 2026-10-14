import { Marked } from "marked";
import DOMPurify from "dompurify";
import katex from "katex";
import "katex/dist/katex.min.css";

const mathOptions = {throwOnError:false, trust:false, strict:"ignore", maxExpand:1000};
const markdown = new Marked({gfm:true});
markdown.use({extensions:[
  {
    name:"displayMath", level:"block",
    start(source) { return source.search(/\$\$|\\\[/); },
    tokenizer(source) {
      const match = /^(?:\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\])(?:[ \t]*(?:\n|$))/.exec(source);
      if (match) return {type:"displayMath", raw:match[0], text:(match[1] || match[2]).trim()};
    },
    renderer(token) { return katex.renderToString(token.text, {...mathOptions,displayMode:true}); },
  },
  {
    name:"inlineMath", level:"inline",
    start(source) { return source.search(/\$(?!\$)|\\\(/); },
    tokenizer(source) {
      const match = /^(?:\$(?!\$)((?:\\.|[^$\n])+?)\$(?!\$)|\\\(([\s\S]+?)\\\))/.exec(source);
      if (match) return {type:"inlineMath", raw:match[0], text:(match[1] || match[2]).trim()};
    },
    renderer(token) { return katex.renderToString(token.text, mathOptions); },
  },
]});

export function renderTaskNotes(container, source) {
  const fragment = DOMPurify.sanitize(markdown.parse(String(source || "")), {
    RETURN_DOM_FRAGMENT:true,
    FORBID_TAGS:["iframe","form","input","button","style","img"],
  });
  // Formula-only code blocks/spans also occur in AI-written learning notes.
  // Keep actual code and observation identifiers in their normal code style.
  for (const code of fragment.querySelectorAll("code")) {
    const formulaBlock = code.parentElement?.tagName === "PRE" && /language-(?:math|latex|tex)\b/.test(code.className);
    const formulaInline = code.parentElement?.tagName !== "PRE" && /\\(?:frac|sqrt|omega|theta|alpha|beta|dot|vec|sin|cos)\b/.test(code.textContent);
    if (!formulaBlock && !formulaInline) continue;
    const formula = document.createElement(formulaBlock ? "div" : "span");
    formula.innerHTML = DOMPurify.sanitize(katex.renderToString(code.textContent, {...mathOptions,displayMode:formulaBlock}));
    (formulaBlock ? code.parentElement : code).replaceWith(formula);
  }
  for (const link of fragment.querySelectorAll("a")) {
    link.target="_blank";
    link.rel="noopener noreferrer";
  }
  container.replaceChildren(fragment);
}
