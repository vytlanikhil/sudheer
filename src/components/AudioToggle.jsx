import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { CONFIG } from '../config';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const newState = soundEngine.toggleBgm(CONFIG.MUSIC_URL);
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleToggle}
        className="card-romantic px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-outfit font-bold text-deep-rose hover:text-hot-pink transition-all active:scale-95 shadow-md border-2 border-rose-300"
        title={isPlaying ? "Mute Background Music" : "Turn on Background Music"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-0.9 bg-hot-pink rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-0.9 bg-rose-500 rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
              <span className="w-0.9 bg-pink-400 rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
            <Volume2 className="w-4 h-4 text-hot-pink" />
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-rose-500" />
            <span className="text-[12px] font-fredoka tracking-wide">🔊 Play Music</span>
          </>
        )}
      </button>
    </div>
  );
}
