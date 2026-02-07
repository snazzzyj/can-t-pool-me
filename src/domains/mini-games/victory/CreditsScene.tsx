import React, { useEffect } from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
});

const CREDIT_ITEMS = [
  { role: 'PRODUCTION', name: 'OUTTA\'CONTEXT PRODUCTIONS' },
  { role: 'LEAD VIBE CODER', name: 'HACKTRESS' },
  { role: 'ART & DESIGN', name: '.PXL' },
  { role: 'LEAD DEVELOPER', name: 'AI' },
  { role: 'LEVEL DESIGN CONSULTANTS', name: 'DEBBIE, ELYSE, JOEL' },
  { role: 'WITH CAMEO APPEARNCE FROM', name: 'FINN THE GINGER' },
  { role: 'SPECIAL THANKS', name: 'MUSHI' },
];

interface CreditsSceneProps {
  onComplete: () => void;
}

export const CreditsScene: React.FC<CreditsSceneProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 22000); // Slightly longer than the 20s animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`credits-container ${pressStart2P.className}`}>
      <div className="credits-scroller">
        <h2 className="text-4xl text-yellow-400 mb-16">CREDITS</h2>

        <div className="space-y-12">
          {CREDIT_ITEMS.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-purple-400 text-sm">{item.role}</span>
              <span className="text-white text-xl">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
