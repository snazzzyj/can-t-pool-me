/**
 * Scene 11: On the Way to Save the Day (Pxl Minigame)
 * The team discovers the location and Pxl offers a shortcut to save time.
 */

import type { Scene } from '@/shared/types/game';
import PixelRunnerScene from '@/domains/mini-games/pxl-runner/PxlRunnerScene';

export const scene11MinigameDebbie: Scene = {
  sceneId: 11,
  title: 'Roadtrip',
  backgroundImage: '/assets/backgrounds/Laptop_Research2.png',
  backgroundMusic: '/assets/audio/music/scene-11.mp3',
  duration: 20,
  dialogues: [
    {
      speaker: 'Hacktress',
      text: 'Where the hell is that?!',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Hackerman',
      text: 'Only about halfway across the world.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Sharker',
      text: 'We don\'t have time.',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
    {
      speaker: 'Pxl',
      text: 'I think I know a way we can get there fast...',
      characterImage: '/assets/characters/Debbie-1.png',
    },
  ],

  minigameComponent: PixelRunnerScene,
};

export default scene11MinigameDebbie;