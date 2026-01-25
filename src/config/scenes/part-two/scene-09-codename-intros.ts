/**
 * Scene 09: Codename Intros
 * The team introduces themselves with their hacker codenames.
 */

const scene09CodenameIntros = {
  sceneId: 9,
  id: 'scene-09-codename-intros',
  title: 'Codename Intros',
  part: 'two' as const,
  order: 15,
  backgroundImage: '/assets/backgrounds/scene-1.jpg',
  backgroundMusic: '/assets/audio/music/scene-1.mp3',
  duration: 50,

  dialogues: [
    {
      speaker: 'Rab',
      text: 'Alright team, let\'s go around and introduce our codenames',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Joel',
      text: 'I\'m Hackerman!',
      characterImage: '/assets/characters/Joel-Vinny.png',
    },
    {
      speaker: 'Jenn',
      text: 'Call me Hacktress',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'You can call me .pxl',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'Big Iron McGee, at your service',
      characterImage: '/assets/characters/Elyse-1.png',
    },
  ],
};

export default scene09CodenameIntros;