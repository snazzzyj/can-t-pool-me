'use client';

import { useState, useEffect } from "react";
import { DialogueBox } from "@/shared/components/dialogue-box";
import { TransitionSlide } from "@/shared/components/transition-slide";
import { SCENE_DATABASE } from "@/config/game";
import type { Scene, TransitionSlide as TransitionSlideType } from "@/shared/types/game";

type Props = {
  readonly sceneId: number;
  readonly onComplete: () => void;
};

export function DialogueScene({ sceneId, onComplete }: Props) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const sceneData = SCENE_DATABASE[sceneId] || null;
  
  // Reset dialogue index when scene changes
  useEffect(() => {
    setDialogueIndex(0);
  }, [sceneId]);
  
  if (!sceneData) {
    return <div className="text-white">Scene not found</div>;
  }

  // Handle transition slides
  if ('type' in sceneData && sceneData.type === 'transition') {
    return (
      <TransitionSlide
        title={sceneData.title}
        subtitle={sceneData.subtitle}
        backgroundImage={sceneData.backgroundImage}
        onContinue={onComplete}
      />
    );
  }

  // Handle regular dialogue scenes
  const scene = sceneData as Scene;
  const currentDialogue = scene.dialogues[dialogueIndex];
  const isLastDialogue = dialogueIndex >= scene.dialogues.length - 1;

  const handleNext = () => {
    if (isLastDialogue) {
      onComplete();
    } else {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex(dialogueIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Background Image */}
      {scene.backgroundImage && (
        <img
          src={scene.backgroundImage}
          alt={scene.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}
      
      {/* Dialogue Box */}
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
            className="bg-slate-600 hover:bg-slate-700 text-black py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-black py-2 px-4 rounded"
          >
            {isLastDialogue ? 'Next Scene' : 'Next'}
          </button>
        </DialogueBox.Controls>
      </DialogueBox.Root>
    </div>
  );
}