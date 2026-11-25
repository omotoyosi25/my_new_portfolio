import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { parseCv } from "@/lib/cv.mjs";
import CvDownload from "@/components/CvDownload";

type Run = { text: string; bold?: boolean; href?: string };

export const metadata: Metadata = {
  title: "Resume | Abibat Abdulraheem",
  description:
    "Resume of Abibat Abdulraheem, Frontend Engineer working with React, Next.js and TypeScript.",
  alternates: { canonical: "/resume" },
};

function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) =>
        r.href ? (
          <a
            key={i}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accentViolet underline underline-offset-2 decoration-accentViolet/40 hover:decoration-accentViolet"
          >
            {r.text}
          </a>
        ) : r.bold ? (
          <strong key={i} className="font-semibold text-white">
            {r.text}
          </strong>
        ) : (
          <span key={i}>{r.text}</span>
        ),
      )}
    </>
  );
}

export default function ResumePage() {
  // content/cv.md is the single source for this page and the downloadable files.
  const cv = parseCv(readFileSync(join(process.cwd(), "content", "cv.md"), "utf8"));
  const [title, ...contact] = cv.header;

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-16">
      <article className="max-w-3xl mx-auto">
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {cv.name}
              </h1>
              {title && (
                <p className="text-base md:text-lg font-semibold text-accentViolet">
                  <Runs runs={title} />
                </p>
              )}
            </div>
            <CvDownload align="right" showViewLink={false} className="shrink-0" />
          </div>
          <div className="space-y-1 text-sm text-textSecondary break-words">
            {contact.map((runs, i) => (
              <p key={i}>
                <Runs runs={runs} />
              </p>
            ))}
          </div>
        </header>

        {cv.sections.map((section) => (
          <section key={section.title} className="pt-10 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-textSecondary">
              {section.title}
            </h2>
            <SectionBody blocks={section.blocks} />
          </section>
        ))}
      </article>
    </div>
  );
}

type Block = ReturnType<typeof parseCv>["sections"][number]["blocks"][number];

function SectionBody({ blocks }: { blocks: Block[] }) {
  // Group consecutive bullets into a single <ul> for valid, readable markup.
  const out: React.ReactNode[] = [];
  let bullets: Run[][] = [];
  const flush = (key: number) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul-${key}`} className="space-y-2">
        {bullets.map((runs, i) => (
          <li
            key={i}
            className="relative pl-5 text-sm md:text-[15px] text-white/80 leading-relaxed before:content-[''] before:absolute before:left-1 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accentViolet"
          >
            <Runs runs={runs} />
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  blocks.forEach((b, i) => {
    if (b.type === "bullet") {
      bullets.push(b.runs);
      return;
    }
    flush(i);
    if (b.type === "para") {
      out.push(
        <p key={i} className="text-base text-white/85 leading-relaxed">
          <Runs runs={b.runs} />
        </p>,
      );
    } else if (b.type === "entry") {
      out.push(
        <div
          key={i}
          className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-1 pt-3 first:pt-0"
        >
          <h3 className="text-lg font-bold text-white">
            <Runs runs={b.left} />
          </h3>
          {b.right.length > 0 && (
            <p className="text-sm text-textSecondary shrink-0">
              <Runs runs={b.right} />
            </p>
          )}
        </div>,
      );
    } else if (b.type === "meta") {
      out.push(
        <p key={i} className="-mt-2 text-sm italic text-textSecondary">
          <Runs runs={b.runs} />
        </p>,
      );
    }
  });
  flush(blocks.length);
  return <>{out}</>;
}
