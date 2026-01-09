import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import type { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Types
type GameSession = {
  sessionId: string;
  players: Map<string, PlayerData>;
  currentPhase: string;
  createdAt: Date;
};

type PlayerData = {
  id: string;
  name: string;
  socketId: string;
  score: number;
  isConnected: boolean;
};

// Game sessions storage
const sessions = new Map<string, GameSession>();

// Socket.io event handlers
io.on('connection', (socket: Socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('join-session', (data: { sessionId: string; playerName: string }) => {
    const { sessionId, playerName } = data;

    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        sessionId,
        players: new Map(),
        currentPhase: 'menu',
        createdAt: new Date(),
      });
    }

    const session = sessions.get(sessionId)!;
    const playerId = `player-${socket.id}`;

    session.players.set(playerId, {
      id: playerId,
      name: playerName,
      socketId: socket.id,
      score: 0,
      isConnected: true,
    });

    socket.join(sessionId);
    io.to(sessionId).emit('player-joined', {
      playerId,
      playerName,
      totalPlayers: session.players.size,
    });
  });

  socket.on('update-game-phase', (data: { sessionId: string; phase: string }) => {
    const { sessionId, phase } = data;
    const session = sessions.get(sessionId);

    if (session) {
      session.currentPhase = phase;
      io.to(sessionId).emit('phase-changed', { phase });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);

    // Update player connection status
    sessions.forEach((session) => {
      session.players.forEach((player) => {
        if (player.socketId === socket.id) {
          player.isConnected = false;
        }
      });
    });
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

export { io, app };
