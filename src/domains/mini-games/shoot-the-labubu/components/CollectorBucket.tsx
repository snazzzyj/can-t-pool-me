'use client';

import React, { memo } from 'react';
import type { CollectorState } from '../types';
import { BUCKET_HEIGHT, BUCKET_WIDTH, BASKET_SPRITE } from '../constants';

interface CollectorBucketProps {
  collector: CollectorState;
  collectorName: 'Elyse' | 'Debbie';
  portraitSrc: string;
}

const CollectorBucket: React.FC<CollectorBucketProps> = memo(
  ({ collector, collectorName, portraitSrc }) => {
    return (
      <div
        className="absolute z-[15] flex flex-col items-center"
        style={{
          left: collector.position.x - BUCKET_WIDTH / 2,
          top: collector.position.y - 48,
          width: BUCKET_WIDTH,
        }}
      >
        <div className="relative flex items-center justify-center" style={{ width: BUCKET_WIDTH, height: 64 }}>
          {/* Character Portrait (Behind) */}
          <img
            src={portraitSrc}
            alt={collectorName}
            className="h-12 w-12 rounded border border-white/30 bg-slate-800 object-cover"
            style={{
              imageRendering: 'pixelated',
              position: 'absolute',
              top: 0
            }}
            draggable={false}
          />
          {/* Basket PNG (On Top) */}
          <img
            src={BASKET_SPRITE}
            alt="basket"
            style={{
              width: BUCKET_WIDTH,
              height: BUCKET_HEIGHT,
              imageRendering: 'pixelated',
              objectFit: 'contain',
              position: 'absolute',
              top: 16, // Overlap the bottom part of the portrait
              zIndex: 2
            }}
            draggable={false}
          />
        </div>
        <div
          className="mt-1 text-[10px] font-bold text-white/90 drop-shadow-md uppercase"
          style={{ letterSpacing: '0.05em' }}
        >
          {collectorName}
        </div>
      </div>
    );
  }
);

CollectorBucket.displayName = 'CollectorBucket';
export default CollectorBucket;
