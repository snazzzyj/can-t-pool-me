/**
 * Scene-specific type definitions
 * Extend or override base game types as needed for scene configurations
 */

// Add scene-specific types here as needed
export interface SceneMetadata {
  id: string;
  title: string;
  part: 'one' | 'two' | 'transition';
  order: number;
}

// Example: Extended scene configuration type
export interface ExtendedSceneConfig {
  metadata: SceneMetadata;
  // Add additional scene properties here
}
