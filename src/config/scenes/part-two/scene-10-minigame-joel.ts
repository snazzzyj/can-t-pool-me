/**
 * Scene 10: Hacking the Mainframe (Hackerman Minigame)
 * Sharker tasks Hackerman with hacking the mainframe to locate Mushi's whereabouts.
 */

const scene10MinigameJoel = {
  sceneId: 10,
  id: 'scene-10-minigame-joel',
  title: 'Hacking the Mainframe',
  part: 'two' as const,
  order: 16,
  backgroundImage: '/assets/backgrounds/scene-10.jpg',
  backgroundMusic: '/assets/audio/music/scene-10.mp3',
  duration: 10,
  dialogues: [
    {
      speaker: 'Sharker',
      text: 'First thing we need to do is find where they\'re holding Mushi.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Hackerman',
      text: 'I\'m on it. Let me hack the mainframe.',
      characterImage: '/assets/characters/Joel-Vinny.png',
    },
  ],
};

export default scene10MinigameJoel;