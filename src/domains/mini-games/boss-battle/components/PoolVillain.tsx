import React from 'react';
import { VILLAIN_ASSETS } from '../constants';

interface PoolVillainProps {
  damageState: 'healthy' | 'dazed' | 'staggering' | 'kneeling' | 'knocked-out';
  isBeingHit: boolean;
}

export const PoolVillain: React.FC<PoolVillainProps> = ({ damageState, isBeingHit }) => {
  const getAsset = () => {
    switch (damageState) {
      case 'healthy': return VILLAIN_ASSETS.HEALTHY;
      case 'dazed': return VILLAIN_ASSETS.DAZED;
      case 'staggering': return VILLAIN_ASSETS.STAGGERING;
      case 'kneeling': return VILLAIN_ASSETS.DIZZY;
      case 'knocked-out': return VILLAIN_ASSETS.DEAD;
      default: return VILLAIN_ASSETS.HEALTHY;
    }
  };

  return (
    <div className="villain-container" style={{ position: 'relative' }}>
      <img
        src={getAsset()}
        alt="Pool Villain"
        className={`villain-sprite ${isBeingHit ? 'shake' : ''}`}
        style={{
          transition: 'all 0.3s ease'
        }}
      />

      {/* Pool Cue Hit Effect */}
      <img
        src={VILLAIN_ASSETS.CUE}
        alt="Pool Cue"
        className={`pool-cue ${isBeingHit ? 'hit' : ''}`}
      />

      {/* Impact Effect */}
      <img
        src={VILLAIN_ASSETS.IMPACT}
        alt="Impact"
        className={`hit-impact ${isBeingHit ? 'visible' : ''}`}
      />

    </div>
  );
};
