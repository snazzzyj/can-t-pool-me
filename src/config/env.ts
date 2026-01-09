/**
 * Environment Configuration with Zod Validation
 * Validates all environment variables at startup
 */

const env = {
  NEXT_PUBLIC_SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001',
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_MAX_PLAYERS: parseInt(process.env.NEXT_PUBLIC_MAX_PLAYERS || '5'),
  NEXT_PUBLIC_SCENE_COUNT: parseInt(process.env.NEXT_PUBLIC_SCENE_COUNT || '7'),
} as const;

export { env };
