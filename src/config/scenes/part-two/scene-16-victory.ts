import VictoryScene from '@/domains/mini-games/victory/VictoryScene';
import type { Scene } from '@/shared/types/game';

export const scene16Victory: Scene = {
  sceneId: 16,
  title: 'Victory',
  backgroundImage: '/assets/backgrounds/scene-15.jpg',
  backgroundMusic: '/assets/audio/FANCY SOCKS AND BIRKENSTOCKS 8-BIT.mp3',
  duration: 0,
  dialogues: [],
  minigameComponent: VictoryScene as React.ComponentType<{ onComplete: () => void }>
};

export default scene16Victory;
