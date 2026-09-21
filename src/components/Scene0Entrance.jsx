import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';

export default function Scene0Entrance({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 2400);
    const timer3 = setTimeout(() => setStep(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    soundEngine.playChime(659.25);
    onNext();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center z-10 overflow-hidden">
      
      {/* Floating Big Teddy Icon */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="text-7xl mb-6 drop-shadow-[0_12px_24px_rgba(236,72,153,0.35)]"
      >
        🧸
      </motion.div>

      {/* Sequence Container Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm card-romantic rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="line1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-lg sm:text-xl font-outfit font-semibold text-charcoal leading-relaxed"
            >
              “{CONFIG.GREETINGS.ENTRANCE_LINE1}”
            </motion.p>
          )}

          {step === 2 && (
            <motion.h1
              key="line2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose leading-snug"
            >
              {CONFIG.GREETINGS.ENTRANCE_LINE2}
            </motion.h1>
          )}

          {step >= 3 && (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose leading-snug">
                {CONFIG.GREETINGS.ENTRANCE_LINE2}
              </h1>

              <button
                onClick={handleEnter}
                className="btn-pink-primary w-full py-4 rounded-full font-fredoka text-base tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95"
              >
                {CONFIG.GREETINGS.BUTTON}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
