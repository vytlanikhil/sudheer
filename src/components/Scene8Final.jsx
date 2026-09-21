import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import { Moon, RotateCcw, Heart } from 'lucide-react';
import EasterEggModal from './EasterEggModal';

export default function Scene8Final({ onRestart }) {
  const [step, setStep] = useState(0); // 0: Zoom out, 1: Enormous, 2: Meeting you, 3: Happy Birthday, 4: Lucky to know you
  const [moonTaps, setMoonTaps] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 4000);
    const t3 = setTimeout(() => {
      setStep(3);
      soundEngine.playChime(783.99);
    }, 7000);
    const t4 = setTimeout(() => setStep(4), 9500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleMoonTap = () => {
    soundEngine.playChime(880 + moonTaps * 50);
    const newCount = moonTaps + 1;
    setMoonTaps(newCount);

    if (newCount >= 5) {
      setShowEasterEgg(true);
      setMoonTaps(0);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-6 z-10 overflow-hidden text-center">
      
      {/* Floating Interactive Moon for Easter Egg */}
      <motion.button
        onClick={handleMoonTap}
        whileTap={{ scale: 0.85 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-6 left-6 z-40 p-2.5 rounded-full glass-panel border border-gold/40 text-gold shadow-[0_0_20px_#FFD98A] cursor-pointer"
        title="Tap the moon..."
      >
        <Moon className="w-5 h-5 fill-gold/30 text-gold" />
        {moonTaps > 0 && moonTaps < 5 && (
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose text-[9px] font-bold text-white flex items-center justify-center">
            {moonTaps}
          </span>
        )}
      </motion.button>

      {/* Center Zoom Out Universe Animation & Sequence Text */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col items-center justify-center my-auto z-20">
        
        {/* Tiny Glowing Universe Point */}
        <motion.div
          initial={{ scale: 3, opacity: 0.8 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mb-8 w-6 h-6 rounded-full bg-gradient-to-r from-soft-pink via-gold to-lavender shadow-[0_0_35px_#FF7EB6,0_0_60px_#FFD98A] flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
        </motion.div>

        {/* Text Sequence */}
        <div className="space-y-4 max-w-xs min-h-[220px] flex flex-col items-center justify-center">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base sm:text-lg font-serif text-warm-white/80"
              >
                “The universe is enormous.”
              </motion.p>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <p className="text-sm font-serif text-lavender/70 italic">
                  “But somehow…”
                </p>
                <p className="text-lg sm:text-xl font-serif text-soft-pink glow-text-pink">
                  “Meeting you made mine feel a little less empty.”
                </p>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-2 space-y-1"
              >
                <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-gold to-warm-white glow-text-pink">
                  Happy Birthday, {CONFIG.NAME}. ❤️
                </h1>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-3 space-y-2"
              >
                <p className="text-xs font-serif text-warm-white/70 italic">
                  — From someone who is very lucky to know you.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-soft-pink/30 text-gold font-cinzel font-bold text-sm tracking-widest glow-text-gold shadow-md">
                  {CONFIG.INITIALS}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Restart Journey Button */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        {step >= 4 && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onRestart}
            className="glass-panel px-5 py-2.5 rounded-full text-xs font-medium text-warm-white/80 hover:text-white border border-white/20 hover:border-soft-pink transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5 text-soft-pink" />
            Replay the Universe ✨
          </motion.button>
        )}
      </div>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <EasterEggModal onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
