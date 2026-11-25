"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export interface ProjectPhase {
  title: string;
  period: string;
  summary: string;
  points: string[];
}

export interface ProjectDetails {
  role: string;
  period: string;
  overview: string;
  stats: { value: string; label: string }[];
  stack: string[];
  phases: ProjectPhase[];
  principles: { title: string; text: string }[];
}

interface ProjectDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  tags: string;
  details: ProjectDetails;
}

export default function ProjectDrawer({
  open,
  onOpenChange,
  title,
  tags,
  details,
}: ProjectDrawerProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-2000 bg-black/60 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 300 }}
                data-lenis-prevent
                className="fixed right-0 top-0 z-2001 h-dvh w-full sm:max-w-xl lg:max-w-2xl overflow-y-auto overscroll-contain bg-bgElevated border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] focus:outline-none"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 md:px-10 py-6 bg-bgElevated/90 backdrop-blur border-b border-white/10">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-accentViolet">
                      {tags}
                    </p>
                    <DialogPrimitive.Title className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {title}
                    </DialogPrimitive.Title>
                  </div>
                  <DialogPrimitive.Close
                    aria-label="Close details"
                    className="shrink-0 p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accentViolet/20 transition-colors"
                  >
                    <X size={16} />
                  </DialogPrimitive.Close>
                </div>

                <div className="px-6 md:px-10 py-8 space-y-10">
                  {/* Role */}
                  <section className="space-y-3">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-textSecondary">
                      My role
                    </h4>
                    <p className="text-lg font-bold text-white">
                      {details.role}
                      <span className="block text-sm font-normal text-textSecondary mt-1">
                        {details.period}
                      </span>
                    </p>
                    <DialogPrimitive.Description className="text-sm md:text-base text-textSecondary leading-relaxed">
                      {details.overview}
                    </DialogPrimitive.Description>
                  </section>

                  {/* Stats */}
                  <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {details.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <p className="text-2xl font-extrabold text-white">
                          {s.value}
                        </p>
                        <p className="text-xs text-textSecondary mt-1">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </section>

                  {/* Stack */}
                  <section className="flex flex-wrap gap-2">
                    {details.stack.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold text-accentViolet border border-accentViolet/30 bg-accentViolet/10"
                      >
                        {t}
                      </span>
                    ))}
                  </section>

                  {/* Contribution timeline */}
                  <section className="space-y-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-textSecondary">
                      What I delivered
                    </h4>
                    <ol className="space-y-8 border-l border-white/10 pl-6">
                      {details.phases.map((phase, i) => (
                        <li key={phase.title} className="relative space-y-3">
                          <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bgElevated border border-accentViolet">
                            <span className="h-1.5 w-1.5 rounded-full bg-accentViolet" />
                          </span>
                          <p className="text-xs text-accentViolet font-semibold tracking-wider">
                            {String(i + 1).padStart(2, "0")} · {phase.period}
                          </p>
                          <h5 className="text-lg font-bold text-white leading-snug">
                            {phase.title}
                          </h5>
                          <p className="text-sm text-textSecondary leading-relaxed">
                            {phase.summary}
                          </p>
                          <ul className="space-y-2">
                            {phase.points.map((p) => (
                              <li
                                key={p}
                                className="text-sm text-white/80 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accentViolet"
                              >
                                {p}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
              </motion.aside>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
