import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import { Heart, Maximize2, X, Sparkles } from 'lucide-react';

export default function Scene4Memories({ onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    soundEngine.playChime(587.33); // D5
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-8 px-4 z-10 overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink/10 border border-soft-pink/30 text-soft-pink text-[11px] font-medium tracking-widest uppercase">
          <Sparkles className="w-3 h-3 animate-spin" /> Memory Constellation
        </span>
        <h2 className="text-xl sm:text-2xl font-serif text-warm-white">
          “Floating Memories” 📸
        </h2>
        <p className="text-xs text-lavender/80 font-sans">
          Tap a memory card to inspect the moment
        </p>
      </motion.div>

      {/* Floating 3D/Parallax Cards Carousel / Grid */}
      <div className="relative w-full max-w-sm flex-1 flex items-center justify-center my-4 overflow-y-auto px-2">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full py-4">
          {CONFIG.PHOTO_LIST.map((photo, index) => {
            const rotation = (index % 2 === 0 ? -3 : 3) * (index + 1);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30, rotate: rotation }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                  rotate: [rotation - 1, rotation + 1, rotation - 1]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4 + index * 0.7, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 6 + index * 0.5, ease: 'easeInOut' }
                }}
                onClick={() => handlePhotoClick(photo)}
                className="group relative glass-card rounded-2xl p-2.5 cursor-pointer hover:border-soft-pink hover:shadow-[0_0_25px_rgba(255,126,182,0.4)] transition-all active:scale-95 flex flex-col items-center"
              >
                {/* Photo frame */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-slate-900 border border-white/10">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-white/90">
                    <span className="truncate font-sans">{photo.date}</span>
                    <Heart className="w-3 h-3 text-soft-pink fill-soft-pink" />
                  </div>
                </div>

                {/* Caption preview */}
                <p className="text-[11px] font-serif italic text-warm-white text-center line-clamp-2 px-1">
                  “{photo.caption}”
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Quote & Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xs space-y-3 text-center z-20"
      >
        <div className="space-y-0.5 text-xs sm:text-sm font-serif text-warm-white/90">
          <p>“Some moments become memories.”</p>
          <p className="text-soft-pink font-semibold glow-text-pink">
            “Some memories become permanent.”
          </p>
        </div>

        <button
          onClick={onNext}
          className="glass-button w-full py-3 rounded-full text-warm-white font-medium text-xs tracking-widest uppercase border border-soft-pink/50 hover:border-soft-pink shadow-[0_0_25px_rgba(255,126,182,0.5)]"
        >
          Read My Letter 💌
        </button>
      </motion.div>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full glass-panel rounded-3xl p-5 border border-soft-pink/40 shadow-2xl flex flex-col items-center gap-4 text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-warm-white/70 hover:text-white p-1 rounded-full bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-cinzel text-gold glow-text-gold font-bold">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm font-serif text-warm-white italic">
                  “{selectedPhoto.caption}”
                </p>
                <p className="text-xs font-sans text-lavender/80">
                  {selectedPhoto.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
