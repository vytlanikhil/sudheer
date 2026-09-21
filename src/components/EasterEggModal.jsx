import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import { Moon, Heart, Sparkles } from 'lucide-react';

export default function EasterEggModal({ onClose }) {
  React.useEffect(() => {
    soundEngine.playFanfare();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="relative max-w-sm w-full glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold/70 shadow-[0_0_60px_rgba(255,217,138,0.4)] flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold shadow-[0_0_20px_#FFD98A]">
          <Moon className="w-8 h-8 fill-gold" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-sans tracking-widest text-gold uppercase flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Secret Unlocked
          </span>
          <h3 className="text-xl font-cinzel font-bold text-warm-white">
            {CONFIG.EASTER_EGG.TITLE}
          </h3>
          <p className="text-xs font-sans text-lavender/80 italic">
            {CONFIG.EASTER_EGG.SUBTITLE}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 my-2">
          <p className="text-sm sm:text-base font-serif italic text-soft-pink glow-text-pink leading-relaxed">
            “{CONFIG.EASTER_EGG.MESSAGE}”
          </p>
        </div>

        <button
          onClick={onClose}
          className="glass-button w-full py-3 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_25px_rgba(255,126,182,0.5)] mt-2"
        >
          Return to Universe 🌌
        </button>
      </motion.div>
    </motion.div>
  );
}
