'use client';

import React, { memo } from 'react';
import type { LabubuEntity } from '../types';
import { LABUBU_SIZE, LABUBU_SPRITES } from '../constants';

interface LabubuSpriteProps {
  labubu: LabubuEntity;
  isFalling?: boolean;
}

const LabubuSprite: React.FC<LabubuSpriteProps> = memo(({ labubu, isFalling }) => {
  const src = LABUBU_SPRITES[labubu.color];
  // Deterministic variety based on ID
  const idNum = parseInt(labubu.id.replace(/\D/g, '') || '0', 10);
  const bobDelay = `-${(idNum % 20) / 10}s`;
  const bobDuration = `${2 + (idNum % 5) / 5}s`;

  return (
    <div
      className={`absolute will-change-transform ${!isFalling ? 'labubu-bobbing' : ''}`}
      style={{
        left: labubu.position.x,
        top: labubu.position.y,
        width: LABUBU_SIZE,
        height: LABUBU_SIZE,
        transform: isFalling ? 'rotate(15deg)' : undefined,
        imageRendering: 'pixelated',
        zIndex: isFalling ? 1 : 2,
        animationDelay: !isFalling ? bobDelay : undefined,
        animationDuration: !isFalling ? bobDuration : undefined,
      }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-contain"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />
    </div>
  );
});


LabubuSprite.displayName = 'LabubuSprite';
export default LabubuSprite;
