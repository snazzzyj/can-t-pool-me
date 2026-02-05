'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import ShootTheLabubu from './ShootTheLabubu';

/**
 * Wrapper that connects Shoot the Labubu minigame to Redux.
 * Used for scene-13-minigame-elyse (Elyse's minigame).
 */
export function ShootTheLabubuScene() {
  const dispatch = useDispatch();
  const sceneId = useSelector(selectSceneId);

  const handleComplete = () => {
    dispatch(setSceneId(sceneId + 1));
  };

  return <ShootTheLabubu onComplete={handleComplete} />;
}

export default ShootTheLabubuScene;
