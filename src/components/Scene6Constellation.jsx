import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';

export default function Scene6Constellation({ onNext }) {
  const [phase, setPhase] = useState(0); // 0: random stars, 1: connecting heart, 2: text reveal

  useEffect(() => {
    soundEngine.playChime(659.25);
    const timer1 = setTimeout(() => setPhase(1), 1200);
    const timer2 = setTimeout(() => {
      setPhase(2);
      soundEngine.playChime(880);
    }, 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-6 z-10 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-4 z-20"
      >
        <span className="text-xs text-lavender/70 font-sans tracking-widest uppercase">
          Constellation of Fate
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “Written in the Stars” ✨
        </h2>
      </motion.div>

      {/* Center Interactive SVG Constellation Canvas */}
      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center my-auto z-20">
        <svg className="w-full h-full text-rose" viewBox="0 0 300 300">
          <defs>
            <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Random floating outer star points */}
          {[[40, 50], [260, 40], [30, 240], [270, 250], [150, 20], [20, 150], [280, 150]].map(([cx, cy], idx) => (
            <motion.circle
              key={idx}
              cx={cx}
              cy={cy}
              r={Math.random() * 2 + 1.5}
              fill="#FFF8FC"
              opacity={0.6}
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 + idx * 0.4 }}
            />
          ))}

          {/* Heart Constellation Star Nodes */}
          {[
            [150, 70], [210, 40], [260, 85], [240, 150], [150, 245],
            [60, 150], [40, 85], [90, 40]
          ].map(([cx, cy], idx) => (
            <g key={`node-${idx}`}>
              <motion.circle
                cx={cx}
                cy={cy}
                r="4"
                fill="#FFD98A"
                filter="url(#heartGlow)"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.15 }}
              />
              <circle cx={cx} cy={cy} r="1.5" fill="#FFFFFF" />
            </g>
          ))}

          {/* Glowing Animated Heart Path */}
          {phase >= 1 && (
            <motion.path
              d="M 150 70 Q 210 10 260 85 C 260 170 150 245 150 245 C 150 245 40 170 40 85 Q 90 10 150 70 Z"
              fill="rgba(255, 126, 182, 0.08)"
              stroke="#FF7EB6"
              strokeWidth="2.5"
              strokeDasharray="800"
              initial={{ strokeDashoffset: 800 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              filter="url(#heartGlow)"
            />
          )}
        </svg>

        {/* Center Initials Inside Heart */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none"
            >
              <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-gold to-warm-white glow-text-pink mb-1">
                {CONFIG.INITIALS}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtitle & Continue Button */}
      <div className="w-full max-w-xs space-y-3 text-center z-20 min-h-[90px] flex flex-col items-center justify-end">
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 w-full"
          >
            <div className="space-y-0.5 text-xs sm:text-sm font-serif text-warm-white/90">
              <p>“Two people.”</p>
              <p className="text-soft-pink font-semibold glow-text-pink">
                “One beautiful story.”
              </p>
            </div>

            <button
              onClick={onNext}
              className="glass-button w-full py-3.5 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_30px_rgba(255,126,182,0.6)]"
            >
              Open Final Gift 🎁
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
