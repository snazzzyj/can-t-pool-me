# Style Guide Quick Reference

This is your quick lookup for naming and architecture patterns. Full details are in `.claude/code-base-style-guides/`.

## Naming Rules (SID: Short, Intuitive, Descriptive)

### Case Conventions
| Item | Case | Example |
|------|------|---------|
| Components | PascalCase | `DialogueBox`, `MainMenu` |
| Functions | camelCase | `generateSessionId`, `handleClick` |
| Constants | UPPER_SNAKE_CASE | `MAX_PLAYERS`, `GAME_PHASES` |
| Files (folders) | kebab-case | `dialogue-box.tsx`, `visual-novel/` |
| Types/Interfaces | PascalCase | `GamePhase`, `PlayerProps` |
| Redux slices | kebab-case | `game-slice.ts`, `players-slice.ts` |

### Boolean/Conditional Prefixes

| Prefix | Meaning | Example |
|--------|---------|---------|
| `is` | Current state/characteristic | `isLoading`, `isVisible`, `isConnected` |
| `has` | Possession/presence | `hasError`, `hasChildren`, `hasData` |
| `should` | Positive conditional action | `shouldRender`, `shouldAnimate` |
| `can` | Permission/ability | `canFetch`, `canSubmit` |
| `will` | Future state (rare) | `willUnmount` |

### Redux/Service Action Verbs

| Verb | Usage | Example |
|------|-------|---------|
| `set` | Modify state | `setPhase`, `setIsLoading` |
| `get` | Access data | `getScene`, `getPlayer` |
| `add` | Add to collection | `add` (in players-slice) |
| `remove` | Remove from collection | `remove` (in players-slice) |
| `update` | Modify existing | `update` (in players-slice) |
| `fetch` | Retrieve from API | `fetchUser`, `fetchScenes` |
| `create` | Create new | `createSession`, `createGame` |
| `delete` | Permanently remove | `deleteSession` |
| `reset` | Return to initial state | `reset` |
| `handle` | Respond to event | `handleClick`, `handleSubmit` |

## Project Structure

```
src/
├── app/                    # Routes only (Next.js 13+)
├── config/                 # Configuration & constants
│   ├── env.ts             # Environment variables
│   ├── features.ts        # Feature flags
│   ├── constants.ts       # Global constants
│   └── game.ts            # Game-specific config
├── lib/                    # Third-party adapters
│   ├── socket.adapter.ts  # Socket.io wrapper
│   └── socket-types.ts    # Socket.io types
├── shared/                 # Cross-domain code
│   ├── api/               # HTTP client (to be created)
│   ├── components/        # Design system
│   ├── hooks/             # Custom hooks
│   ├── types/             # Shared types
│   └── utils/             # Pure functions
├── store/                  # Redux
│   ├── store.ts           # Configuration
│   ├── hooks.ts           # useAppDispatch, useAppSelector
│   └── slices/            # Reducers
└── domains/                # Feature domains
    ├── visual-novel/
    │   ├── services/      # Business logic
    │   ├── models/        # Domain entities
    │   ├── features/      # UI components
    │   ├── views/         # Page components
    │   └── shared/        # Domain-internal code
    ├── mini-games/
    └── boss-level/
```

## Naming Examples by Layer

### Presentation Layer (Components)
```tsx
// Component files
DialogueBox.tsx, MainMenu.tsx, MiniGameCard.tsx

// Props types
type DialogueBoxProps = { ... }
type MainMenuProps = { ... }

// State prefixes
const isVisible = useState(false)
const shouldRender = true
const hasError = false
```

### Business Logic Layer (Services)
```tsx
// Service files (in domains/{domain}/services/)
visual-novel.service.ts, mini-game.service.ts

// Pure functions
getScene()
isSceneComplete()
calculateScore()
validateInput()
```

### Data Access Layer (Redux/API)
```tsx
// Redux slices (in store/slices/)
game-slice.ts, players-slice.ts

// Actions/reducers in slice
setPhase(), add(), remove(), update(), reset()

// API functions (to be created)
fetchScenes(), createGame(), updatePlayer()
```

## NO-NOs ❌

❌ **Don't:**
- Use contractions: `onBtnClk` → use `onButtonClick`
- Duplicate context: `addPlayer` in `players-slice.ts` → use `add`
- Use confusing negatives: `shouldNotRender` → use `shouldHide`
- Abbreviate: `usr` → use `user`
- Use generic names: `data`, `item`, `x`

## DO's ✅

✅ **Do:**
- Use full words: `onButtonClick`, `generateSessionId`
- Remove redundant context from slice actions
- Use positive conditionals: `shouldRender` not `shouldNotHide`
- Be explicit about types
- Use descriptive, searchable names

## Type Naming Pattern

```tsx
// Component props (Component name + Props)
type DialogueBoxProps = { ... }
type MiniGameCardProps = { ... }

// State types (State)
type State = { ... }  // in redux slices

// DTO/API types (Entity + Dto)
type PlayerDto = { ... }
type SceneDto = { ... }

// Domain entities (clean name)
type Game = { ... }
type Player = { ... }
type Scene = { ... }
```

## File Naming Pattern

```tsx
// Component files
DialogueBox.tsx
MainMenu.tsx

// Service files
visual-novel.service.ts
mini-game.service.ts

// Type definition files
game.ts (in domains or shared/types)

// Utility files
game.ts (pure functions)

// Redux slices
game-slice.ts
players-slice.ts
```

## React Hooks Naming

```tsx
// Custom hook files
use-game-state.ts
use-socket-connection.ts

// Hook function names
useGameState()
useSocketConnection()
useDisclosure()
useAsync()
```

## API Naming Pattern (to be implemented)

```tsx
// Fetch functions
fetchScenes()
fetchGame()
createGame()
updatePlayer()
deleteSession()

// Query hooks
useScenes()
useGame()
usePlayer()

// Files: {domain}.api.ts or {domain}.queries.ts
```

## Example: Adding a Feature

**File structure:**
```
domains/visual-novel/
├── features/
│   └── DialogueScene/
│       ├── DialogueScene.tsx      # Main component
│       ├── DialogueScene.types.ts # Props, local types
│       ├── components/
│       │   ├── DialogueSpeaker.tsx
│       │   └── DialogueText.tsx
│       ├── hooks/
│       │   └── use-scene-navigation.ts
│       ├── utils/
│       │   └── scene.utils.ts
│       └── index.ts                # Public API
```

**Naming in DialogueScene.tsx:**
```tsx
type Props = { ... }

export const DialogueScene = ({ ... }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)
  
  const shouldShowNextButton = currentDialogueIndex < dialogues.length - 1
  const hasReachedEnd = currentDialogueIndex >= dialogues.length - 1
  
  const handleNextDialogue = () => { ... }
  const handlePreviousDialogue = () => { ... }
  
  return (...)
}
```

## Links to Full Guides
- **Naming Conventions**: `.claude/code-base-style-guides/naming-conventions-overview.md`
- **Architecture**: `.claude/code-base-style-guides/architecture-overview.md`
- **Presentation Layer**: `.claude/code-base-style-guides/how-to-name-react-SRP-layers/01-presentation-ui-layer-naming-guide.md`
- **Business Logic**: `.claude/code-base-style-guides/how-to-name-react-SRP-layers/02-business-logic-layer-naming-guide.md`
- **Data Access**: `.claude/code-base-style-guides/how-to-name-react-SRP-layers/03-data-access-layer-naming-guide.md`
