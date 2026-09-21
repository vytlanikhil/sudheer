import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';

const WORDS = CONFIG.FOUR_BALLOONS.WORDS;

const BALLOON_COLORS = [
  { bg: 'from-pink-500 via-rose-500 to-pink-600', shadow: 'rgba(236, 72, 153, 0.4)', string: '#EC4899' },
  { bg: 'from-purple-500 via-indigo-500 to-purple-600', shadow: 'rgba(168, 85, 247, 0.4)', string: '#A855F7' },
  { bg: 'from-amber-400 via-pink-400 to-rose-500', shadow: 'rgba(245, 158, 11, 0.4)', string: '#F59E0B' },
  { bg: 'from-rose-500 via-pink-500 to-rose-600', shadow: 'rgba(244, 63, 94, 0.4)', string: '#F43F5E' }
];

export default function Scene2FourBalloons({ onNext }) {
  const [popped, setPopped] = useState([false, false, false, false]);
  const [completed, setCompleted] = useState(false);

  const handlePop = (index) => {
    if (popped[index]) return;

    soundEngine.playPop();

    const newPopped = [...popped];
    newPopped[index] = true;
    setPopped(newPopped);

    if (newPopped.every(Boolean)) {
      setTimeout(() => {
        setCompleted(true);
        soundEngine.playFanfare();
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-8 px-4 z-10 overflow-hidden select-none">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20"
      >
        <h2 className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose">
          {CONFIG.FOUR_BALLOONS.TITLE}
        </h2>
        <p className="text-xs font-sans text-charcoal font-semibold">
          {CONFIG.FOUR_BALLOONS.SUBTITLE}
        </p>
      </motion.div>

      {/* 4 Perfectly Shaped Glossy 3D Balloons Grid */}
      <div className="w-full max-w-xs grid grid-cols-2 gap-6 my-auto z-20">
        {WORDS.map((word, i) => {
          const isPopped = popped[i];
          const colorObj = BALLOON_COLORS[i % BALLOON_COLORS.length];

          return (
            <div key={i} className="flex flex-col items-center justify-center min-h-[130px]">
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  <motion.button
                    onClick={() => handlePop(i)}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      y: [0, -12, 0]
                    }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.3 },
                      y: { repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' }
                    }}
                    className="relative cursor-pointer active:scale-90 transition-transform flex flex-col items-center group"
                  >
                    {/* Perfect Tear-Drop Glossy Balloon Body */}
                    <div
                      className={`relative w-20 h-26 sm:w-22 sm:h-28 rounded-[50%_50%_50%_50%/42%_42%_58%_58%] bg-gradient-to-tr ${colorObj.bg} flex items-center justify-center border-2 border-white/60 relative`}
                      style={{ boxShadow: `0 12px 28px ${colorObj.shadow}` }}
                    >
                      {/* Top-Left Glossy Sheen Highlight */}
                      <div className="absolute top-2.5 left-3.5 w-4 h-7 bg-white/45 rounded-full rotate-[-28deg] blur-[0.3px]" />
                      
                      {/* Inner Secret Question Mark */}
                      <span className="text-white font-fredoka font-bold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                        ?
                      </span>

                      {/* Balloon Tie Knot at Bottom */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-pink-600" />
                    </div>

                    {/* Cute Wavy Ribbon String */}
                    <svg className="w-4 h-8 text-pink-400 -mt-1" viewBox="0 0 20 40">
                      <path
                        d="M 10 0 Q 18 10 10 20 T 10 40"
                        fill="none"
                        stroke={colorObj.string}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.button>
                ) : (
                  /* Word Revealed Card */
                  <motion.div
                    initial={{ scale: 0, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="card-romantic px-5 py-3.5 rounded-2xl border-2 border-rose-500 shadow-xl flex items-center justify-center"
                  >
                    <span className="text-2xl font-fredoka font-bold text-deep-rose">
                      {word}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Target Word Tray */}
      <div className="w-full max-w-sm card-romantic p-4 rounded-3xl border-2 border-pink-300 flex flex-col items-center gap-3 z-20 shadow-xl">
        <div className="flex flex-wrap items-center justify-center gap-2 min-h-[44px]">
          {WORDS.map((w, i) => (
            <div
              key={i}
              className={`px-3.5 py-1.5 rounded-xl border-2 font-fredoka font-bold text-base transition-all ${
                popped[i]
                  ? 'bg-deep-rose text-white border-white shadow-md'
                  : 'bg-white/60 border-pink-200 text-pink-300'
              }`}
            >
              {popped[i] ? w : '___'}
            </div>
          ))}
        </div>

        {/* Sentence reveal & Continue button */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-3 pt-2 w-full"
            >
              <h3 className="text-2xl font-fredoka font-bold text-deep-rose">
                {CONFIG.FOUR_BALLOONS.FULL_SENTENCE}
              </h3>

              <button
                onClick={onNext}
                className="btn-pink-primary w-full py-3.5 rounded-full font-fredoka text-sm tracking-wider uppercase shadow-xl"
              >
                Time for the Birthday Cake 🎂
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
