'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/shared/components/welcome-screen';
import { DialogueScene } from '../domains/visual-novel/features/DialogueScene';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <WelcomeScreen onStartClick={() => setGameStarted(true)} />;
  }

  return <DialogueScene />;
}