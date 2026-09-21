import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import { Heart } from 'lucide-react';

export default function Scene4Letter({ onNext }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-6 px-4 z-10 overflow-hidden text-center">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-fredoka font-bold tracking-wider uppercase">
          Slide 1 of 2 💌
        </span>
        <h2 className="text-xl sm:text-2xl font-fredoka font-bold text-deep-rose">
          {CONFIG.LETTER.TITLE}
        </h2>
      </motion.div>

      {/* Main Parchment Letter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm card-romantic rounded-3xl p-5 sm:p-6 border-2 border-rose-400 shadow-2xl flex flex-col justify-between overflow-hidden my-auto h-[62vh] relative"
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-2">
          <span className="text-xs font-fredoka font-bold text-deep-rose">
            To My Dearest Karthivani 🧸
          </span>
          <Heart className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
        </div>

        {/* Scrollable Letter Body using Caveat font */}
        <div className="flex-1 overflow-y-auto pr-1 text-left space-y-3 font-handwriting text-xl sm:text-2xl text-slate-800 leading-snug">
          {CONFIG.LETTER.MESSAGE.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-rose-200 text-center">
          <span className="text-sm font-fredoka font-bold text-deep-rose">
            From Sudheer, with all my love ❤️
          </span>
        </div>
      </motion.div>

      {/* Button to Slide 2 */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        <button
          onClick={onNext}
          className="btn-pink-primary w-full py-3.5 rounded-full font-fredoka text-xs tracking-wider uppercase shadow-xl"
        >
          One Last Surprise 🎉 (Slide 2)
        </button>
      </div>

    </div>
  );
}
