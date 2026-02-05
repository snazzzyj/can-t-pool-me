'use client';

import React from 'react';
import type { ShooterState, CollectorState } from '../types';
import { SCREEN_HEIGHT, TOP_BAR_HEIGHT, BOTTOM_BAR_TOP } from '../constants';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

interface GameHUDProps {
  level: number;
  wave: number;
  sharedHealth: number;
  maxHealth: number;
  waveTimer: number;
  shooters: { rab: ShooterState; jenn: ShooterState; joel: ShooterState };
  collectors: { elyse: CollectorState; debbie: CollectorState };
}

export const GameHUD: React.FC<GameHUDProps> = ({
  level,
  wave,
  sharedHealth,
  maxHealth,
  waveTimer,
  shooters,
  collectors,
}) => {
  const m = Math.floor(waveTimer / 60);
  const s = Math.floor(waveTimer % 60);
  const timerStr = `${m}:${s.toString().padStart(2, '0')}`;
  const healthPct = Math.max(0, sharedHealth / maxHealth);

  return (
    <>
      {/* Top bar */}
      <div
        className={`${pressStart2P.className} absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-black/70 px-5 py-3 text-white`}
        style={{ height: TOP_BAR_HEIGHT }}
      >
        <div className="text-sm">
          Level {level} – Wave {wave}/3
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-1 text-xs text-white/80">HP: {sharedHealth}/{maxHealth}</div>
          <div
            className="h-5 w-[200px] overflow-hidden rounded bg-gray-800"
            style={{ minWidth: 200 }}
          >
            <div
              className="h-full rounded bg-red-600 transition-all duration-150"
              style={{ width: `${healthPct * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm tabular-nums">{timerStr}</div>
      </div>

      {/* Bottom: shooter ammo + collector body counts */}
      <div
        className={`${pressStart2P.className} absolute left-0 right-0 bottom-0 z-10 flex items-end justify-between bg-black/70 px-4 py-3 text-white`}
        style={{ top: BOTTOM_BAR_TOP, height: SCREEN_HEIGHT - BOTTOM_BAR_TOP }}
      >
        <div className="text-xs">
          Elyse: {collectors.elyse.bodiesCaught} bodies
        </div>
        <div className="flex gap-8">
          {(['rab', 'jenn', 'joel'] as const).map((id) => {
            const s = shooters[id];
            const name = id === 'rab' ? 'Rab' : id === 'jenn' ? 'Jenn' : 'Joel';
            const pct = s.maxAmmo ? s.ammo / s.maxAmmo : 0;
            return (
              <div key={id} className="flex flex-col items-center">
                <div className="mb-1 text-[10px] text-white/80">{name}</div>
                <div className="h-3 w-[100px] overflow-hidden rounded bg-gray-800">
                  <div
                    className={`h-full rounded transition-all duration-150 ${s.isAlive ? 'bg-blue-500' : 'bg-red-900'}`}
                    style={{ width: `${pct * 100}%` }}
                  />
                </div>
                <div className="mt-0.5 text-[10px] tabular-nums">
                  {s.ammo}/{s.maxAmmo}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-xs">
          Debbie: {collectors.debbie.bodiesCaught} bodies
        </div>
      </div>
    </>
  );
};

export default GameHUD;
