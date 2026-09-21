import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Scene3Cake({ onNext }) {
  const [phase, setPhase] = useState('intro'); // intro -> countdown -> blow -> wish -> dark -> stars
  const [count, setCount] = useState(3);
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]); // 5 candles

  // Handle countdown sequence
  useEffect(() => {
    if (phase === 'countdown') {
      if (count > 1) {
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
      } else if (count === 1) {
        const timer = setTimeout(() => {
          setPhase('blow');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, count]);

  const startCountdown = () => {
    soundEngine.playChime(440);
    setPhase('countdown');
  };

  const handleExtinguish = () => {
    if (phase !== 'blow') return;
    soundEngine.playBlowout();
    setCandlesLit([false, false, false, false, false]);

    setTimeout(() => {
      setPhase('dark1');
    }, 1200);

    setTimeout(() => {
      setPhase('dark2');
    }, 3500);

    setTimeout(() => {
      setPhase('stars');
      soundEngine.playFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 6000);
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-between py-10 px-6 z-10 transition-colors duration-1000 ${
      phase.startsWith('dark') ? 'bg-black/90' : 'bg-transparent'
    }`}>

      {/* Header instructions */}
      <div className="text-center space-y-2 mt-4 max-w-sm min-h-[90px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-2"
            >
              <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
                “One rule.”
              </h2>
              <p className="text-sm font-sans text-soft-pink glow-text-pink italic">
                “Close your eyes…”
              </p>
              <button
                onClick={startCountdown}
                className="glass-button px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest text-warm-white border border-soft-pink/40 shadow-md mt-2"
              >
                I'm Ready ✨
              </button>
            </motion.div>
          )}

          {phase === 'countdown' && (
            <motion.div
              key="count"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="space-y-1"
            >
              <span className="text-xs font-sans text-lavender/80 tracking-widest uppercase">
                Make a Wish in...
              </span>
              <div className="text-5xl font-cinzel font-bold text-gold glow-text-gold">
                {count}
              </div>
            </motion.div>
          )}

          {phase === 'blow' && (
            <motion.div
              key="blow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h2 className="text-xl sm:text-2xl font-serif text-gold glow-text-gold">
                “Make a wish.” ✨
              </h2>
              <p className="text-xs font-sans text-warm-white/80 animate-pulse">
                (Tap the candles to blow them out!)
              </p>
            </motion.div>
          )}

          {phase === 'dark1' && (
            <motion.div
              key="dark1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg sm:text-xl font-serif text-warm-white/90"
            >
              “I hope one of your wishes…”
            </motion.div>
          )}

          {phase === 'dark2' && (
            <motion.div
              key="dark2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl sm:text-2xl font-serif text-soft-pink glow-text-pink"
            >
              “…has something to do with us.” ❤️
            </motion.div>
          )}

          {phase === 'stars' && (
            <motion.div
              key="stars"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-gold to-lavender glow-text-pink">
                A Universe of Wishes ✨
              </h2>
              <p className="text-xs font-sans text-warm-white/80">
                May every star grant a thousand more smiles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Birthday Cake Illustration & Candle Tap Target */}
      <div className="relative my-auto flex flex-col items-center justify-center">
        <button
          onClick={handleExtinguish}
          disabled={phase !== 'blow'}
          className="relative group cursor-pointer focus:outline-none"
        >
          {/* Cake Candles */}
          <div className="flex justify-center gap-4 sm:gap-5 mb-1 z-20 relative">
            {candlesLit.map((isLit, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Flame */}
                {isLit ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 0.9, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 + idx * 0.2 }}
                    className="w-4 h-6 rounded-full bg-gradient-to-t from-rose via-amber-300 to-yellow-100 animate-flame shadow-[0_0_15px_#FFD98A,0_0_30px_#FF4F81]"
                  />
                ) : (
                  /* Smoke puff when extinguished */
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 2 }}
                    transition={{ duration: 1 }}
                    className="w-3 h-3 bg-gray-400/60 rounded-full blur-[2px]"
                  />
                )}
                {/* Candle Stick */}
                <div className="w-2.5 h-12 bg-gradient-to-b from-pink-300 via-rose-400 to-purple-400 rounded-t-sm shadow-inner border-x border-white/20" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="relative w-56 sm:w-64 flex flex-col items-center">
            {/* Top Frosting Layer */}
            <div className="w-48 sm:w-56 h-12 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-3xl border-t border-white/40 shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-3 bg-white/40 rounded-b-full" />
              <span className="text-white/90 text-xs font-serif tracking-widest uppercase">
                Happy Birthday
              </span>
            </div>

            {/* Cake Middle Tier */}
            <div className="w-56 sm:w-64 h-16 bg-gradient-to-r from-purple-900 via-pink-950 to-purple-900 border-t-2 border-pink-400/40 shadow-2xl flex items-center justify-around px-4 relative">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-gold font-cinzel font-bold text-sm tracking-wider glow-text-gold">
                KARTHIVANI
              </span>
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            </div>

            {/* Cake Stand Base */}
            <div className="w-64 sm:w-72 h-4 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-full shadow-2xl border-t border-white" />
            <div className="w-24 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-xl shadow-lg" />
          </div>
        </button>
      </div>

      {/* Bottom Action Button for Next Scene */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center">
        {phase === 'stars' && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="glass-button w-full py-3.5 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_30px_rgba(255,126,182,0.6)]"
          >
            Explore Our Memories 📸
          </motion.button>
        )}
      </div>

    </div>
  );
}
