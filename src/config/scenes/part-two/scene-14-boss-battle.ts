/**
 * Scene 14: Boss Battle
 * The team confronts the Pool Villain to rescue Mushi in an epic showdown.
 */

import type { Scene } from '@/shared/types/game';
import BossBattleScene from '@/domains/mini-games/boss-battle/BossBattleScene';

export const scene14BossBattle: Scene = {
  sceneId: 14,
  title: 'Boss Battle',
  backgroundImage: '/assets/minigames/shoot-the-labubu/backgrounds/Villain_Lair.png',
  backgroundMusic: '/assets/audio/music/scene-14.mp3',
  duration: 20,
  dialogues: [
    {
      speaker: 'Pool Villain',
      text: 'What?! How did you get in here?',
      characterImage: '/assets/characters/Villain/Hooded-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'Doesn\'t matter. Give us back Mushi or else.',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
    {
      speaker: 'Pool Villain',
      text: 'Hahahah you imbeciles think you can defeat me? You can die trying.',
      characterImage: '/assets/characters/Villain/Hooded-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'Oh we\'ve done more impossible things. Trust us.',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
  minigameComponent: BossBattleScene,
};

export default scene14BossBattle;