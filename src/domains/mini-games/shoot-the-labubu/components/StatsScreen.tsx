'use client';

import React from 'react';
import type { ShooterStats } from '../types';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

interface StatsScreenProps {
  level: number;
  stats: {
    totalBodiesCaught: number;
    elyseBodies: number;
    debbieBodies: number;
    rabStats: ShooterStats;
    jennStats: ShooterStats;
    joelStats: ShooterStats;
  };
  onContinue: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({
  level,
  stats,
  onContinue,
}) => {
  const acc = (s: ShooterStats) =>
    s.shotsFired > 0 ? Math.round((s.shotsHit / s.shotsFired) * 100) : 0;

  return (
    <div
      className={`${pressStart2P.className} absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 p-8 text-white`}
    >
      <h2 className="mb-6 text-2xl">LEVEL {level} COMPLETE</h2>
      <div className="mb-6 max-w-md space-y-2 text-sm">
        <p>TEAM BODIES COLLECTED: {stats.totalBodiesCaught}</p>
        <p className="border-b border-white/20 pb-2">COLLECTORS</p>
        <p>Elyse: {stats.elyseBodies} bodies</p>
        <p>Debbie: {stats.debbieBodies} bodies</p>
        <p className="border-b border-white/20 pb-2 pt-2">SHOOTERS</p>
        <p>Rab – Accuracy: {acc(stats.rabStats)}% | Kills: {stats.rabStats.kills}</p>
        <p>Jenn – Accuracy: {acc(stats.jennStats)}% | Kills: {stats.jennStats.kills}</p>
        <p>Joel – Accuracy: {acc(stats.joelStats)}% | Kills: {stats.joelStats.kills}</p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="rounded border-2 border-white bg-white px-6 py-2 text-black hover:bg-gray-200"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default StatsScreen;
