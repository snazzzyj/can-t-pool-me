"use client";

import React, { useEffect, useState } from 'react';
import { getAssetPath } from '@/shared/utils/game';

type Props = {
  onComplete: () => void;
};

const cageSrc = getAssetPath('/assets/characters/Mushi%20cage.png');
const mushiSrc = getAssetPath('/assets/characters/Mushi-hd.png');

export default function MushiIntro({ onComplete }: Props) {
  const [stage, setStage] = useState<'shake' | 'fade' | 'done'>('shake');

  useEffect(() => {
    const shakeDuration = 1400; 
    const fadeDuration = 900; 

    const t1 = setTimeout(() => setStage('fade'), shakeDuration);
    const t2 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, shakeDuration + fadeDuration + 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="mushi-intro-root">
      <div className="mushi-stack" aria-hidden={true}>
        <img
          src={cageSrc}
          alt="Mushi in cage"
          className={`mushi-image cage ${stage === 'shake' ? 'shake' : ''} ${stage === 'fade' ? 'hide' : ''}`}
        />
        <img
          src={mushiSrc}
          alt="Mushi"
          className={`mushi-image mushi ${stage === 'fade' || stage === 'done' ? 'show' : ''}`}
        />
      </div>

      <style jsx>{`
        .mushi-intro-root {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000; /* ensure full black background to remove white space */
          z-index: 60;
          pointer-events: none;
        }

        .mushi-stack {
          position: relative;
          width: min(54vw, 560px);
          height: min(54vw, 560px);
          max-width: 640px;
          max-height: 640px;
        }

        .mushi-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          transition: opacity 900ms ease, transform 400ms ease;
          opacity: 0;
          display: block;
          background: transparent;
        }

        .mushi-image.cage {
          opacity: 1;
          z-index: 2;
        }

        .mushi-image.mushi {
          z-index: 3;
        }

        .mushi-image.shake {
          animation: mushi-shake 1400ms cubic-bezier(.36,.07,.19,.97) both;
        }

        .mushi-image.hide {
          opacity: 0;
          transform: translateY(-8px) scale(0.98);
        }

        .mushi-image.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @keyframes mushi-shake {
          0% { transform: translateX(0) rotate(0deg); }
          12% { transform: translateX(-12px) rotate(-6deg); }
          36% { transform: translateX(12px) rotate(6deg); }
          60% { transform: translateX(-8px) rotate(-4deg); }
          80% { transform: translateX(8px) rotate(3deg); }
          92% { transform: translateX(-4px) rotate(-2deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
