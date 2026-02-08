import { getAssetPath } from '@/lib/assetPath';
import { AUDIO_PATHS } from '../constants/puzzle-perfect.constants';

/**
 * Apply asset paths correction to all audio paths
 */
export const getAudioPaths = () => {
  const correctedPaths: typeof AUDIO_PATHS = {} as typeof AUDIO_PATHS;
  
  for (const [key, path] of Object.entries(AUDIO_PATHS)) {
    correctedPaths[key as keyof typeof AUDIO_PATHS] = getAssetPath(path);
  }
  
  return correctedPaths;
};
