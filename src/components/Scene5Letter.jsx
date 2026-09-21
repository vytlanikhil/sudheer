import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import { Heart, Sparkles } from 'lucide-react';

export default function Scene5Letter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      soundEngine.playPaper();
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-8 px-4 z-10 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1.5 mt-2 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink/10 border border-soft-pink/30 text-soft-pink text-[11px] font-medium tracking-widest uppercase">
          <Sparkles className="w-3 h-3 animate-spin" /> Step 5: Love Letter
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “A Message From My Heart” 💌
        </h2>
        {!isOpen && (
          <p className="text-xs text-lavender/80 font-sans">
            Tap the wax seal to open the letter
          </p>
        )}
      </motion.div>

      {/* Main Interactive Envelope & Letter View */}
      <div className="relative w-full max-w-sm flex-1 flex items-center justify-center my-4 z-20">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope */
            <motion.div
              key="envelope"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
              }}
              onClick={handleOpenLetter}
              className="relative w-full aspect-[4/3] glass-panel rounded-3xl p-6 border-2 border-soft-pink/40 shadow-[0_0_40px_rgba(255,126,182,0.3)] cursor-pointer group flex flex-col items-center justify-center active:scale-95 transition-all"
            >
              {/* Envelope Flap background styling */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-950/40 via-purple-950/60 to-slate-900/80 rounded-3xl" />
              
              {/* Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-500 to-pink-400 border-2 border-gold shadow-[0_0_25px_#FF4F81] flex flex-col items-center justify-center text-warm-white group-hover:shadow-[0_0_35px_#FF7EB6]"
              >
                <span className="font-cinzel font-bold text-lg text-gold drop-shadow-md">
                  K ❤️
                </span>
                <span className="text-[9px] uppercase tracking-tighter text-amber-200">
                  SEALED
                </span>
              </motion.div>

              <span className="relative z-10 text-xs font-serif text-warm-white/80 mt-4 group-hover:text-soft-pink transition-colors">
                Tap to break wax seal
              </span>
            </motion.div>
          ) : (
            /* Open Letter Parchment View */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full h-[68vh] glass-panel rounded-3xl p-6 border border-soft-pink/50 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#151226] via-[#100E20] to-[#0A0818]"
            >
              {/* Top parchment header decoration */}
              <div className="flex items-center justify-between border-b border-soft-pink/20 pb-3 mb-2">
                <span className="text-xs font-cinzel text-gold font-semibold tracking-wider">
                  For Karthivani
                </span>
                <Heart className="w-4 h-4 text-rose fill-rose animate-pulse" />
              </div>

              {/* Scrollable Letter Content with handwritten font */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-handwriting text-lg sm:text-xl text-warm-white/95 leading-relaxed">
                {CONFIG.BIRTHDAY_MESSAGE.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 + 0.3 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Bottom footer note */}
              <div className="pt-3 border-t border-soft-pink/20 text-center">
                <p className="text-xs font-serif text-gold glow-text-gold">
                  “And that's still not everything…”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action button once letter is open */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={onNext}
            className="glass-button w-full py-3.5 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_30px_rgba(255,126,182,0.6)]"
          >
            Look at the Stars 🌌
          </motion.button>
        )}
      </div>

    </div>
  );
}
