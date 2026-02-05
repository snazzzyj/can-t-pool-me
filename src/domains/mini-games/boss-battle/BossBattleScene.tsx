'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import BossBattle from './BossBattle';

/**
 * Wrapper for Boss Battle minigame.
 */
export function BossBattleScene() {
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);

  const handleComplete = () => {
    // We can store the score in redux if needed, but for now just advance scene
    dispatch(setSceneId(sceneId + 1));
  };

  return <BossBattle onComplete={handleComplete} />;
}

export default BossBattleScene;
