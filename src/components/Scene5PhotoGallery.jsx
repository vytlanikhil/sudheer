import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';
import { Heart, Maximize2, X, Sparkles } from 'lucide-react';

export default function Scene5PhotoGallery({ onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    soundEngine.playChime(659.25);
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-6 px-4 z-10 overflow-hidden text-center">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1 mt-2 z-20"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-xs font-fredoka font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-hot-pink" /> Memory Gallery 📸
        </span>
        <h2 className="text-2xl sm:text-3xl font-fredoka font-bold text-deep-rose">
          My Favorite Moments With You 💖
        </h2>
        <p className="text-xs font-sans text-charcoal font-semibold">
          Tap any picture to zoom in
        </p>
      </motion.div>

      {/* 3D Polaroid Photo Cards Display */}
      <div className="relative w-full max-w-lg lg:max-w-2xl flex-1 flex items-center justify-center my-3 overflow-y-auto px-2 z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2">
          {CONFIG.PHOTOS.map((photo, index) => {
            const rotations = [-3, 3, -2, 2, -4];
            const rot = rotations[index % rotations.length];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: rot }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                  rotate: [rot - 1, rot + 1, rot - 1]
                }}
                transition={{
                  scale: { duration: 0.4, delay: index * 0.1 },
                  y: { repeat: Infinity, duration: 4 + index * 0.5, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 6 + index * 0.5, ease: 'easeInOut' }
                }}
                onClick={() => handlePhotoClick(photo)}
                className="card-romantic p-2.5 rounded-2xl cursor-pointer group hover:scale-105 active:scale-95 transition-all flex flex-col items-center border-2 border-rose-400 shadow-xl"
              >
                {/* Photo Frame */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-slate-900 border border-pink-200">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <Heart className="absolute bottom-2 right-2 w-4 h-4 text-rose-500 fill-rose-500 shadow-md" />
                </div>

                <h4 className="text-xs sm:text-sm font-fredoka font-bold text-deep-rose truncate w-full px-1">
                  {photo.title}
                </h4>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Button to Next Scene */}
      <div className="w-full max-w-xs min-h-[50px] flex items-center justify-center z-20">
        <button
          onClick={onNext}
          className="btn-pink-primary w-full py-3.5 rounded-full font-fredoka text-xs tracking-wider uppercase shadow-xl"
        >
          Read Message from Sudheer 💌
        </button>
      </div>

      {/* Lightbox Photo Inspection Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full card-romantic rounded-3xl p-5 border-2 border-rose-500 shadow-2xl flex flex-col items-center gap-4 text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-rose-600 p-1 rounded-full bg-slate-100 border border-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-pink-300 shadow-lg">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-fredoka font-bold text-deep-rose">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm font-sans font-semibold text-charcoal italic">
                  “{selectedPhoto.caption}”
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
