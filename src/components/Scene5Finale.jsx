import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

export default function Scene5Finale({ onRestart }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    soundEngine.playFanfare();
    confetti({
      particleCount: 140,
      spread: 110,
      origin: { y: 0.5 }
    });

    // Auto rotate photo preview every 3 seconds
    const interval = setInterval(() => {
      setPhotoIndex(prev => (prev + 1) % CONFIG.PHOTOS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPhoto = CONFIG.PHOTOS[photoIndex];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-8 px-6 z-10 overflow-hidden text-center">
      
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-fredoka font-bold tracking-wider uppercase">
          <Sparkles className="w-4 h-4 animate-spin text-hot-pink" /> Grand Finale
        </span>
      </motion.div>

      {/* Main Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-full max-w-sm sm:max-w-md card-romantic rounded-3xl p-6 border-2 border-rose-500 shadow-2xl flex flex-col items-center gap-4 my-auto z-20"
      >
        {/* Animated Photo Circular Badge */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-rose-500 shadow-xl overflow-hidden">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-fredoka font-black text-deep-rose leading-tight">
            HAPPY BIRTHDAY
          </h1>
          <h1 className="text-3xl sm:text-4xl font-fredoka font-black text-rose-600 tracking-wide">
            {CONFIG.NAME} ❤️
          </h1>
        </div>

        <p className="text-sm font-outfit font-bold text-charcoal">
          “{CONFIG.FINALE.SUBTITLE}”
        </p>

        {/* Initials Pill Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-deep-rose to-hot-pink text-white font-fredoka font-bold text-lg tracking-widest shadow-xl border-2 border-white">
          <Heart className="w-5 h-5 fill-white animate-pulse" />
          {CONFIG.INITIALS}
        </div>

        <p className="text-xs font-sans text-deep-rose font-extrabold tracking-wide">
          {CONFIG.FINALE.TAGLINE}
        </p>
      </motion.div>

      {/* Replay Button */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onRestart}
          className="btn-pink-secondary px-6 py-3.5 rounded-full text-xs font-fredoka font-bold text-deep-rose border-2 border-rose-400 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-deep-rose" />
          Replay the Birthday Magic ✨
        </motion.button>
      </div>

    </div>
  );
}
