'use client';

import React, { memo } from 'react';
import type { CollectorState } from '../types';
import { BOTTOM_BAR_TOP, BUCKET_HEIGHT } from '../constants';

interface CollectorBucketProps {
  collector: CollectorState;
  collectorName: 'Elyse' | 'Debbie';
  portraitSrc: string;
}

const CollectorBucket: React.FC<CollectorBucketProps> = memo(
  ({ collector, collectorName, portraitSrc }) => {
    // collector.position.y is the top of the bucket (for collision); portrait sits above
    return (
      <div
        className="absolute z-[4] flex flex-col items-center"
        style={{
          left: collector.position.x - 24,
          top: collector.position.y - 48, // portrait 48px above bucket top
        }}
      >
        <img
          src={portraitSrc}
          alt={collectorName}
          className="h-12 w-12 rounded border border-white/30 object-cover"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
        <span
          className="text-[28px] leading-none"
          style={{ width: 48, height: 48, display: 'inline-block', textAlign: 'center' }}
          role="img"
          aria-label="bucket"
        >
          🪣
        </span>
      </div>
    );
  }
);

CollectorBucket.displayName = 'CollectorBucket';
export default CollectorBucket;
