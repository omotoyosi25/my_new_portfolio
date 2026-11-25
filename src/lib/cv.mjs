// Shared parser for content/cv.md — used by the /resume page and by
// scripts/build-cv.mjs (which generates public/cv.docx, cv.pdf and cv.md).
// Plain JS so Node can run it directly at build time without a TS loader.
//
// Supported markdown subset:
//   # Name
//   header lines (title, contact) until the first ##
//   ## Section
//   ### Entry left | entry right      (e.g. "Role, Company | Sep 2023 – Present")
//   a plain line straight after ###   -> entry meta (role / stack line)
//   - bullet
//   other text                        -> paragraph (consecutive lines joined)
//   inline: **bold**, [text](url)

/**
 * @typedef {{ text: string, bold?: boolean, href?: string }} Run
 * @typedef {{ type: "para", runs: Run[] }
 *   | { type: "entry", left: Run[], right: Run[] }
 *   | { type: "meta", runs: Run[] }
 *   | { type: "bullet", runs: Run[] }} Block
 * @typedef {{ title: string, blocks: Block[] }} Section
 * @typedef {{ name: string, header: Run[][], sections: Section[] }} Cv
 */

/**
 * @param {string} text
 * @returns {Run[]}
 */
export function parseInline(text) {
  /** @type {Run[]} */
  const runs = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push({ text: text.slice(last, m.index) });
    if (m[1] !== undefined) runs.push({ text: m[1], bold: true });
    else runs.push({ text: m[2], href: m[3] });
    last = re.lastIndex;
  }
  if (last < text.length) runs.push({ text: text.slice(last) });
  return runs;
}

/**
 * @param {Run[]} runs
 * @returns {string}
 */
export function runsToText(runs) {
  return runs.map((r) => r.text).join("");
}

/**
 * @param {string} md
 * @returns {Cv}
 */
export function parseCv(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  /** @type {Cv} */
  const cv = { name: "", header: [], sections: [] };
  /** @type {Section | null} */
  let section = null;
  /** @type {string[]} */
  let para = [];
  let afterEntry = false;

  const flushPara = () => {
    if (para.length && section) {
      section.blocks.push({ type: "para", runs: parseInline(para.join(" ")) });
    }
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushPara();
      continue;
    }
    if (line.startsWith("# ")) {
      cv.name = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      section = { title: line.slice(3).trim(), blocks: [] };
      cv.sections.push(section);
      afterEntry = false;
      continue;
    }
    if (!section) {
      cv.header.push(parseInline(line));
      continue;
    }
    if (line.startsWith("### ")) {
      flushPara();
      const body = line.slice(4).trim();
      const split = body.indexOf(" | ");
      const left = split === -1 ? body : body.slice(0, split);
      const right = split === -1 ? "" : body.slice(split + 3);
      section.blocks.push({
        type: "entry",
        left: parseInline(left),
        right: parseInline(right),
      });
      afterEntry = true;
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      section.blocks.push({ type: "bullet", runs: parseInline(line.slice(2)) });
      afterEntry = false;
      continue;
    }
    if (afterEntry && para.length === 0) {
      section.blocks.push({ type: "meta", runs: parseInline(line) });
      afterEntry = false;
      continue;
    }
    para.push(line);
  }
  flushPara();
  return cv;
}
