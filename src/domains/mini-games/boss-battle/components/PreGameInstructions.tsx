import React from 'react';
import { PLAYER_CONFIG } from '../constants';

interface PreGameInstructionsProps {
  onStart: () => void;
}

export const PreGameInstructions: React.FC<PreGameInstructionsProps> = ({ onStart }) => {
  return (
    <div className="pre-game-instructions">
      <h1>BOSS BATTLE</h1>
      <h2>DEFEAT THE POOL VILLAIN</h2>
      <p>Work together to time your strikes perfectly!</p>

      <div className="key-assignment-list">
        {PLAYER_CONFIG.map(player => (
          <div key={player.id} className="key-assignment-item">
            <img src={player.portrait} alt={player.name} />
            <strong>{player.name}</strong>
            <span className="key-box">{player.key}</span>
          </div>
        ))}
      </div>

      <button className="btn-start" onClick={onStart}>
        Press Any Key to Begin
      </button>
    </div>
  );
};
