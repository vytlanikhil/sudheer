import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';

export default function Scene1Excited({ onNext }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [teaseText, setTeaseText] = useState("");

  const runaway = () => {
    soundEngine.playChime(750);
    
    // Smooth random runaway offset (-120 to +120 px)
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 260;

    setNoPos({ x: randomX, y: randomY });

    const teases = [
      "Haha nice try baby! 😜",
      "Nope, you love me too much! 🥰",
      "You can't click NO! 💕",
      "Can't escape my love! 🤪",
      "You HAVE to choose YES! 💖"
    ];
    setTeaseText(teases[Math.floor(Math.random() * teases.length)]);
  };

  const handleYes = () => {
    soundEngine.playFanfare();
    onNext();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center z-10 overflow-hidden">
      
      {/* Main Container Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm card-romantic rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl relative"
      >
        <div className="text-6xl animate-bounce drop-shadow">
          🥳
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose leading-tight">
            {CONFIG.EXCITED_QUESTION.QUESTION}
          </h2>
          <p className="text-xs font-sans text-hot-pink font-semibold">
            {CONFIG.EXCITED_QUESTION.SUBTEXT}
          </p>
        </div>

        {/* Tease message when NO button dodges */}
        {teaseText && (
          <motion.div
            key={teaseText}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm font-fredoka font-bold text-deep-rose animate-pulse py-1"
          >
            {teaseText}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="relative flex items-center justify-center gap-6 pt-4 min-h-[60px]">
          
          {/* YES Button */}
          <button
            onClick={handleYes}
            className="btn-pink-primary px-8 py-4 rounded-full font-fredoka text-lg shadow-xl hover:scale-110 active:scale-95 z-20"
          >
            YES! 🥰
          </button>

          {/* Runaway NO Button */}
          <motion.button
            onMouseEnter={runaway}
            onTouchStart={runaway}
            onClick={runaway}
            animate={{
              x: noPos.x,
              y: noPos.y
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="px-6 py-3 rounded-full font-fredoka font-semibold text-sm bg-slate-100 text-slate-500 border-2 border-slate-300 shadow-md z-30"
          >
            No 🙄
          </motion.button>

        </div>
      </motion.div>

    </div>
  );
}
