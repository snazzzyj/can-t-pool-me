'use client';

import { WelcomeScreen } from '@/shared/components/welcome-screen';
import { DialogueScene } from '../domains/visual-novel/features/DialogueScene';
import PixelRunner from '../domains/mini-games/pxl-runner/PxlRunner';
import { SceneNavigationMenu } from '@/shared/components/scene-navigation-menu';
import { useSelector, useDispatch } from 'react-redux';
import { selectSceneId, setSceneId, selectGamePhase, setPhase } from '@/store/slices/game-slice';

export default function Home() {
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);
  const phase = useSelector(selectGamePhase);

  if (phase === 'menu') {
    return <WelcomeScreen onStartClick={() => dispatch(setPhase('visual-novel-part-1'))} />;
  }

  console.log('Current sceneId:', sceneId, 'Phase:', phase);

  return (
    <>
      {/* Scene Navigation Menu - Always visible except on welcome screen */}
      <SceneNavigationMenu />

      {/* Debbie's Pixel Runner minigame (Scene 11) */}
      {sceneId === 17 ? (
        <PixelRunner onComplete={() => dispatch(setSceneId(sceneId + 1))} />
      ) : (
        <DialogueScene />
      )}
    </>
  );
}