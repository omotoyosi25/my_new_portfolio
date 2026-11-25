// Generates public/cv.docx, public/cv.pdf and public/cv.md from content/cv.md.
// Runs automatically before `npm run dev` and `npm run build` (see package.json),
// or manually with `npm run cv`.

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  TextRun,
} from "docx";
import PDFDocument from "pdfkit";
import { parseCv, runsToText } from "../src/lib/cv.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "content", "cv.md");
const out = join(root, "public");
mkdirSync(out, { recursive: true });

const md = readFileSync(src, "utf8");
const cv = parseCv(md);

/* ------------------------------------------------------------------ DOCX */

const FONT = "Calibri";
const LINK = "1F4E79";
// A4, 0.6" margins
const PAGE_W = 11906;
const MARGIN = 864;
const TEXT_W = PAGE_W - MARGIN * 2;

/** @param {import("../src/lib/cv.mjs").Run[]} runs @param {object} [base] */
function docxRuns(runs, base = {}) {
  return runs.map((r) => {
    if (r.href) {
      return new ExternalHyperlink({
        link: r.href,
        children: [
          new TextRun({ text: r.text, color: LINK, underline: {}, ...base }),
        ],
      });
    }
    return new TextRun({ text: r.text, bold: r.bold, ...base });
  });
}

function buildDocx() {
  /** @type {Paragraph[]} */
  const children = [];

  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: cv.name, bold: true, size: 40 })],
    }),
  );
  cv.header.forEach((runs, i) => {
    children.push(
      new Paragraph({
        spacing: { after: 20 },
        children: docxRuns(runs, i === 0 ? { bold: true, size: 23 } : {}),
      }),
    );
  });

  for (const section of cv.sections) {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "808080", space: 1 },
        },
        children: [
          new TextRun({ text: section.title.toUpperCase(), bold: true, size: 23 }),
        ],
      }),
    );

    for (const block of section.blocks) {
      if (block.type === "para") {
        children.push(
          new Paragraph({ spacing: { after: 60 }, children: docxRuns(block.runs) }),
        );
      } else if (block.type === "entry") {
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 20 },
            tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }],
            children: [
              ...docxRuns(block.left, { bold: true }),
              ...(block.right.length
                ? [new TextRun({ children: [new Tab()] }), ...docxRuns(block.right)]
                : []),
            ],
          }),
        );
      } else if (block.type === "meta") {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: docxRuns(block.runs, { italics: true }),
          }),
        );
      } else if (block.type === "bullet") {
        children.push(
          new Paragraph({
            numbering: { reference: "bullets", level: 0 },
            spacing: { after: 40 },
            children: docxRuns(block.runs),
          }),
        );
      }
    }
  }

  return new Document({
    creator: cv.name,
    title: `${cv.name} – CV`,
    styles: {
      default: { document: { run: { font: FONT, size: 21 } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 360, hanging: 240 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE_W, height: 16838 },
            margin: { top: 720, bottom: 720, left: MARGIN, right: MARGIN },
          },
        },
        children,
      },
    ],
  });
}

/* ------------------------------------------------------------------- PDF */

function buildPdf() {
  return new Promise((resolve, reject) => {
    const M = 40;
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 36, bottom: 36, left: M, right: M },
      bufferPages: true,
      info: { Title: `${cv.name} – CV`, Author: cv.name },
    });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("error", reject);
    doc.on("end", () =>
      resolve({ buffer: Buffer.concat(chunks), pages: pageCount }),
    );

    const W = doc.page.width - M * 2;
    const BODY = 9.5;
    const GAP = 1.6;
    const TEXT = "#1a1a1a";
    const LINKC = "#1F4E79";
    let pageCount = 1;
    doc.on("pageAdded", () => pageCount++);

    /** @param {import("../src/lib/cv.mjs").Run[]} runs */
    const write = (runs, x, y, width, { size = BODY, italic = false, bold = false } = {}) => {
      runs.forEach((r, i) => {
        const font =
          r.bold || bold ? "Helvetica-Bold" : italic ? "Helvetica-Oblique" : "Helvetica";
        doc.font(font).fontSize(size).fillColor(r.href ? LINKC : TEXT);
        const opts = {
          continued: i < runs.length - 1,
          link: r.href || undefined,
          underline: !!r.href,
          width,
          lineGap: GAP,
        };
        if (i === 0) doc.text(r.text, x, y, opts);
        else doc.text(r.text, opts);
      });
      doc.x = M;
    };

    doc.font("Helvetica-Bold").fontSize(20).fillColor(TEXT).text(cv.name, M, 36);
    doc.y += 2;
    cv.header.forEach((runs, i) => {
      write(runs, M, doc.y, W, i === 0 ? { size: 11, bold: true } : { size: 9 });
      doc.y += 1;
    });

    // Start a new page if fewer than `h` points remain, so headings and
    // entry lines are never split from what follows them.
    const ensure = (h) => {
      if (doc.y + h > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        doc.y = doc.page.margins.top;
      }
    };

    for (const section of cv.sections) {
      ensure(60);
      doc.y += 8;
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(TEXT)
        .text(section.title.toUpperCase(), M, doc.y, { characterSpacing: 0.6 });
      const ly = doc.y + 1;
      doc.moveTo(M, ly).lineTo(M + W, ly).lineWidth(0.6).strokeColor("#808080").stroke();
      doc.y = ly + 4;

      for (const block of section.blocks) {
        if (block.type === "para") {
          write(block.runs, M, doc.y, W);
          doc.y += 2;
        } else if (block.type === "entry") {
          ensure(24);
          doc.y += 3;
          const y = doc.y;
          if (block.right.length) {
            const href = block.right.find((r) => r.href)?.href;
            doc.font("Helvetica").fontSize(BODY).fillColor(href ? LINKC : TEXT)
              .text(runsToText(block.right), M, y, {
                width: W, align: "right", link: href, underline: !!href,
              });
          }
          write(block.left, M, y, W * 0.7, { bold: true, size: 10 });
          doc.y += 1;
        } else if (block.type === "meta") {
          write(block.runs, M, doc.y, W, { italic: true, size: 9 });
          doc.y += 1;
        } else if (block.type === "bullet") {
          const y = doc.y;
          doc.font("Helvetica").fontSize(BODY).fillColor(TEXT).text("•", M + 3, y);
          write(block.runs, M + 13, y, W - 13);
          doc.y += 1.5;
        }
      }
    }

    doc.end();
  });
}

/* ------------------------------------------------------------------ main */

const docxBuffer = await Packer.toBuffer(buildDocx());
writeFileSync(join(out, "cv.docx"), docxBuffer);

const pdf = await buildPdf();
writeFileSync(join(out, "cv.pdf"), pdf.buffer);

copyFileSync(src, join(out, "cv.md"));

console.log(
  `CV built from content/cv.md -> public/cv.docx, public/cv.pdf (${pdf.pages} page${pdf.pages > 1 ? "s" : ""}), public/cv.md`,
);
