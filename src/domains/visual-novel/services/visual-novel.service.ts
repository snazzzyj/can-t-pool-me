/**
 * Visual Novel Service
 * Business logic for scene progression, dialogue management, and game state
 * Separated from presentation layer (components)
 */

import type { Scene } from '@/shared/types/game';
import { SCENE_DATABASE } from '@/config/game';

type SceneNavigationState = {
  readonly current: number;
  readonly isCompleted: boolean;
  readonly dialogueIndex: number;
};

/**
 * Service for managing visual novel game flow
 * Pure functions operating on scene data - can be tested independently
 */
export const visualNovelService = {
  /**
   * Get scene by ID
   */
  getScene(sceneId: number): Scene | null {
    return SCENE_DATABASE[sceneId] ?? null;
  },

  /**
   * Get current dialogue in a scene
   */
  getCurrentDialogue(scene: Scene, dialogueIndex: number) {
    return scene.dialogues[dialogueIndex] ?? null;
  },

  /**
   * Check if scene is complete
   */
  isSceneComplete(scene: Scene, dialogueIndex: number): boolean {
    return dialogueIndex >= scene.dialogues.length - 1;
  },

  /**
   * Check if all scenes are complete
   */
  isGameComplete(currentSceneId: number, totalScenes: number): boolean {
    return currentSceneId >= totalScenes;
  },

  /**
   * Calculate next scene ID
   */
  getNextSceneId(currentSceneId: number, totalScenes: number): number | null {
    const nextId = currentSceneId + 1;
    return nextId <= totalScenes ? nextId : null;
  },
};

export type { SceneNavigationState };
