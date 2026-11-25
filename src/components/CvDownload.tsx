"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, FileText } from "lucide-react";
import { cn } from "@/utils/classNames";

export const CV_FILES = [
  {
    href: "/cv.docx",
    download: "Abibat-Abdulraheem-CV.docx",
    label: "Word (.docx)",
    hint: "Best for job applications",
  },
  {
    href: "/cv.pdf",
    download: "Abibat-Abdulraheem-CV.pdf",
    label: "PDF (.pdf)",
    hint: "Best for sharing",
  },
  {
    href: "/cv.md",
    download: "Abibat-Abdulraheem-CV.md",
    label: "Plain text (.md)",
    hint: "Copy-paste friendly",
  },
] as const;

interface CvDownloadProps {
  className?: string;
  /** Which side the menu lines up with. */
  align?: "left" | "right";
  /** Show a "View online" link to /resume in the menu. */
  showViewLink?: boolean;
}

export default function CvDownload({
  className,
  align = "left",
  showViewLink = true,
}: CvDownloadProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accentViolet/15 hover:bg-accentViolet/30 border border-accentViolet/40 text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors"
      >
        <Download size={14} className="text-accentViolet" />
        Download CV
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full mt-2 z-30 w-64 rounded-2xl bg-bgElevated border border-white/10 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            {CV_FILES.map((f) => (
              <a
                key={f.href}
                role="menuitem"
                href={f.href}
                download={f.download}
                onClick={() => setOpen(false)}
                className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-semibold text-white">
                  {f.label}
                </span>
                <span className="text-xs text-textSecondary">{f.hint}</span>
              </a>
            ))}
            {showViewLink && (
              <div className="mt-1 pt-1 border-t border-white/10">
                <Link
                  role="menuitem"
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-accentViolet hover:bg-white/5 transition-colors"
                >
                  <FileText size={14} /> View online
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
