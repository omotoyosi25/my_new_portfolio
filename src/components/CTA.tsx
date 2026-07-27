"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="space-y-6 max-w-3xl"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Convinced? 🤙
        </h2>

        <p className="text-xl md:text-2xl text-textSecondary leading-relaxed font-medium">
          I'm currently open for full-time frontend roles, freelance projects,
          and design collaborations. If you've got something ambitious in mind,
          let's talk. <br />
          <br />
          <a
            href="mailto:omotoyosiade25@gmail.com"
            className="text-accent-gradient hover-underline-link font-bold text-white inline-block"
          >
            email 📧
          </a>
        </p>
      </motion.div>
    </section>
  );
}
