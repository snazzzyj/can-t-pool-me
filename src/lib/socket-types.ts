/**
 * Socket.io event types and handlers
 */

export type SocketEventMap = {
  'join-session': { sessionId: string; playerName: string };
  'update-game-phase': { sessionId: string; phase: string };
  'player-joined': { playerId: string; playerName: string; totalPlayers: number };
  'phase-changed': { phase: string };
  'game-error': { message: string };
};
