import React from 'react';
import { VILLAIN_ASSETS } from '../constants';

interface PoolVillainProps {
  damageState: 'healthy' | 'dazed' | 'staggering' | 'kneeling' | 'knocked-out';
  isBeingHit: boolean;
}

export const PoolVillain: React.FC<PoolVillainProps> = ({ damageState, isBeingHit }) => {
  const isDead = damageState === 'knocked-out';
  const asset = isDead ? VILLAIN_ASSETS.DEAD : VILLAIN_ASSETS.ALIVE;

  // Style shifts based on damage state to simulate condition if we only have one "alive" sprite
  const getFilter = () => {
    switch (damageState) {
      case 'dazed': return 'sepia(0.3)';
      case 'staggering': return 'sepia(0.6) hue-rotate(-20deg)';
      case 'kneeling': return 'sepia(0.9) hue-rotate(-40deg)';
      default: return 'none';
    }
  };

  const getTransform = () => {
    switch (damageState) {
      case 'kneeling': return 'translateY(40px) scaleY(0.8)';
      default: return 'none';
    }
  };

  return (
    <div className="villain-container">
      <img
        src={asset}
        alt="Pool Villain"
        className={`villain-sprite ${isBeingHit ? 'shake' : ''}`}
        style={{
          filter: getFilter(),
          transform: getTransform(),
          transition: 'all 0.3s ease'
        }}
      />
      <div className="status-label" style={{ marginTop: '10px', fontSize: '14px', color: '#ff4444' }}>
        {damageState.toUpperCase()}
      </div>
    </div>
  );
};
