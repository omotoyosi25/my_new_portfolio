"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  tags: string;
  link: string;
  githubLink?: string;
  image: string;
  description: string;
  index: number;
}

export default function ProjectCard({
  title,
  tags,
  link,
  githubLink = "https://github.com/omotoyosi25",
  image,
  description,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-bgElevated border border-white/10 p-6 md:p-10 overflow-hidden flex flex-col lg:flex-row gap-8 items-center hover:border-accentViolet/40 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accentIndigo/10 rounded-full blur-[80px] group-hover:bg-accentViolet/20 transition-all pointer-events-none" />

      {/* Visual Image Mockup */}
      <div className="w-full lg:w-1/2 aspect-16/10 relative rounded-2xl overflow-hidden bg-bgPrimary">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bgElevated/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Project Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accentViolet">
            {tags}
          </p>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-sm md:text-base text-textSecondary leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-white  gap-2"
          >
            VISIT THE WEBSITE{" "}
            <ExternalLink
              size={14}
              className="text-accentViolet flex items-center gap-2"
            />
          </a>

          <div className="flex gap-3">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-accentViolet/20 text-white transition-colors border border-white/10"
              aria-label="GitHub Repository"
            >
              <svg
                className="w-4 h-4 fill-current text-white"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
