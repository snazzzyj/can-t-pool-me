/**
 * Socket.io Client Adapter
 * Third-party abstraction for Socket.io following factory pattern
 * Centralizes all Socket.io logic for testability and flexibility
 */

import { io, type Socket } from 'socket.io-client';
import { env } from '@/config/env';

type SocketEventMap = {
  'join-session': { sessionId: string; playerName: string };
  'update-phase': { sessionId: string; phase: string };
  'player-joined': { playerId: string; playerName: string; totalPlayers: number };
  'phase-changed': { phase: string };
  'disconnect': void;
  'connect-error': { message: string };
};

type SocketEventHandler<K extends keyof SocketEventMap> = (
  data: SocketEventMap[K]
) => void;

interface SocketAdapter {
  connect(): void;
  disconnect(): void;
  emit<K extends keyof SocketEventMap>(event: K, data: SocketEventMap[K]): void;
  on<K extends keyof SocketEventMap>(event: K, handler: SocketEventHandler<K>): void;
  off<K extends keyof SocketEventMap>(event: K, handler: SocketEventHandler<K>): void;
  isConnected(): boolean;
}

let socketInstance: Socket | null = null;

/**
 * Factory function to create or retrieve Socket.io adapter
 * Follows singleton pattern to maintain single connection
 */
export function createSocketAdapter(): SocketAdapter {
  if (!socketInstance) {
    socketInstance = io(env.NEXT_PUBLIC_SOCKET_SERVER_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
  }

  return {
    connect() {
      socketInstance?.connect();
    },
    disconnect() {
      socketInstance?.disconnect();
    },
    emit<K extends keyof SocketEventMap>(event: K, data: SocketEventMap[K]) {
      socketInstance?.emit(event, data);
    },
    on<K extends keyof SocketEventMap>(event: K, handler: SocketEventHandler<K>) {
      socketInstance?.on(event, handler);
    },
    off<K extends keyof SocketEventMap>(event: K, handler: SocketEventHandler<K>) {
      socketInstance?.off(event, handler);
    },
    isConnected() {
      return socketInstance?.connected ?? false;
    },
  };
}

export type { SocketAdapter, SocketEventMap };
