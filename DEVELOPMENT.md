# Can't Pool Me - Birthday Game

An interactive web-based game built with Next.js 13.5.4, React 18.2, Redux Toolkit, and real-time WebSocket communication.

## Tech Stack

- **Frontend**: Next.js 13.5.4, React 18.2, TypeScript 5.3
- **State Management**: Redux Toolkit + Redux Thunk
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Radix UI, Headless UI, shadcn/ui patterns
- **Real-time Communication**: Socket.io (Node.js + Express)
- **Backend**: Node.js + Express WebSocket server
- **Hosting**: Cloudflare Wrangler (Pages for frontend)

## Project Structure

```
can-t-pool-me/
├── src/
│   ├── app/                    # Next.js 13 app directory
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   └── providers.tsx       # Redux provider
│   ├── config/                 # Game configuration & constants
│   ├── lib/                    # Third-party adapters (Socket.io types)
│   ├── store/                  # Redux store
│   │   ├── store.ts            # Store configuration
│   │   ├── hooks.ts            # useAppDispatch, useAppSelector
│   │   └── slices/             # Redux slices (game, players)
│   ├── shared/                 # Shared resources
│   │   ├── components/         # UI components (Radix UI, Headless UI)
│   │   ├── hooks/              # Custom hooks
│   │   ├── types/              # Shared TypeScript types
│   │   └── utils/              # Utility functions
│   ├── domains/                # Feature domains
│   │   ├── visual-novel/       # Parts 1-2: Visual novel system
│   │   ├── mini-games/         # Part 3: 5 mini-games
│   │   └── boss-level/         # Boss battle component
│   └── styles/                 # Global styles
├── public/
│   └── assets/                 # Game assets (characters, backgrounds, audio)
├── server/                     # Node.js WebSocket server
│   ├── src/
│   │   └── index.ts            # Express + Socket.io setup
│   ├── package.json
│   └── tsconfig.json
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── wrangler.toml               # Cloudflare Wrangler config
```

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Cloudflare account (for deployment)

### Setup Frontend

```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

### Setup Backend Server

```bash
cd server
npm install
npm run dev
# WebSocket server runs at http://localhost:3001
```

## Architecture Overview

### Naming Conventions (from style guide)

- **Components**: PascalCase (`DialogueBox`, `MiniGameCard`)
- **Functions**: camelCase (`generateSessionId`, `calculateScore`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PLAYERS`, `SCENE_COUNT`)
- **Types/Interfaces**: PascalCase (`GameSession`, `Player`)
- **Redux Slices**: camelCase filenames (`game-slice.ts`, `players-slice.ts`)

### State Management

Redux store manages:
- `game` slice: Current phase, scene progression, session ID
- `players` slice: Active players, scores, connections

### Real-time Communication

Socket.io events:
- `join-session`: Player joins game session
- `update-game-phase`: Transition between game phases
- `player-joined`: Broadcast when new player joins
- `phase-changed`: Broadcast phase transitions to all players

## Game Flow

### Part 1-2: Visual Novel (2 players)
- 7 total scenes with dialogue system
- Characters with sprites and emotions
- Background music and sound effects
- Dialogue-driven progression

### Part 3: Mini-Games + Boss (up to 5 players)
- 5 mini-games:
  1. Quick-Time Events
  2. Memory Game
  3. Quiz Game
  4. Rhythm Game
  5. Puzzle Game
- Boss Level: Cooperative multi-player boss battle
- Scoring and leaderboard system

## Development Workflow

### Adding a New Component

Follow compound component pattern with Radix UI/Headless UI:

```tsx
// Good: Compound component
const Dialog = {
  Root: ({ children }: RootProps) => { ... },
  Trigger: ({ children }: TriggerProps) => { ... },
  Content: ({ children }: ContentProps) => { ... },
};

export { Dialog };
```

### Adding a New Feature

1. Create feature folder in `src/domains/{feature}`
2. Follow SRP: Separate presentation, business logic, data access layers
3. Use Redux for global state; useState for local UI state
4. Type all Redux actions and selectors

### Redux Thunk Usage

For async operations (like Socket.io events):

```tsx
export const joinGameSession = (sessionId: string, playerName: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    try {
      // Socket.io logic here
      dispatch(setSessionId(sessionId));
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
```

## Deployment

### Cloudflare Pages (Frontend)

1. Connect GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `.next`

### Node.js Server

Deploy to your preferred Node.js hosting:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

Set environment variable:
```
CLIENT_URL=https://your-frontend-domain.com
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MAX_PLAYERS=5
NEXT_PUBLIC_SCENE_COUNT=7
```

## Scripts

### Frontend
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` (in server/) - Start WebSocket server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled server

## Styling

Tailwind CSS with custom color variables:

```css
--color-primary: #3b82f6 (Blue)
--color-secondary: #8b5cf6 (Purple)
--color-accent: #ec4899 (Pink)
```

## Type Safety

All Redux actions, Socket.io events, and game data are fully typed with TypeScript. Follow the patterns in `src/shared/types/game.ts` when adding new types.

## Next Steps

1. Implement visual novel dialogue system (`src/domains/visual-novel`)
2. Create mini-game components (`src/domains/mini-games`)
3. Build boss level logic (`src/domains/boss-level`)
4. Add Socket.io integration for multiplayer
5. Create main menu and navigation flows
6. Deploy frontend to Cloudflare Pages
7. Deploy backend to Node.js hosting

---

**Birthday**: Ready to party! 🎉
