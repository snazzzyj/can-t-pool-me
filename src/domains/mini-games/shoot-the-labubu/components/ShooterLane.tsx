'use client';

import React, { memo } from 'react';
import type { ShooterState } from '../types';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

interface ShooterLaneProps {
  shooter: ShooterState;
  shooterName: 'Rab' | 'Jenn' | 'Joel';
  portraitSrc: string;
}

const ShooterLane: React.FC<ShooterLaneProps> = memo(({ shooter, shooterName, portraitSrc }) => {
  const pct = shooter.maxAmmo ? shooter.ammo / shooter.maxAmmo : 0;
  return (
    <div
      className={`${pressStart2P.className} absolute flex flex-col items-center`}
      style={{
        left: shooter.position.x - 32,
        top: shooter.position.y - 80,
        width: 64,
        zIndex: 4,
      }}
    >
      <div
        className={`relative overflow-hidden rounded border-2 border-white/30 bg-slate-800 ${!shooter.isAlive ? 'opacity-50 grayscale' : ''}`}
        style={{ width: 64, height: 64 }}
      >
        <img
          src={portraitSrc}
          alt={shooterName}
          className="h-full w-full object-cover"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
        {!shooter.isAlive && (
          <div
            className="absolute inset-0 flex items-center justify-center text-red-600"
            style={{ fontSize: 36 }}
          >
            ✕
          </div>
        )}
      </div>
      <div className="mt-1 text-[10px] text-white/90">{shooterName}</div>
      <div className="mt-0.5 h-2 w-[64px] overflow-hidden rounded bg-gray-800">
        <div
          className={`h-full rounded ${shooter.isAlive ? 'bg-blue-500' : 'bg-red-900'}`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
});

ShooterLane.displayName = 'ShooterLane';
export default ShooterLane;
