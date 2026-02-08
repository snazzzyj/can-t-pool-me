/**
 * Utility to get the correct asset path considering basePath configuration
 * On GitHub Pages (production), basePath is `/can-t-pool-me`
 * In development, basePath is empty
 */

const getBasePath = (): string => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NODE_ENV === 'production' ? '/can-t-pool-me' : '';
  }
  
  // Client-side: check the actual base element or use environment
  const baseElement = document.querySelector('base');
  if (baseElement?.href) {
    const base = new URL(baseElement.href).pathname.replace(/\/$/, '');
    return base;
  }
  
  return process.env.NODE_ENV === 'production' ? '/can-t-pool-me' : '';
};

/**
 * Constructs the full asset path with basePath prefix
 * @param assetPath - The relative asset path (e.g., '/assets/characters/Jenn-1.png')
 * @returns The full path with basePath applied (e.g., '/can-t-pool-me/assets/characters/Jenn-1.png')
 */
export const getAssetPath = (assetPath: string): string => {
  if (!assetPath) return '';
  
  // Already has basePath, don't double it
  if (assetPath.startsWith('/can-t-pool-me/')) {
    return assetPath;
  }
  
  const basePath = getBasePath();
  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  
  return basePath ? `${basePath}${normalizedPath}` : normalizedPath;
};
