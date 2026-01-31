import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import PixelRunner from './PixelRunner';

/**
 * Wrapper component that connects PixelRunner minigame to Redux
 * Used in scene-11-minigame-debbie
 */
export const PixelRunnerScene: React.FC = () => {
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);

  const handleComplete = () => {
    console.log('🎮 PixelRunnerScene: Minigame completed!');
    console.log('🎮 PixelRunnerScene: Dispatching nextScene()');
    dispatch(setSceneId(sceneId + 1));
  };

  return <PixelRunner onComplete={handleComplete} />;
};

export default PixelRunnerScene;