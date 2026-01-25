/**
 * Game Feature Flags and Feature Toggles
 */

export const features = {
  enableMultiplayer: true,
  enableAudio: true,
  enableAnimations: true,
  enableDebugMode: process.env.NODE_ENV === 'development',
  SCENE_NAVIGATION_MENU: true, // Add this line
} as const;