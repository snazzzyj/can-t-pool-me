'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/shared/components/welcome-screen';
import { DialogueScene } from '../domains/visual-novel/features/DialogueScene';
import PixelRunner from '../domains/mini-games/pxl-runner/PxlRunner';
import { useSelector, useDispatch } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(true);
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);

  if (!gameStarted) {
    return <WelcomeScreen onStartClick={() => setGameStarted(true)} />;
  }

  // Debbie's Pixel Runner minigame (Scene 11)
  if (sceneId === 11) {
    return <PixelRunner onComplete={() => dispatch(setSceneId(sceneId + 1))} />;
  }
  console.log('Current sceneId:', sceneId);

  return <DialogueScene />;
}

