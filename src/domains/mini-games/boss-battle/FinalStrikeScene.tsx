'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import { FinalLevel } from './components/FinalLevel';
import { PoolVillain } from './components/PoolVillain';
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
  const [status, setStatus] = useState<'playing' | 'retry'>('playing');
  const [isVillainHit, setIsVillainHit] = useState(false);

  const handleFinalPress = () => {
    if (status !== 'playing') return;
    setIsVillainHit(true);
    setTimeout(() => setIsVillainHit(false), 200);
  };

  const handleFinalComplete = (success: boolean) => {
    if (success) {
      // Advance to the aftermath scene
      dispatch(setSceneId(sceneId + 1));
    } else {
      setStatus('retry');
    }
    // Note: retry logic is handled within FinalLevel (it doesn't have its own retry, 
    // it just calls onComplete(false) if time runs out). 
    // If we want a retry screen here, we'd need to add it, but for now 
    // let's follow the pattern of the other scenes.
    // Actually, useBossBattle had a retry state. FinalLevel itself doesn't.
  };

  const handleRetry = () => {
    setStatus('playing');
  };

  return (
    <div className={`${pressStart2P.className} boss-battle-overlay`}>
      <div className="boss-hud">
        <div className="hud-left">
          <div className="level-info">FINAL STRIKE</div>
        </div>
      </div>

      {status === 'playing' ? (
        <>
          <PoolVillain damageState="kneeling" isBeingHit={isVillainHit} />
          <FinalLevel
            onComplete={handleFinalComplete}
            onPress={handleFinalPress}
          />
        </>
      ) : (
        <div className="retry-screen">
          <h2>STRIKE FAILED!</h2>
          <button className="btn-start" onClick={handleRetry}>TRY AGAIN</button>
        </div>
      )}
    </div>
  );
};

export default FinalStrikeScene;
