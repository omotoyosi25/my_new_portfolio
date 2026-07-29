"use client";

import { motion } from "framer-motion";

interface RotatingBadgeProps {
  text?: string;
  className?: string;
}

export default function RotatingBadge({
  text = "ABIBAT • FRONTEND DEVELOPER • ",
  className = "",
}: RotatingBadgeProps) {
  return (
    <motion.div
      className={`relative w-25 h-25 flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <path
          id="textPath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[9.5px] font-semibold tracking-[0.18em] fill-textSecondary uppercase">
          <textPath href="#textPath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center dot */}
      <div className="absolute w-2.5 h-2.5 rounded-full bg-accentViolet shadow-[0_0_10px_#B084F5]" />
    </motion.div>
  );
}
