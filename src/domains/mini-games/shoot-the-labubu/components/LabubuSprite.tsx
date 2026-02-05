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
  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: labubu.position.x,
        top: labubu.position.y,
        width: LABUBU_SIZE,
        height: LABUBU_SIZE,
        transform: isFalling ? 'rotate(15deg)' : undefined,
        imageRendering: 'pixelated',
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
