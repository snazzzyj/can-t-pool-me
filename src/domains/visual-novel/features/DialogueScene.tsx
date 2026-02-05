'use client';

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DialogueBox } from "@/shared/components/dialogue-box";
import { TransitionSlide } from "@/shared/components/transition-slide";
import { SceneNavigationMenu } from '@/shared/components/scene-navigation-menu';
import { SCENE_DATABASE } from "@/config/game";
import { features } from "@/config/features";
import { selectSceneId, setSceneId } from '@/store/slices/game-slice';
import type { Scene } from "@/shared/types/game";
import { useBackgroundMusic } from '@/shared/hooks/useBackgroundMusic'; // ADD THIS IMPORT

type Props = {
  readonly onComplete?: () => void;
};

export function DialogueScene({ onComplete }: Props) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showMinigame, setShowMinigame] = useState(false);
  const dispatch = useDispatch();

  const sceneId = useSelector(selectSceneId);
  const sceneData = SCENE_DATABASE[sceneId] || null;

  useBackgroundMusic('backgroundMusic' in (sceneData || {}) ? sceneData.backgroundMusic : undefined);

  useEffect(() => {
    console.log('Scene changed to:', sceneId);
    setDialogueIndex(0);
    // If scene has minigame and no dialogues, SHOW it immediately
    if (sceneData && 'minigameComponent' in sceneData && sceneData.minigameComponent && (!('dialogues' in sceneData) || sceneData.dialogues.length === 0)) {
      setShowMinigame(true);
    } else {
      setShowMinigame(false);
    }
  }, [sceneId, sceneData]);

  if (!sceneData) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">
          Scene {sceneId} not found in database
        </div>
      </div>
    );
  }

  // Handle transition completion
  const handleTransitionComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      const nextSceneId = sceneId + 1;
      if (SCENE_DATABASE[nextSceneId]) {
        console.log('Auto-advancing to next scene:', nextSceneId);
        dispatch(setSceneId(nextSceneId));
      } else {
        console.log('No next scene available');
      }
    }
  };

  // Handle transition slides
  if ('type' in sceneData && sceneData.type === 'transition') {
    return (
      <>
        <TransitionSlide
          title={sceneData.title}
          subtitle={sceneData.subtitle}
          backgroundImage={sceneData.backgroundImage}
          onContinue={handleTransitionComplete}
        />
        {features.SCENE_NAVIGATION_MENU && <SceneNavigationMenu />}
      </>
    );
  }

  // Handle regular dialogue scenes
  const scene = sceneData as Scene;

  if (showMinigame && scene.minigameComponent) {
    const MinigameComponent = scene.minigameComponent;
    console.log('🎮 Rendering minigame component for scene:', sceneId);
    return <MinigameComponent onComplete={() => {
      console.log('✅ Minigame completed, advancing to next scene');
      const nextSceneId = sceneId + 1;
      if (SCENE_DATABASE[nextSceneId]) {
        dispatch(setSceneId(nextSceneId));
      } else {
        console.log('No next scene available - end of game');
      }
    }} />;
  }

  const dialogues = scene.dialogues || [];
  const currentDialogue = dialogues[dialogueIndex];
  const isLastDialogue = dialogueIndex >= dialogues.length - 1;

  const handleNext = () => {
    if (isLastDialogue) {
      if (scene.minigameComponent) {
        console.log('🎮 Scene has minigame, showing it now');
        setShowMinigame(true);
      } else if (onComplete) {
        onComplete();
      } else {
        const nextSceneId = sceneId + 1;
        if (SCENE_DATABASE[nextSceneId]) {
          console.log('Advancing to next scene:', nextSceneId);
          dispatch(setSceneId(nextSceneId));
        } else {
          console.log('No next scene available - end of game');
        }
      }
    } else {
      setDialogueIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {scene.backgroundImage && (
        <img
          src={scene.backgroundImage}
          alt={scene.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}

      <DialogueBox.Root isAnimating={true}>
        {currentDialogue && (
          <>
            <DialogueBox.Speaker
              name={currentDialogue.speaker}
              image={currentDialogue.characterImage}
            />
            <DialogueBox.Text>{currentDialogue.text}</DialogueBox.Text>
          </>
        )}

        <DialogueBox.Controls>
          <button
            onClick={handlePrevious}
            disabled={dialogueIndex === 0}
            className="bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            {isLastDialogue ? (scene.minigameComponent ? 'Start Game' : 'Next') : 'Next'}
          </button>
        </DialogueBox.Controls>
      </DialogueBox.Root>

      {/* Scene Navigation Menu */}
      {features.SCENE_NAVIGATION_MENU && <SceneNavigationMenu />}
    </div>
  );
}