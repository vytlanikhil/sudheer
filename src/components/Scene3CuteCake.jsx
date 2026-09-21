import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function Scene3CuteCake({ onNext }) {
  const [candleLit, setCandleLit] = useState(true);
  const [blown, setBlown] = useState(false);

  const handleBlowout = () => {
    if (!candleLit) return;
    soundEngine.playBlowout();
    setCandleLit(false);

    setTimeout(() => {
      setBlown(true);
      soundEngine.playFanfare();
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-8 px-6 z-10 overflow-hidden text-center">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20 max-w-xs"
      >
        <h2 className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose">
          {CONFIG.CAKE.TITLE}
        </h2>
        <p className="text-xs font-sans text-charcoal font-semibold leading-relaxed">
          {CONFIG.CAKE.SUBTITLE}
        </p>
      </motion.div>

      {/* Birthday Cake Illustration */}
      <div className="relative my-auto flex flex-col items-center justify-center z-20">
        <button
          onClick={handleBlowout}
          disabled={!candleLit}
          className="relative group cursor-pointer focus:outline-none"
        >
          {/* Candle */}
          <div className="relative flex flex-col items-center mb-1 z-30">
            {candleLit ? (
              <motion.div
                animate={{ scale: [1, 1.25, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-6 h-8 rounded-full bg-gradient-to-t from-rose-500 via-amber-300 to-yellow-100 animate-flame shadow-[0_0_25px_#EC4899]"
              />
            ) : (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -30, scale: 2 }}
                transition={{ duration: 1.2 }}
                className="w-4 h-4 bg-gray-400/60 rounded-full blur-[2px]"
              />
            )}
            <div className="w-3.5 h-14 bg-gradient-to-b from-pink-200 via-rose-300 to-pink-400 rounded-t-sm border-x-2 border-white shadow-md" />
          </div>

          {/* Cake Layers */}
          <div className="relative w-56 sm:w-64 flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-44 sm:w-48 h-14 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-3xl border-2 border-white shadow-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-4 bg-white/60 rounded-b-full" />
              <span className="text-white font-fredoka font-bold text-xs tracking-wider uppercase drop-shadow">
                Make a Wish!
              </span>
            </div>

            {/* Bottom Tier */}
            <div className="w-56 sm:w-64 h-20 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 border-t-2 border-white shadow-2xl flex items-center justify-around px-4 relative rounded-b-2xl">
              <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
              <span className="text-white font-fredoka font-bold text-xl tracking-wider drop-shadow-md">
                KARTHIVANI 🧸
              </span>
              <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            </div>

            {/* Cake Base */}
            <div className="w-64 sm:w-72 h-4 bg-white rounded-full shadow-lg border-2 border-pink-200 mt-1" />
          </div>
        </button>
      </div>

      {/* Post Blowout Sentence & Continue Button */}
      <div className="w-full max-w-xs min-h-[70px] flex items-center justify-center z-20">
        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 w-full"
            >
              <p className="text-base font-fredoka font-bold text-deep-rose">
                “May all your secret wishes come true 💫”
              </p>

              <button
                onClick={onNext}
                className="btn-pink-primary w-full py-3.5 rounded-full font-fredoka text-sm tracking-wider uppercase shadow-xl"
              >
                Read Message from Sudheer 💌
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
