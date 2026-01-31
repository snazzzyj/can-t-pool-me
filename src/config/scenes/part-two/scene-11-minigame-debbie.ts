/**
 * Scene 11: On the Way to Save the Day (Pxl Minigame)
 * The team discovers the location and Pxl offers a shortcut to save time.
 */

import type { Scene } from '@/shared/types/game';
import PixelRunnerScene from '@/domains/mini-games/pxl-runner/PixelRunnerScene';

export const scene11MinigameDebbie: Scene = {
  sceneId: 11,
  title: 'On the Way to Save the Day',
  backgroundImage: '/assets/backgrounds/scene-11.jpg',
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
      text: 'I know where it is. But it\'s gonna be like a 5 hour drive.',
      characterImage: '/assets/characters/Joel-Vinny.png',
    },
    {
      speaker: 'Sharker',
      text: 'We don\'t have time.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Pxl',
      text: 'I think I know a shortcut…',
      characterImage: '/assets/characters/Debbie-1.png',
    },
  ],

  minigameComponent: PixelRunnerScene,
};

export default scene11MinigameDebbie;