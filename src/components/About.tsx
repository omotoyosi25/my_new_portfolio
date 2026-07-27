"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-36 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/5"
    >
      {/* Intro Bio Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="space-y-6 max-w-4xl"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-accentViolet font-semibold">
          Hello stranger! 👋
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
          I am Abibat, based in Lagos, Nigeria. I enjoy the process of turning
          ideas into functional, beautifully designed web applications.
        </h2>

        <p className="text-base md:text-lg text-textSecondary leading-relaxed">
          For the past 2+ years I've been building with React, Next.js, and
          Tailwind, shipping products for fintech and lending platforms that
          real people trust with their money and their future, proof of funds
          facilities moving billions of naira, device-security dashboards
          protecting lenders' portfolios, health insurance platforms serving
          families and businesses etc.
        </p>
      </motion.div>

      {/* Section Header for upcoming projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-32 space-y-2"
      >
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Selected Projects 💻
        </h3>
        <p className="text-sm md:text-base text-textSecondary">
          Each project is unique. Here are some of my works.
        </p>
      </motion.div>
    </section>
  );
}
