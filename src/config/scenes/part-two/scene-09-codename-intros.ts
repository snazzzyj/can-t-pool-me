import { CodenameIntroAnim } from '@/domains/visual-novel/features/CodenameIntroAnim';

export const scene09CodenameIntros = {
  sceneId: 9,
  id: 'scene-09-codename-intros',
  title: 'Codename Intros',
  part: 'two' as const,
  order: 15,
  backgroundImage: '/assets/backgrounds/scene-1.jpg',
  backgroundMusic: '/assets/audio/music/scene-1.mp3',
  duration: 50,
  minigameComponent: CodenameIntroAnim,
  dialogues: [],
};

export default scene09CodenameIntros;