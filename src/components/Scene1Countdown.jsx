import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react';

const OBJECTS = [
  {
    id: 'star',
    icon: '💫',
    label: 'A Star',
    desc: 'Guiding light in the deep cosmos',
    pitch: 523.25,
    color: 'from-amber-300 to-yellow-500'
  },
  {
    id: 'balloon',
    icon: '🎈',
    label: 'A Balloon',
    desc: 'Carrying wishes into the sky',
    pitch: 659.25,
    color: 'from-pink-400 to-rose-600'
  },
  {
    id: 'flower',
    icon: '🌸',
    label: 'A Flower',
    desc: 'Blooms that make life bloom',
    pitch: 783.99,
    color: 'from-purple-300 to-pink-500'
  },
  {
    id: 'envelope',
    icon: '💌',
    label: 'An Envelope',
    desc: 'A secret waiting to be read',
    pitch: 880.00,
    color: 'from-rose-300 to-purple-500'
  }
];

export default function Scene1Countdown({ onNext }) {
  const [discovered, setDiscovered] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleTap = (obj) => {
    soundEngine.playChime(obj.pitch);
    const newDiscovered = { ...discovered, [obj.id]: true };
    setDiscovered(newDiscovered);
    setActiveItem(obj);

    // Check if all 4 discovered
    if (Object.keys(newDiscovered).length === 4) {
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    }
  };

  const handleContinue = () => {
    soundEngine.playChime(1046.50); // High C6
    onNext();
  };

  const count = Object.keys(discovered).length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-12 px-6 z-10">
      
      {/* Top Header Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-2 mt-6 max-w-sm"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink/10 border border-soft-pink/30 text-soft-pink text-[11px] font-medium tracking-widest uppercase">
          <Sparkles className="w-3 h-3 animate-spin" /> Step 1: Discovery
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “Before I say what I came here to say…”
        </h2>
        <p className="text-sm font-sans text-lavender/80 italic">
          “I want you to discover it.”
        </p>
      </motion.div>

      {/* 4 Floating Objects Grid */}
      <div className="w-full max-w-xs grid grid-cols-2 gap-5 my-auto">
        {OBJECTS.map((obj, i) => {
          const isFound = !!discovered[obj.id];
          return (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
            >
              <button
                onClick={() => handleTap(obj)}
                className={`relative w-full aspect-square rounded-2xl glass-card flex flex-col items-center justify-center p-4 transition-all group overflow-hidden ${
                  isFound
                    ? 'border-soft-pink bg-soft-pink/20 shadow-[0_0_25px_rgba(255,126,182,0.4)]'
                    : 'hover:border-warm-white/40 active:scale-95'
                }`}
              >
                {/* Floating animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
                  className="relative z-10 text-4xl mb-2 drop-shadow-md select-none"
                >
                  {obj.icon}
                </motion.div>

                <span className="text-xs font-serif text-warm-white/90 group-hover:text-soft-pink">
                  {obj.label}
                </span>

                {isFound && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 text-soft-pink"
                  >
                    <CheckCircle2 className="w-4 h-4 fill-soft-pink/30" />
                  </motion.div>
                )}

                {/* Background glow ripple when found */}
                {isFound && (
                  <motion.div
                    initial={{ opacity: 0.6, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-soft-pink/30 to-lavender/30 pointer-events-none"
                  />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Discovery Counter Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xs space-y-4 text-center"
      >
        <div className="flex items-center justify-between text-xs text-lavender/80 mb-1 px-1">
          <span>Items Discovered</span>
          <span className="font-bold text-soft-pink">{count} / 4</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-soft-pink via-rose to-lavender rounded-full shadow-[0_0_10px_#FF7EB6]"
            initial={{ width: 0 }}
            animate={{ width: `${(count / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Transition button once ready */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pt-2"
            >
              <p className="text-sm font-serif text-gold glow-text-gold mb-3">
                “Okay… now we're ready.”
              </p>
              <button
                onClick={handleContinue}
                className="glass-button w-full py-3.5 rounded-full text-warm-white font-medium text-sm tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_30px_rgba(255,126,182,0.5)]"
              >
                Enter the Sky 🎈
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Item Detail Toast */}
      <AnimatePresence>
        {activeItem && !isReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 glass-panel px-4 py-2.5 rounded-full border border-soft-pink/40 shadow-xl flex items-center gap-2 text-xs text-warm-white z-50 pointer-events-none"
          >
            <span>{activeItem.icon}</span>
            <span className="font-serif">{activeItem.desc}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
