import React, { useEffect } from 'react';
import { getAssetPath } from '@/shared/utils/game';
import { PlayerResult } from '../types';
import { useTimingBar } from '../hooks/useTimingBar';

interface TimingBarProps {
  playerId: number;
  characterPortrait: string;
  assignedKey: string;
  greenZoneSize: number;
  lineSpeed: number;
  isActive: boolean;
  result: PlayerResult | null;
  onPress: (playerId: number, position: number) => void;
}

export const TimingBar: React.FC<TimingBarProps> = ({
  playerId,
  characterPortrait,
  assignedKey,
  greenZoneSize,
  lineSpeed,
  isActive,
  result,
  onPress,
}) => {
  const isStopped = result !== null;
  const { position: currentPosition } = useTimingBar({
    lineSpeed,
    isPaused: !isActive || isStopped
  });

  const displayPosition = isStopped ? result.linePosition : currentPosition;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && !isStopped && e.key.toUpperCase() === assignedKey.toUpperCase()) {
        onPress(playerId, currentPosition);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isStopped, assignedKey, onPress, playerId, currentPosition]);

  return (
    <div className="boss-timing-bar-container">
      <div className="player-info">
        <img src={getAssetPath(characterPortrait)} alt="Portrait" className="portrait" />
        <span className="key-hint">{assignedKey}</span>
      </div>

      <div className="bar-track">
        <div
          className="green-zone"
          style={{
            width: `${greenZoneSize}%`,
            left: `${(100 - greenZoneSize) / 2}%`
          }}
        />
        <div
          className={`moving-line ${isStopped ? 'stopped' : ''} ${result?.hitGreenZone ? 'success' : result?.keyPressed ? 'fail' : ''}`}
          style={{ left: `${displayPosition}%` }}
        />
      </div>
    </div>
  );
};
