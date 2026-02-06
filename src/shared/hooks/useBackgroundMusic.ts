import { useEffect, useRef } from 'react';
import { getAssetPath } from '@/shared/utils/game';

export const useBackgroundMusic = (musicPath?: string, volume: number = 0.5) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicPath) return;

    // Create audio element
    const audio = new Audio(getAssetPath(musicPath));
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Play audio (with error handling for autoplay policy)
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('🎵 Background music started:', musicPath);
      } catch (error) {
        console.warn('⚠️ Autoplay prevented. User interaction required:', error);
      }
    };

    playAudio();

    // Cleanup: stop music when component unmounts or music changes
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [musicPath, volume]);

  return audioRef;
};