'use client';

import clsx from'clsx';

type Props = {
  readonly onStartClick: () => void;
};

export function WelcomeScreen({ onStartClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Can't Pool Me
          </h1>

          <p className="text-2xl text-purple-200 mb-8"
      </div>