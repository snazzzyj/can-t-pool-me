import { getAssetPath } from '@/lib/assetPath';

const LEVEL_BACKGROUNDS = {
  1: '/assets/minigames/shoot-the-labubu/backgrounds/Mansion1.png',
  2: '/assets/minigames/shoot-the-labubu/backgrounds/Pool_basement.png',
  3: '/assets/minigames/shoot-the-labubu/backgrounds/Villain_Lair.png',
} as const;

export const getLevelBackgroundStyle = (level: 1 | 2 | 3) => ({
  backgroundImage: `url('${getAssetPath(LEVEL_BACKGROUNDS[level])}')`,
  backgroundSize: '100% 100%',
  ...(level === 3 && {
    boxShadow: 'inset 0 0 200px rgba(0, 150, 255, 0.08)',
  }),
});
