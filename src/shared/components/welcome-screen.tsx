'use client';

import clsx from'clsx';

type Props = {
  readonly onStartClick: () => void;
};

export function WelcomeScreen({ onStartClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Can't Pool Me
          </h1>

          <p className="text-2xl text-purple-200 mb-8">
            A Birthday Adventure
          </p>

          <button
            onClick={onStartClick}
            className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Start Game
          </button>
        </div>

      </div>
  );
}