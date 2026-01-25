/**
 * Scene 15: Rescue Mushi
 * The team scrambles to save Mushi and confronts the pool villain in a final showdown
 */

const scene15RescueMushi = {
  sceneId: 15,
  id: 'scene-15-rescue-mushi',
  title: 'Rescue Mushi',
  part: 'two' as const,
  order: 21,
  backgroundImage: '/assets/backgrounds/scene-15.jpg',
  backgroundMusic: '/assets/audio/music/scene-15.mp3',
  duration: 30,
  dialogues: [
    {
      speaker: 'Everyone',
      text: 'Mushi!',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Mushi',
      text: '<3 <3 (only replies in emojis)',
      characterImage: '/assets/characters/Mushi.png',
    },
    {
      speaker: 'Pool villain',
      text: 'You\'ll never get away with this!',
      characterImage: '/assets/characters/Pool-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'No, you\'ll never get away with this.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Narrator',
      text: '*Rab destroys the cue*',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Sharker',
      text: 'Memento Mori bitch.',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
};

export default scene15RescueMushi;