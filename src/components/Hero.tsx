"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SoundToggle from "./SoundToggle";

export default function Hero() {
  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-36 pb-8 px-6 md:px-16 overflow-hidden bg-bgPrimary"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/4 w-112.5 h-112.5 bg-accentIndigo/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-87.5 h-87.5 bg-accentPink/15 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Floating Illustrations (Top-Left & Bottom-Right) */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 -left-5 md:left-4 w-28 md:w-44 h-28 md:h-44 opacity-80 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient1)"
            strokeWidth="6"
            strokeDasharray="10 15"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B084F5" />
              <stop offset="100%" stopColor="#7B5CFA" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Main Headline Block */}
      <div className="max-w-6xl w-full mx-auto my-auto z-10 font-display">
        <div className="space-y-1 md:space-y-2">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95]"
          >
            Hi, I'm Abibat.
          </motion.h1>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95]"
          >
            I turn ideas into
          </motion.h1>

          <motion.h1
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95]"
          >
            <span className="text-accent-gradient">shipped products.</span>
          </motion.h1>
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 md:mt-12"
        >
          <a
            href="#projects"
            className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase hover-underline-link text-white pb-1"
          >
            VIEW PROJECTS →
          </a>
        </motion.div>
      </div>

      {/* Doodle Floating Bottom-Right */}
      <motion.div className="absolute md:fixed right-6 md:right-10 bottom-[10vh] md:bottom-0 z-20 size-48 md:size-72 opacity-90">
        <Image
          src="/images/doodle.png"
          alt="Creative Doodle"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Bottom Bar: Sound Toggle & Social Links */}
      <div className="max-w-6xl w-full mx-auto flex justify-between items-end z-20 md:pt-8">
        <div className="flex gap-4 sm:gap-6 text-[11px] sm:text-xs tracking-widest text-textSecondary uppercase">
          <a
            href="https://github.com/omotoyosi25"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            👾 GH
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            🐦 TW
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            💼 LD
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            📸 IN
          </a>
        </div>
      </div>
    </section>
  );
}
