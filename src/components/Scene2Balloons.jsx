import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';

const TARGET_NAME = "KARTHIVANI";
const LETTERS = TARGET_NAME.split(''); // ['K', 'A', 'R', 'T', 'H', 'I', 'V', 'A', 'N', 'I']

// Colorful romantic gradient balloons
const BALLOON_COLORS = [
  'from-pink-500 to-rose-600',
  'from-purple-500 to-indigo-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-pink-500',
  'from-violet-400 to-purple-600',
  'from-pink-400 to-purple-500',
  'from-rose-500 to-red-600',
  'from-lavender to-pink-500',
  'from-amber-300 to-rose-400',
  'from-pink-600 to-purple-700'
];

export default function Scene2Balloons({ onNext }) {
  // Store balloons state with floating positions
  const [balloons, setBalloons] = useState(() =>
    LETTERS.map((char, index) => ({
      id: index,
      char,
      color: BALLOON_COLORS[index % BALLOON_COLORS.length],
      popped: false,
      // Spread positions across screen bounds
      x: 10 + (index % 5) * 18 + (Math.random() * 6 - 3), // % percentage
      y: 20 + Math.floor(index / 5) * 35 + (Math.random() * 10 - 5), // % percentage
      floatDuration: 4 + Math.random() * 3,
      floatDelay: Math.random() * 2
    }))
  );

  const [poppedCount, setPoppedCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [popParticles, setPopParticles] = useState([]);

  const handlePop = (id, char, e) => {
    const target = balloons.find(b => b.id === id);
    if (!target || target.popped) return;

    soundEngine.playPop();

    // Trigger pop explosion particles
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles = Array.from({ length: 12 }, (_, idx) => ({
      id: `${id}-${idx}-${Date.now()}`,
      x: centerX,
      y: centerY,
      dx: (Math.random() - 0.5) * 140,
      dy: (Math.random() - 0.5) * 140,
      color: ['#FF7EB6', '#FF4F81', '#B79CFF', '#FFD98A'][idx % 4]
    }));

    setPopParticles(prev => [...prev, ...newParticles]);

    // Mark balloon popped
    setBalloons(prev =>
      prev.map(b => (b.id === id ? { ...b, popped: true } : b))
    );

    const newCount = poppedCount + 1;
    setPoppedCount(newCount);

    if (newCount === LETTERS.length) {
      setTimeout(() => {
        setCompleted(true);
        soundEngine.playFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 600);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-4 z-10 overflow-hidden select-none">
      
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1.5 mt-4 z-20"
      >
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “Pop the balloons.” 🎈
        </h2>
        <p className="text-xs text-lavender/80 font-sans">
          Tap each floating balloon to reveal what's inside
        </p>
      </motion.div>

      {/* Floating Balloons Canvas Area */}
      <div className="relative w-full flex-1 my-4">
        {balloons.map((b) => (
          <AnimatePresence key={b.id}>
            {!b.popped && (
              <motion.button
                onClick={(e) => handlePop(b.id, b.char, e)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -14, 0],
                  x: [0, 8, 0]
                }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: { repeat: Infinity, duration: b.floatDuration, ease: 'easeInOut', delay: b.floatDelay },
                  x: { repeat: Infinity, duration: b.floatDuration * 1.3, ease: 'easeInOut', delay: b.floatDelay }
                }}
                style={{
                  position: 'absolute',
                  left: `${b.x}%`,
                  top: `${b.y}%`
                }}
                className="group cursor-pointer active:scale-90 transition-transform touch-manipulation z-20"
              >
                {/* Balloon Body */}
                <div className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${b.color} shadow-[0_8px_25px_rgba(255,79,129,0.3)] flex items-center justify-center border border-white/30`}>
                  {/* Highlight sheen */}
                  <div className="absolute top-2 left-3 w-3 h-5 bg-white/35 rounded-full rotate-[-25deg] blur-[0.5px]" />
                  
                  {/* Balloon String */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/40" />

                  {/* Secret Letter Icon inside balloon */}
                  <span className="text-white font-cinzel font-bold text-lg drop-shadow-md group-hover:scale-110 transition-transform">
                    ?
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        ))}

        {/* Pop Explosion Particles */}
        {popParticles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ x: p.x + p.dx, y: p.y + p.dy, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'fixed', left: 0, top: 0 }}
            className="w-2.5 h-2.5 rounded-full pointer-events-none z-50"
            onAnimationComplete={() => {
              setPopParticles(prev => prev.filter(item => item.id !== p.id));
            }}
          >
            <span style={{ color: p.color }}>❤️</span>
          </motion.div>
        ))}
      </div>

      {/* Target Letter Slot Tray */}
      <div className="w-full max-w-sm glass-panel p-4 rounded-2xl border border-soft-pink/30 flex flex-col items-center gap-3 z-20">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 min-h-[48px]">
          {LETTERS.map((char, i) => {
            const isRevealed = balloons[i]?.popped;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={isRevealed ? { scale: [0.8, 1.25, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-8 h-10 sm:w-9 sm:h-11 rounded-lg border flex items-center justify-center font-cinzel font-bold text-base sm:text-lg transition-all ${
                  isRevealed
                    ? 'bg-gradient-to-b from-soft-pink/30 to-rose/30 border-soft-pink text-warm-white shadow-[0_0_15px_rgba(255,126,182,0.6)] glow-text-pink'
                    : 'bg-white/5 border-white/10 text-white/20'
                }`}
              >
                {isRevealed ? char : ''}
              </motion.div>
            );
          })}
        </div>

        {/* Completed Quote & Next Step */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3 pt-2 w-full"
            >
              <h3 className="text-xl sm:text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-gold to-warm-white glow-text-pink">
                {CONFIG.NAME} ❤️
              </h3>
              <div className="space-y-1 text-xs sm:text-sm font-serif text-warm-white/90">
                <p>“See that?”</p>
                <p className="text-soft-pink font-semibold glow-text-pink">
                  “Even the universe knows your name.”
                </p>
              </div>

              <button
                onClick={onNext}
                className="glass-button w-full py-3 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_25px_rgba(255,126,182,0.5)] mt-2"
              >
                Light the Candles 🎂
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
