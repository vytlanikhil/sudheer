import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BackgroundCanvas from './components/BackgroundCanvas';
import AudioToggle from './components/AudioToggle';

import Scene0Entrance from './components/Scene0Entrance';
import Scene1Excited from './components/Scene1Excited';
import Scene1LoveQuestion from './components/Scene1LoveQuestion';
import Scene2FourBalloons from './components/Scene2FourBalloons';
import Scene3CuteCake from './components/Scene3CuteCake';
import Scene5PhotoGallery from './components/Scene5PhotoGallery';
import Scene4Letter from './components/Scene4Letter';
import Scene5Finale from './components/Scene5Finale';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);

  const nextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 7));
  };

  const restartJourney = () => {
    setCurrentScene(0);
  };

  // Keyboard navigation support for Laptop users (Space / Right Arrow / Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        // Only allow key press if not on runaway button scenes or interactive inputs
        if (currentScene !== 1 && currentScene !== 2 && currentScene !== 3) {
          nextScene();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-[#FFF0F5] text-[#1E293B] flex items-center justify-center select-none font-sans">
      {/* HTML5 Canvas Pink & White Teddy Background */}
      <BackgroundCanvas />

      {/* Floating Audio Controller */}
      <AudioToggle />

      {/* Laptop & Mobile Fully Responsive Container */}
      <div className="relative w-full h-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto flex flex-col justify-between overflow-hidden p-2 sm:p-4">
        <AnimatePresence mode="wait">
          {currentScene === 0 && (
            <motion.div
              key="scene0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene0Entrance onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene1Excited onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene1LoveQuestion onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene2FourBalloons onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene3CuteCake onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene5PhotoGallery onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div
              key="scene6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene4Letter onNext={nextScene} />
            </motion.div>
          )}

          {currentScene === 7 && (
            <motion.div
              key="scene7"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Scene5Finale onRestart={restartJourney} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
