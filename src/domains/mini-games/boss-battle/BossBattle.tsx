import React, { useEffect } from 'react';
import { useBossBattle } from './hooks/useBossBattle';
import { TimingBar } from './components/TimingBar';
import { FinalLevel } from './components/FinalLevel';
import { PoolVillain } from './components/PoolVillain';
import { PreGameInstructions } from './components/PreGameInstructions';
import { TIMING_LEVELS, PLAYER_CONFIG } from './constants';
import { Press_Start_2P } from 'next/font/google';
import './boss-battle.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface BossBattleProps {
  onComplete: (score: number) => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({ onComplete }) => {
  const {
    currentLevel,
    status,
    score,
    timeLeft,
    playerResults,
    isVillainHit,
    startLevel,
    handleTimingPress,
    handleFinalPress,
    handleFinalComplete,
    retry
  } = useBossBattle(onComplete);

  // Handle "Press any key to start"
  useEffect(() => {
    if (status === 'instructions') {
      const handleAnyKey = () => startLevel(1);
      window.addEventListener('keydown', handleAnyKey);
      return () => window.removeEventListener('keydown', handleAnyKey);
    }
  }, [status, startLevel]);

  const damageState = currentLevel === 1 ? 'healthy'
    : currentLevel === 2 ? 'dazed'
      : currentLevel === 3 ? 'staggering'
        : status === 'victory' ? 'knocked-out'
          : 'kneeling';

  return (
    <div className={`${pressStart2P.className} boss-battle-overlay`}>
      <div className="boss-hud">
        <div className="level-info">LEVEL {currentLevel === 4 ? 'FINAL' : `${currentLevel}/3`}</div>
        <div className="score-info">SCORE: {score}</div>
      </div>

      {status === 'instructions' && (
        <PreGameInstructions onStart={() => startLevel(1)} />
      )}

      {(status === 'playing' || status === 'between-levels') && currentLevel <= 3 && (
        <>
          <PoolVillain damageState={damageState} isBeingHit={isVillainHit} />

          <div className="timing-bars-container">
            {PLAYER_CONFIG.map(player => (
              <TimingBar
                key={player.id}
                playerId={player.id}
                characterPortrait={player.portrait}
                assignedKey={player.key}
                greenZoneSize={TIMING_LEVELS[currentLevel as 1 | 2 | 3].greenZoneSize}
                lineSpeed={TIMING_LEVELS[currentLevel as 1 | 2 | 3].lineSpeed}
                isActive={status === 'playing'}
                result={playerResults[player.id]}
                onPress={handleTimingPress}
              />
            ))}
          </div>

          <div className={`boss-timer ${timeLeft < 3 ? 'warning' : ''}`}>
            {timeLeft}s
          </div>
        </>
      )}

      {status === 'playing' && currentLevel === 4 && (
        <FinalLevel
          onComplete={handleFinalComplete}
          onPress={handleFinalPress}
        />
      )}

      {status === 'retry' && (
        <div className="retry-screen">
          <h2>THE POOL VILLAIN IS TOO STRONG!</h2>
          <button className="btn-start" onClick={retry}>TRY AGAIN</button>
        </div>
      )}

      {status === 'victory' && (
        <div className="victory-screen">
          <PoolVillain damageState="knocked-out" isBeingHit={false} />
          <h1 className="victory-text">VICTORY!</h1>
          <p>The Pool Villain has been defeated!</p>
        </div>
      )}
    </div>
  );
};

export default BossBattle;
