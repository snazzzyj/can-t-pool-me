import React, { useState, useEffect, useCallback } from 'react';
import { PLAYER_CONFIG, FINAL_LEVEL_CONFIG } from '../constants';
import { getAssetPath } from '@/shared/utils/game';

interface FinalLevelProps {
  onComplete: (success: boolean, finalPressCount: number) => void;
  onPress: () => void;
}

export const FinalLevel: React.FC<FinalLevelProps> = ({ onComplete, onPress }) => {
  const [pressCount, setPressCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FINAL_LEVEL_CONFIG.timeLimit);
  const [activeSwings, setActiveSwings] = useState<Record<number, boolean>>({});

  const handlePress = useCallback((playerId: number) => {
    setPressCount(prev => {
      const next = prev + 1;
      if (next >= FINAL_LEVEL_CONFIG.targetPresses) {
        // Handled in useEffect below
      }
      return next;
    });

    onPress();

    // Trigger swing animation for the specific character
    setActiveSwings(prev => ({ ...prev, [playerId]: true }));
    setTimeout(() => {
      setActiveSwings(prev => ({ ...prev, [playerId]: false }));
    }, 200);
  }, [onPress]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const player = PLAYER_CONFIG.find(p => p.key.toUpperCase() === e.key.toUpperCase());
      if (player) {
        handlePress(player.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress]);

  useEffect(() => {
    if (pressCount >= FINAL_LEVEL_CONFIG.targetPresses) {
      onComplete(true, pressCount);
      return;
    }

    if (timeLeft <= 0) {
      onComplete(false, pressCount);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pressCount, timeLeft, onComplete]);

  return (
    <div className="final-level-container">
      <h2>FINAL STRIKE!</h2>
      <div className="press-counter">
        {pressCount} / {FINAL_LEVEL_CONFIG.targetPresses}
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${(pressCount / FINAL_LEVEL_CONFIG.targetPresses) * 100}%` }}
        />
      </div>

      <div className="boss-timer">{timeLeft}s</div>

      <div className="character-team">
        {PLAYER_CONFIG.map(player => (
          <div key={player.id} className="character-lane">
            <img
              src={getAssetPath(player.portrait)}
              alt={player.name}
              className={`character-swing-sprite ${activeSwings[player.id] ? 'swinging' : ''}`}
            />
            <div className="key-hint">({player.key})</div>
          </div>
        ))}
      </div>
    </div>
  );
};
