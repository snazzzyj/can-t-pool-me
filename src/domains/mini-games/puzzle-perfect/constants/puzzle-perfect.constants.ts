import { PlayerInfo } from '../types/puzzle-perfect.types';

export const PLAYERS: PlayerInfo[] = [
  { id: 'jenn', name: 'Jenn', color: '#00FFFF', portrait: '/assets/characters/Jenn-1.png' },
  { id: 'elyse', name: 'Elyse', color: '#FFA500', portrait: '/assets/characters/Elyse-1.png' },
  { id: 'rab', name: 'Rab', color: '#9d00ff', portrait: '/assets/characters/Rab-1.png' },
  { id: 'debbie', name: 'Debbie', color: '#FF00FF', portrait: '/assets/characters/Debbie-1.png' },
  { id: 'joel', name: 'Joel', color: '#00FF00', portrait: '/assets/characters/Joel-1.png' },
];

export const MAX_LIVES = 3;

export const ROUND_CONFIGS = {
  1: {
    timeLimit: 20000, // ms
    puzzlesPerPlayer: 5,
    orientations: 5, // 72 degrees
    complexity: 'moderate',
    label: 'Introduction',
  },
  2: {
    timeLimit: 15000,
    puzzlesPerPlayer: 5,
    orientations: 6, // 60 degrees
    complexity: 'increased',
    label: 'Escalation',
  },
  3: {
    timeLimit: 10000,
    puzzlesPerPlayer: 5,
    orientations: 8, // 45 degrees
    complexity: 'high',
    label: 'Challenge',
  },
  4: {
    timeLimit: 8000,
    puzzlesPerPlayer: 2,
    orientations: 3, // 120 degrees
    complexity: 'frenzy',
    label: 'FRENZY MODE',
  },
};

export const AUDIO_PATHS = {
  rotate: '/assets/audio/sfx/rotate.mp3',
  confirm: '/assets/audio/sfx/confirm_lock.mp3',
  error: '/assets/audio/sfx/alarm_error.mp3',
  drop: '/assets/audio/sfx/whoosh_drop.mp3',
  flyAway: '/assets/audio/sfx/whoosh_up.mp3',
  lifeLost: '/assets/audio/sfx/glass_break.mp3',
  timerWarning: '/assets/audio/sfx/warning_beep.mp3',
  roundComplete: '/assets/audio/sfx/fanfare.mp3',
  roundFailed: '/assets/audio/sfx/failure_tone.mp3',
  bgm1: '/assets/audio/music/minigame_bgm_1.mp3',
  bgmFrenzy: '/assets/audio/music/minigame_bgm_frenzy.mp3',
};
