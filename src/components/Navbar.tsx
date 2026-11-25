"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CV_FILES } from "./CvDownload";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // "/#..." so the links also work from other pages such as /resume.
  const menuItems = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Floating Pill Navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-1050 w-[90%] sm:w-[75%] md:w-[65%] max-w-225">
        <div className="flex items-center justify-between px-6 py-3.5 rounded-full bg-bgElevated/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Logo Mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white hidden sm:inline-block">
              ABIBAT
            </span>
          </Link>

          {/* Menu Trigger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 group text-textSecondary hover:text-white transition-colors"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.15em] w-12 text-right">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="relative w-5 h-2.5">
              <span
                className={`absolute right-0 h-0.5 bg-white group-hover:bg-accentViolet transition-all duration-300 ease-in-out ${isMenuOpen ? "w-5 rotate-45 top-1" : "w-5 top-0"}`}
              />
              <span
                className={`absolute right-0 h-0.5 bg-white group-hover:bg-accentViolet transition-all duration-300 ease-in-out ${isMenuOpen ? "w-0 opacity-0 top-1" : "w-3.5 top-1/2 -translate-y-1/2"}`}
              />
              <span
                className={`absolute right-0 h-0.5 bg-white group-hover:bg-accentViolet transition-all duration-300 ease-in-out ${isMenuOpen ? "w-5 -rotate-45 top-1" : "w-5 bottom-0"}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as const }}
            className="fixed inset-0 z-1000 bg-bgPrimary flex flex-col justify-between p-8 md:p-16"
          >
            {/* Menu Links */}
            <div className="max-w-6xl mx-auto w-full my-auto py-12">
              <ul className="space-y-4 md:space-y-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight hover:text-accent-gradient transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom Footer Info inside Menu */}
            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between border-t border-white/10 pt-6 gap-4 text-xs text-textSecondary">
              <div>
                <p className="uppercase tracking-widest text-white mb-1">
                  Socials
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/omotoyosi25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accentViolet"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accentViolet"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accentViolet"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div>
                <p className="uppercase tracking-widest text-white mb-1">
                  Download CV
                </p>
                <div className="flex gap-4">
                  {CV_FILES.map((f) => (
                    <a
                      key={f.href}
                      href={f.href}
                      download={f.download}
                      className="hover:text-accentViolet"
                    >
                      {f.href.replace("/", "")}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase tracking-widest text-white mb-1">
                  Contact
                </p>
                <p>omotoyosiade25@gmail.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
