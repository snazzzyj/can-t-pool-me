import { SCENE_DATABASE } from '@/config/game';

export interface SceneMenuItem {
  id: string;
  databaseKey: number;
  sceneNumber: number; // Sequential scene number (1, 2, 3...)
  title: string;
  part?: 'one' | 'two';
}

export function getAllScenes(): SceneMenuItem[] {
  const scenes: SceneMenuItem[] = [];
  let sceneCounter = 1; // For sequential numbering
  
  // Iterate through SCENE_DATABASE
  Object.entries(SCENE_DATABASE).forEach(([key, sceneData]) => {
    const databaseKey = parseInt(key, 10);
    
    if (!sceneData) {
      return;
    }
    
    // Skip transitions - only include regular scenes
    const isTransition = 'type' in sceneData && sceneData.type === 'transition';
    if (isTransition) {
      return;
    }
    
    // Determine which part based on database key
    let part: 'one' | 'two' = databaseKey <= 13 ? 'one' : 'two';
    
    scenes.push({
      id: `db-${String(databaseKey).padStart(2, '0')}`,
      databaseKey: databaseKey,
      sceneNumber: sceneCounter,
      title: sceneData.title,
      part: part
    });
    
    sceneCounter++;
  });
  
  // Sort by database key to maintain order
  return scenes.sort((a, b) => a.databaseKey - b.databaseKey);
}