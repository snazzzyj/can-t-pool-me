'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import { FinalLevel } from './components/FinalLevel';
import { PoolVillain } from './components/PoolVillain';
import { DialogueBox } from '@/shared/components/dialogue-box';
import { Press_Start_2P } from 'next/font/google';
import './boss-battle.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const FinalStrikeScene: React.FC = () => {
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);
  const [status, setStatus] = useState<'instructions' | 'playing' | 'retry' | 'cinematic'>('instructions');
  const [cinematicStep, setCinematicStep] = useState<'dialogue' | 'hit' | 'dead'>('dialogue');
  const [isVillainHit, setIsVillainHit] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleStartGame = () => {
    setStatus('playing');
  };

  const handleFinalPress = () => {
    if (status !== 'playing') return;
    setIsVillainHit(true);
    setTimeout(() => setIsVillainHit(false), 200);
  };

  const handleFinalComplete = (success: boolean) => {
    if (success) {
      setIsFading(true);
      setTimeout(() => {
        setStatus('cinematic');
        setCinematicStep('dialogue');
        setIsFading(false);
      }, 1000);
    } else {
      setStatus('retry');
    }
  };

  const handleCinematicNext = () => {
    if (cinematicStep === 'dialogue') {
      setCinematicStep('hit');
      setIsVillainHit(true);
      // Wait for impact (approx 40% of 2.5s animation = 1s) to show dead sprite
      setTimeout(() => {
        setIsDead(true);
        setCinematicStep('dead');
      }, 1000);
      // Reset hit state after animation
      setTimeout(() => setIsVillainHit(false), 3000);
    } else if (cinematicStep === 'dead') {
      dispatch(setSceneId(sceneId + 1));
    }
  };

  const handleRetry = () => {
    setStatus('playing');
    setIsDead(false);
    setIsVillainHit(false);
    setCinematicStep('dialogue');
  };

  const damageState = isDead ? 'dead' : 'kneeling';

  return (
    <div className={`boss-battle-overlay ${status === 'cinematic' ? 'cinematic-phase' : ''}`}>
      {/* HUD only shown during active gameplay */}
      {status === 'playing' && (
        <div className={`boss-hud ${pressStart2P.className}`}>
          <div className="hud-left">
            <div className="level-info">FINAL STRIKE</div>
          </div>
        </div>
      )}

      {/* Villain Container - Shown in all phases except maybe clean dead state */}
      <div className={`villain-cinematic-container ${cinematicStep === 'hit' ? 'final-hit-anim' : ''}`}>
        <PoolVillain damageState={damageState} isBeingHit={isVillainHit} />
      </div>

      {status === 'instructions' && !isFading && (
        <div className={`flex flex-col items-center justify-center text-center p-8 ${pressStart2P.className}`}>
          <h2 className="text-xl md:text-2xl text-white mb-12 leading-relaxed">
            MASH YOUR KEYS TO DEFEAT<br />THE EVIL POOL VILLAIN!
          </h2>
          <button
            className="btn-start shadow-[0_0_15px_rgba(255,215,0,0.4)]"
            onClick={handleStartGame}
          >
            START
          </button>
        </div>
      )}

      {status === 'playing' && !isFading && (
        <div className={pressStart2P.className}>
          <FinalLevel
            onComplete={handleFinalComplete}
            onPress={handleFinalPress}
          />
        </div>
      )}

      {status === 'cinematic' && !isFading && cinematicStep !== 'dead' && (
        <DialogueBox.Root isAnimating={true}>
          <DialogueBox.Speaker
            name="Sharker"
            image="/assets/characters/Rab/Rab_Concerned.png"
          />
          <DialogueBox.Text>
            Memento Mori bitch.
          </DialogueBox.Text>
          <DialogueBox.Controls>
            <button
              onClick={handleCinematicNext}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              {cinematicStep === 'dialogue' ? 'FINISH THEM' : '...'}
            </button>
          </DialogueBox.Controls>
        </DialogueBox.Root>
      )}

      {cinematicStep === 'dead' && !isFading && (
        <div className="absolute inset-0 flex flex-col items-center justify-between z-[2000] bg-black/20 py-20">
          <div className="animate-in fade-in slide-in-from-top-10 duration-1000">
            <h1
              className={`${pressStart2P.className} text-4xl md:text-6xl text-white text-center leading-tight tracking-wider animate-pulse`}
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            >
              MISSION<br />ACCOMPLISHED
            </h1>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <button
              onClick={handleCinematicNext}
              className={`
                bg-white hover:bg-gray-200 text-black font-bold 
                py-4 px-12 rounded-lg text-xl transition-all duration-300
                hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.4)]
                ${pressStart2P.className}
              `}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {status === 'retry' && (
        <div className={`retry-screen ${pressStart2P.className}`}>
          <h2>YOU MISSED!</h2>
          <button className="btn-start" onClick={handleRetry}>TRY AGAIN</button>
        </div>
      )}

      {/* Global Transition Fade Overlay */}
      <div
        className={`fade-transition-overlay ${isFading ? 'visible' : ''}`}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'black',
          zIndex: 1000,
          opacity: isFading ? 1 : 0,
          pointerEvents: isFading ? 'all' : 'none',
          transition: 'opacity 1s ease-in-out'
        }}
      />
    </div>
  );
};

export default FinalStrikeScene;
