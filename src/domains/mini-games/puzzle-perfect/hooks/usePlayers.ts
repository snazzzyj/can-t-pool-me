import { useMemo } from 'react';
import { PLAYERS as PLAYERS_CONSTANTS } from '../constants/puzzle-perfect.constants';
import { getAssetPath } from '@/lib/assetPath';

/**
 * Hook to get players with corrected asset paths for GitHub Pages compatibility
 */
export const usePlayers = () => {
  return useMemo(() => 
    PLAYERS_CONSTANTS.map(player => ({
      ...player,
      portrait: getAssetPath(player.portrait)
    })),
    []
  );
};
