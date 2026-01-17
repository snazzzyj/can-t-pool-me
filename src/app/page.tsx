'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/shared/components/welcome-screen';
import { DialogueScene } from '../domains/visual-novel/features/DialogueScene';
import { GAME_CONFIG } from '@/config/game';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSceneId, setCurrentSceneId] = useState(1);

  if (!gameStarted) {
    return <WelcomeScreen onStartClick={() => setGameStarted(true)} />;
  }

  const handleSceneComplete = () => {
    const nextSceneId = currentSceneId + 1;
    if (nextSceneId <= GAME_CONFIG.SCENE_COUNT) {
      setCurrentSceneId(nextSceneId);
    } else {
      alert('Game Complete!');
    }
  };

  return (
    <DialogueScene
      key={currentSceneId}
      sceneId={currentSceneId}
      onComplete={handleSceneComplete}
    />
  );
}