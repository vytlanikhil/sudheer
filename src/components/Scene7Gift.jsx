import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';
import { Gift, Sparkles, Heart } from 'lucide-react';

export default function Scene7Gift({ onNext }) {
  const [opened, setOpened] = useState(false);

  const handleOpenGift = () => {
    if (opened) return;

    soundEngine.playFanfare();
    setOpened(true);

    // Multi-stage confetti celebration burst
    const end = Date.now() + 3 * 1000;
    const colors = ['#FF7EB6', '#FF4F81', '#B79CFF', '#FFD98A', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-6 z-10 overflow-hidden">
      
      {/* Header Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1.5 mt-4 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink/10 border border-soft-pink/30 text-soft-pink text-[11px] font-medium tracking-widest uppercase">
          <Sparkles className="w-3 h-3 animate-spin" /> Final Surprise
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “Okay… Last surprise.” 🎁
        </h2>
      </motion.div>

      {/* Center Interactive Gift Box / Reveal Display */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col items-center justify-center my-4 z-20">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* Unopened Gift Box */
            <motion.div
              key="box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
              }}
              className="flex flex-col items-center gap-6"
            >
              {/* Animated Gift SVG */}
              <div className="relative w-44 h-44 rounded-3xl glass-panel border-2 border-soft-pink/50 shadow-[0_0_50px_rgba(255,126,182,0.4)] flex items-center justify-center group cursor-pointer active:scale-95 transition-all">
                {/* Ribbon details */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-rose via-soft-pink to-rose shadow-md" />
                <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-rose via-soft-pink to-rose shadow-md" />
                <Gift className="relative z-10 w-20 h-20 text-gold drop-shadow-[0_0_20px_#FFD98A] group-hover:scale-110 transition-transform" />
              </div>

              <button
                onClick={handleOpenGift}
                className="glass-button px-8 py-3.5 rounded-full text-warm-white font-medium text-sm tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_35px_rgba(255,126,182,0.6)]"
              >
                Open it 🎁
              </button>
            </motion.div>
          ) : (
            /* Revealed Birthday Celebration Banner */
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
              className="w-full glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold/60 shadow-[0_0_50px_rgba(255,217,138,0.3)] text-center space-y-4"
            >
              <div className="inline-flex p-3 rounded-full bg-soft-pink/20 border border-soft-pink/40 text-soft-pink">
                <Heart className="w-8 h-8 fill-rose animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-sans tracking-widest uppercase text-lavender/80">
                  Celebrate Today
                </h3>
                <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-gold to-warm-white glow-text-pink leading-tight">
                  HAPPY BIRTHDAY
                </h1>
                <h1 className="text-3xl sm:text-4xl font-cinzel font-black text-gold glow-text-gold tracking-wider">
                  {CONFIG.NAME} ❤️
                </h1>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs sm:text-sm font-serif text-warm-white/90">
                <p className="text-gold font-semibold">“Today is your day.”</p>
                <p>“So smile.”</p>
                <p className="text-soft-pink italic glow-text-pink">
                  “Because somewhere, someone is smiling because of you.”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Scene Button */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        {opened && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={onNext}
            className="glass-button w-full py-3.5 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_30px_rgba(255,126,182,0.6)]"
          >
            Final Message 🌌
          </motion.button>
        )}
      </div>

    </div>
  );
}
