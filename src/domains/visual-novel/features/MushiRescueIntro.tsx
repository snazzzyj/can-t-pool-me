import React, { useEffect, useState } from 'react';
import { getAssetPath } from '@/shared/utils/game';

interface MushiRescueIntroProps {
  onComplete: () => void;
}

export const MushiRescueIntro: React.FC<MushiRescueIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'cage' | 'shake' | 'fade' | 'mushi'>('cage');

  useEffect(() => {
    // Sequence

    // 1. Start with cage - wait 1s
    const shakeTimer = setTimeout(() => {
      setPhase('shake');
    }, 1000);

    // 2. Shake for 1.5s then fade
    const fadeTimer = setTimeout(() => {
      setPhase('fade');
    }, 2500);

    // 3. Fade transition (0.5s) then show Mushi
    const mushiTimer = setTimeout(() => {
      setPhase('mushi');
    }, 3000);

    // 4. Show Mushi for 1.5s then complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(mushiTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none">
      <style jsx>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        .shake-animation {
          animation: shake 0.5s;
          animation-iteration-count: infinite;
        }
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>

      {(phase === 'cage' || phase === 'shake' || phase === 'fade') && (
        <div className={`
          relative w-[600px] h-[600px] flex items-center justify-center
          ${phase === 'shake' ? 'shake-animation' : ''}
          ${phase === 'fade' ? 'fade-out' : 'opacity-100'}
        `}>
          <img
            src={getAssetPath('/assets/characters/Mushi cage.png')}
            alt="Mushi in Cage"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {(phase === 'fade' || phase === 'mushi') && (
        <div className={`
          absolute w-[600px] h-[600px] flex items-center justify-center
          ${phase === 'fade' ? 'opacity-0' : 'fade-in'}
        `}>
          <img
            src={getAssetPath('/assets/characters/Mushi.png')}
            alt="Mushi Free"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
