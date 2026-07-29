"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sound/ambient.mp3");
      audioRef.current.loop = true;
    }

    if (isMuted) {
      audioRef.current.play().catch(() => {
        // Handle autoplay policy restriction if user hasn't interacted
      });
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-bgElevated/90 border border-white/10 hover:border-accentViolet/50 backdrop-blur-md text-xs font-semibold text-textSecondary hover:text-white transition-all shadow-[0_0_15px_rgba(123,92,250,0.15)] group"
      aria-label="Toggle Ambient Sound"
    >
      <span className="w-2 h-2 rounded-full bg-accentViolet animate-pulse" />
      <span className="uppercase tracking-widest text-[11px]">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-textSecondary group-hover:text-accentViolet" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-accentViolet" />
      )}
    </button>
  );
}
