export const PLAYER_CONFIG = [
  { id: 1, name: 'Rab', key: 'Q', portrait: '/assets/characters/Rab-1.png' },
  { id: 2, name: 'Elyse', key: 'W', portrait: '/assets/characters/Elyse-1.png' },
  { id: 3, name: 'Debbie', key: 'E', portrait: '/assets/characters/Debbie-1.png' },
  { id: 4, name: 'Jenn', key: 'R', portrait: '/assets/characters/Jenn-1.png' },
  { id: 5, name: 'Joel', key: 'T', portrait: '/assets/characters/Joel-1.png' },
] as const;

export const TIMING_LEVELS = {
  1: { greenZoneSize: 30, lineSpeed: 2000, timeLimit: 10 },
  2: { greenZoneSize: 20, lineSpeed: 1500, timeLimit: 10 },
  3: { greenZoneSize: 10, lineSpeed: 1000, timeLimit: 10 },
} as const;

export const FINAL_LEVEL_CONFIG = {
  targetPresses: 100,
  timeLimit: 15,
};

export const SCORING = {
  PERFECT_HIT: 100,
  GOOD_HIT: 50,
  ALL_SUCCESS_BONUS: 200,
  LEVEL_COMPLETE_BONUS: 100,
  FINAL_PRESS_POINTS: 10,
  FINAL_COMPLETION_BONUS: 500,
};

export const VILLAIN_ASSETS = {
  ALIVE: '/assets/characters/Villain/Hooded-Villain.png',
  DEAD: '/assets/characters/Villain/Villain_Dead.png',
};
