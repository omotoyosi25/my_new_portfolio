"use client";

import { motion } from "framer-motion";
import { Music, Globe, Sparkles } from "lucide-react";

export default function Testimonials() {
  const interests = [
    {
      title: "Language & Culture",
      icon: <Globe className="w-8 h-8 text-accentViolet opacity-80" />,
      description:
        "I'm currently learning Spanish because apparently, one language just wasn't enough. I love diving into different cultures and expanding how I communicate.",
    },
    {
      title: "Music Aficionado",
      icon: <Music className="w-8 h-8 text-accentViolet opacity-80" />,
      description:
        "I rarely miss a BNXN, Asake, Fola, or Olamide drop. Good music is the fuel behind my best coding sessions and late-night builds.",
    },
    {
      title: "Fashion & Aesthetics",
      icon: <Sparkles className="w-8 h-8 text-accentViolet opacity-80" />,
      description:
        "I have an obsession with fashion. For me, styling an outfit is just like designing a UI — it's all about proportion, color palettes, and breaking the template.",
    },
  ];

  return (
    <section
      id="beyond-code"
      className="py-24 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/5 space-y-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Beyond the Code 🌍
        </h2>
        <p className="text-sm md:text-base text-textSecondary">
          A little about who I am when I'm not pushing pixels.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interests.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-8 rounded-2xl bg-bgElevated border border-white/10 flex flex-col space-y-6 hover:border-accentViolet/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            {item.icon}

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
