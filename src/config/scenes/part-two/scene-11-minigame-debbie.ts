/**
 * Scene 11: On the Way to Save the Day (Pxl Minigame)
 * The team discovers the location and Pxl offers a shortcut to save time.
 */

const scene11MinigameDebbie = {
  sceneId: 11,
  id: 'scene-11-minigame-debbie',
  title: 'On the Way to Save the Day',
  part: 'two' as const,
  order: 17,
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
};

export default scene11MinigameDebbie;