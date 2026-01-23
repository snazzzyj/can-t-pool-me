# Game Development Beginner's Guide

Welcome! This guide will walk you through creating your birthday game step-by-step, even if you have little coding experience.

## Table of Contents

1. [Before You Start](#before-you-start)
2. [Setup: Getting Everything Running](#setup-getting-everything-running)
3. [Understanding Your Project](#understanding-your-project)
4. [Your First Component](#your-first-component)
5. [Adding Game Content](#adding-game-content)
6. [Testing Your Work](#testing-your-work)
7. [Common Mistakes & Solutions](#common-mistakes--solutions)
8. [Next Steps](#next-steps)

---

## Before You Start

### What You'll Need

1. **A code editor** - Download [Visual Studio Code](https://code.visualstudio.com/) (it's free!)
2. **Node.js** - Download from [nodejs.org](https://nodejs.org/) (get the LTS version)
3. **A terminal** - On Mac, use the built-in "Terminal" app
4. **Git** - For version control (optional but recommended)

### After Installation

Open Terminal and run these commands to verify installation:

```bash
node --version
npm --version
```

You should see version numbers like `v18.0.0` and `9.0.0`. If you see them, you're ready!

---

## Setup: Getting Everything Running

### Step 1: Install Dependencies

Open Terminal and navigate to your project folder:

```bash
cd /Users/JJS/Documents/code-repos/can-t-pool-me
```

Install all required packages (this takes 2-3 minutes):

```bash
npm install
```

Then install server packages:

```bash
cd server
npm install
cd ..
```

### Step 2: Start the Frontend

In Terminal (window 1), run:

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 13.5.4
  - Local:        http://localhost:3000
```

**Success!** Open your browser to `http://localhost:3000` and you should see the placeholder page.

### Step 3: Start the Backend Server

Open a **new Terminal window** (window 2), then run:

```bash
cd /Users/JJS/Documents/code-repos/can-t-pool-me
cd server
npm run dev
```

You should see:
```
WebSocket server running on port 3001
```

**Perfect!** You now have both servers running.

### Keeping Servers Running

- **Leave both terminal windows open** while developing
- To stop a server, press `Control + C` in that terminal
- To restart, press the up arrow to re-run the last command

---

## Understanding Your Project

### The Simple Version

Your game is like a book with multiple chapters:

```
📖 Your Game
├── 📕 Part 1: Visual Novel (Player 1 & 2 talk)
├── 📕 Part 2: Visual Novel (Player 1 & 2 talk)
├── 🎮 Part 3: Mini-Games (All 5 players compete)
└── 👹 Boss Level (Everyone fights together)
```

### Project Folders Explained

Think of folders like chapters in a book:

**`src/app/`** - The main entry point
- `layout.tsx` - Sets up Redux (like the book's cover)
- `page.tsx` - Home page (what you see at localhost:3000)

**`src/config/`** - Settings for your game
- `constants.ts` - Numbers and limits (MAX_PLAYERS = 5)
- `game.ts` - Game content (scenes, dialogue)

**`src/shared/`** - Things used everywhere
- `components/` - Reusable UI pieces (buttons, boxes)
- `types/` - Type definitions (what a "Player" looks like)
- `utils/` - Helper functions (shuffle an array, generate IDs)

**`src/domains/`** - The actual game features
- `visual-novel/` - Dialogue system (Parts 1-2)
- `mini-games/` - Five mini-games (Part 3)
- `boss-level/` - Boss battle (Final part)

**`src/store/`** - Game memory (Redux)
- `store.ts` - Main memory storage
- `slices/` - Different types of memory (game state, player list)

**`server/`** - The server that connects all players
- `src/index.ts` - WebSocket server code

---

## Your First Component

Let's create a simple "Welcome Screen" component. Don't worry if this seems complex - you'll understand it soon!

### Step 1: Create the Component File

Create a new file: `src/shared/components/welcome-screen.tsx`

```tsx
'use client';

import clsx from 'clsx';

type Props = {
  readonly onStartClick: () => void;
};

export function WelcomeScreen({ onStartClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Can't Pool Me
        </h1>
        
        <p className="text-2xl text-purple-200 mb-8">
          A Birthday Adventure
        </p>
        
        <button
          onClick={onStartClick}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
        >
          Start Game
        </button>
        
        <p className="text-gray-300 mt-8 text-sm">
          Made with ❤️ for your birthday
        </p>
      </div>
    </div>
  );
}
```

### Step 2: Understand What You Just Wrote

```tsx
'use client';  // This means "run in the browser, not on server"

import clsx from 'clsx';  // Import a tool for combining CSS classes

type Props = {  // Define what information this component needs
  readonly onStartClick: () => void;  // A function to call when "Start" is clicked
};

export function WelcomeScreen({ onStartClick }: Props) {  // Component function
  return (
    // HTML that appears on screen
    <div className="...">
      ...
    </div>
  );
}
```

### Step 3: Use the Component

Open `src/app/page.tsx` and replace it with:

```tsx
'use client';

import { WelcomeScreen } from '@/shared/components/welcome-screen';

export default function Home() {
  const handleStartClick = () => {
    alert('Game starting!');
  };

  return <WelcomeScreen onStartClick={handleStartClick} />;
}
```

### Step 4: See It Work

- Go to `http://localhost:3000` in your browser
- You should see your beautiful welcome screen!
- Click the "Start Game" button
- You should see the alert

**Congratulations! You just created your first component! 🎉**

---

## Adding Game Content

Now let's add actual game dialogue. This is where your game comes to life!

### Step 1: Add a Scene to `src/config/game.ts`

The file already has a template. Let's replace scene 1 with real dialogue:

```ts
export const SCENE_DATABASE: Record<number, Scene> = {
  1: {
    sceneId: 1,
    title: 'The Great Adventure Begins',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: 'Alice',
        text: 'Welcome! I\'ve been waiting for you.',
        emotion: 'happy',
        characterImage: '/assets/characters/alice.png',
      },
      {
        speaker: 'Bob',
        text: 'Are you ready for this adventure?',
        emotion: 'neutral',
        characterImage: '/assets/characters/bob.png',
      },
      {
        speaker: 'Alice',
        text: 'Let\'s solve this mystery together!',
        emotion: 'happy',
        characterImage: '/assets/characters/alice.png',
      },
    ],
  },
  // Add more scenes following the same pattern...
};
```

### Understanding Dialogue Structure

```ts
{
  sceneId: 1,                    // Which scene number (1-7)
  title: 'The Great...',         // Scene name
  backgroundImage: '...',        // Path to background image
  backgroundMusic: '...',        // Path to music file
  duration: 120,                 // Duration in seconds
  dialogues: [
    {
      speaker: 'Alice',          // Who is talking
      text: 'Hello!',            // What they say
      emotion: 'happy',          // How they feel (happy, sad, angry, neutral, surprised)
      characterImage: '...',     // Path to character image
    },
  ],
}
```

### Step 2: Create Asset Placeholders

For now, we'll create placeholder images. Later, you'll add real ones.

Create a simple placeholder text file in `public/assets/characters/`.

**Don't worry about images yet!** Your game will work without them, but let's plan where they go:

```
public/assets/
├── characters/
│   ├── alice.png
│   ├── bob.png
│   └── character-c.png
├── backgrounds/
│   ├── scene-1.jpg
│   ├── scene-2.jpg
│   └── ...
└── audio/
    ├── music/
    │   ├── scene-1.mp3
    │   └── ...
    └── sfx/
        ├── button-click.mp3
        └── ...
```

### Step 3: Create a Dialogue Scene Component

Create `src/domains/visual-novel/features/DialogueScene.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { DialogueBox } from '@/shared/components/dialogue-box';
import { SCENE_DATABASE } from '@/config/game';
import type { Scene } from '@/shared/types/game';

type Props = {
  readonly sceneId: number;
  readonly onComplete: () => void;
};

export function DialogueScene({ sceneId, onComplete }: Props) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const scene: Scene | null = SCENE_DATABASE[sceneId] ?? null;

  if (!scene) {
    return <div className="text-white">Scene not found</div>;
  }

  const currentDialogue = scene.dialogues[dialogueIndex];
  const isLastDialogue = dialogueIndex >= scene.dialogues.length - 1;

  const handleNext = () => {
    if (isLastDialogue) {
      onComplete();
    } else {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex(dialogueIndex - 1);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Background Image */}
      {scene.backgroundImage && (
        <img
          src={scene.backgroundImage}
          alt={scene.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}

      {/* Dialogue Box */}
      <DialogueBox.Root isAnimating={true}>
        {currentDialogue && (
          <>
            <DialogueBox.Speaker
              name={currentDialogue.speaker}
              emotion={currentDialogue.emotion}
              image={currentDialogue.characterImage}
            />
            <DialogueBox.Text>{currentDialogue.text}</DialogueBox.Text>
          </>
        )}

        <DialogueBox.Controls>
          <button
            onClick={handlePrevious}
            disabled={dialogueIndex === 0}
            className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isLastDialogue ? 'Next Scene' : 'Next'}
          </button>
        </DialogueBox.Controls>
      </DialogueBox.Root>
    </div>
  );
}
```

### Step 4: Test Your Dialogue

Update `src/app/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { WelcomeScreen } from '@/shared/components/welcome-screen';
import { DialogueScene } from '@/domains/visual-novel/features/DialogueScene';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return <WelcomeScreen onStartClick={() => setGameStarted(true)} />;
  }

  return (
    <DialogueScene
      sceneId={1}
      onComplete={() => alert('Scene complete!')}
    />
  );
}
```

Now go to `http://localhost:3000`:
- Click "Start Game"
- You should see the dialogue with "Previous" and "Next" buttons
- Click through the dialogue!

**You just created your game's story system! 🎭**

---

## Testing Your Work

### How to Check If Something Works

**Browser Console** (for errors):
1. In your browser, press `F12` or `Command+Option+I` (Mac)
2. Click the "Console" tab
3. Red messages = errors to fix
4. Yellow messages = warnings (usually okay)

**Visual Check**:
1. Does it look like you expect?
2. Do buttons work when clicked?
3. No weird spacing or colors?

### Common Visual Problems

| Problem | Solution |
|---------|----------|
| Text is white on white | Check className colors |
| Button doesn't respond | Check `onClick` function |
| Styling looks wrong | Save file, refresh browser |
| Nothing appears | Check `export` keyword |

### Debug Workflow

1. **Save your file** (Command+S on Mac)
2. **Check browser** - it auto-refreshes
3. **Check console for errors** (F12)
4. **Read error message carefully** - it usually tells you what's wrong
5. **Google the error** if you're stuck
6. **Ask in the project's discussion** if really stuck

---

## Common Mistakes & Solutions

### ❌ Mistake 1: "Component not found"

**You wrote:**
```tsx
import { DialogueScene } from '@/domains/visual-novel/DialogueScene';
```

**You should write:**
```tsx
import { DialogueScene } from '@/domains/visual-novel/features/DialogueScene';
```

**Why:** The file is in the `features/` folder!

### ❌ Mistake 2: "Props are missing"

**You wrote:**
```tsx
<DialogueScene sceneId={1} />
```

**You should write:**
```tsx
<DialogueScene sceneId={1} onComplete={() => alert('Done!')} />
```

**Why:** The component needs both props!

### ❌ Mistake 3: "Cannot read property"

**You wrote:**
```tsx
const scene = SCENE_DATABASE[sceneId];
```

**You should write:**
```tsx
const scene = SCENE_DATABASE[sceneId] ?? null;
if (!scene) return <div>Scene not found</div>;
```

**Why:** The scene might not exist - check first!

### ❌ Mistake 4: "Module not found"

**You wrote:**
```tsx
import Button from '@/shared/components/Button';
```

**Solution:**
1. Check if the file actually exists
2. Check the spelling and path
3. Use correct case (Button.tsx not button.tsx)

---

## Understanding Key Concepts

### What is a Component?

A component is a reusable piece of your website. Like Lego blocks!

```tsx
function Button() {
  return <button>Click me</button>;
}

// Use it multiple times:
<Button />
<Button />
<Button />
```

### What are Props?

Props are how you pass information to components. Like function arguments:

```tsx
function Greeting({ name }) {
  return <p>Hello {name}!</p>;
}

// Pass information:
<Greeting name="Alice" />
```

### What is State?

State is "memory" inside a component. It changes when you interact:

```tsx
const [count, setCount] = useState(0);

// count = current value (starts at 0)
// setCount = function to change it

const handleClick = () => {
  setCount(count + 1);  // Increment by 1
};
```

### What is Redux?

Redux is a global "memory" for your whole game. Instead of each component remembering things, Redux remembers for everyone:

```tsx
// Current game phase (stored in Redux)
const phase = useAppSelector((state) => state.game.phase);

// Change it:
const dispatch = useAppDispatch();
dispatch(setPhase('visual-novel-part-1'));
```

**Think of it like this:**
- **`useState`** = Component has its own notepad
- **`Redux`** = There's one big whiteboard everyone can see

---

## Step-by-Step: Your Game Roadmap

### Week 1: Visual Novel (Parts 1-2)
- [ ] Create 7 scenes with dialogue
- [ ] Add background images
- [ ] Add character images
- [ ] Test scene progression

### Week 2: Visual Novel Polish
- [ ] Add background music
- [ ] Add sound effects
- [ ] Test with multiple people

### Week 3: Mini-Games Setup
- [ ] Create game structure
- [ ] Build first mini-game (Memory)

### Week 4: More Mini-Games
- [ ] Quick-Time Events game
- [ ] Quiz game
- [ ] Rhythm game
- [ ] Puzzle game

### Week 5: Boss Level
- [ ] Build boss health system
- [ ] Multi-player mechanics
- [ ] Test with all 5 players

### Week 6: Polish & Deploy
- [ ] Final testing
- [ ] Deploy to Cloudflare
- [ ] Play with friends! 🎉

---

## File Editing Tips

### Adding a Scene

Open `src/config/game.ts`:

```ts
export const SCENE_DATABASE: Record<number, Scene> = {
  1: { /* existing scene */ },
  2: {  // Add new scene here
    sceneId: 2,
    title: 'Scene Two',
    backgroundImage: '/assets/backgrounds/scene-2.jpg',
    backgroundMusic: '/assets/audio/music/scene-2.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: 'Alice',
        text: 'What happens next?',
        emotion: 'surprised',
        characterImage: '/assets/characters/alice.png',
      },
    ],
  },
};
```

### Creating a New Component

1. Create file: `src/domains/{feature}/features/{ComponentName}.tsx`
2. Write the code
3. Add `'use client';` at the top
4. Export the component: `export function ComponentName() { ... }`
5. Import and use it

### Fixing Import Paths

Use `@/` for absolute imports (much easier):

```tsx
// ❌ Hard to maintain
import Button from '../../../../shared/components/button';

// ✅ Easy to read
import { Button } from '@/shared/components/button';
```

---

## Running Commands

### Terminal Commands Cheat Sheet

```bash
# Start frontend (from project root)
npm run dev

# Start backend (from project root)
cd server && npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Install a new package
npm install package-name
```

---

## Getting Help

### When Something Breaks

1. **Read the error message** - it usually explains the problem
2. **Check the file path** - make sure files exist where you think they do
3. **Save your file** - sometimes unsaved changes cause issues
4. **Refresh browser** - press F5
5. **Restart servers** - stop and restart npm run dev
6. **Google the error** - copy-paste the error message

### Good Questions to Ask

Instead of: "It's broken"

Ask: "I get the error 'Cannot find module' when I try to import DialogueScene. I created the file at src/domains/visual-novel/features/DialogueScene.tsx. What am I doing wrong?"

### Documentation to Read

- **React**: https://react.dev
- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Quick Reference

### File Structure for a New Feature

```
src/domains/mini-games/
├── features/
│   └── MemoryGame.tsx          # Main component
├── services/
│   └── memory.service.ts        # Game logic
├── types/
│   └── memory.types.ts          # Type definitions
└── index.ts                     # Export public API
```

### Common Component Template

```tsx
'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
  readonly onComplete: () => void;
  readonly children?: ReactNode;
};

export function MyComponent({ onComplete, children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Do something
    onComplete();
  };

  return (
    <div className="p-4 bg-slate-900 rounded">
      {children}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Click Me'}
      </button>
    </div>
  );
}
```

### Common Redux Pattern

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPhase } from '@/store/slices/game-slice';

export function MyFeature() {
  const dispatch = useAppDispatch();
  const phase = useAppSelector((state) => state.game.phase);

  const handleChangePhase = () => {
    dispatch(setPhase('mini-games'));
  };

  return (
    <button onClick={handleChangePhase}>
      Current phase: {phase}
    </button>
  );
}
```

---

## You've Got This! 🎮

Remember:
- **Start small** - one component at a time
- **Test as you go** - check the browser after each change
- **Read errors carefully** - they're your friends!
- **Ask for help** - coding is a team sport
- **Have fun** - this is a birthday game!

Good luck! If you get stuck, refer back to this guide or check the other documentation files.

---

## Next: Creating More Content

Once you've got the welcome and dialogue working, follow this order:

1. **Add all 7 scenes** to `config/game.ts`
2. **Build the scene navigation** (which scene comes next?)
3. **Add one mini-game** (start with Memory game)
4. **Test with 2 players** using the WebSocket
5. **Add remaining mini-games**
6. **Build the boss level**
7. **Final polish and testing**

You've got a solid foundation. Now go build something amazing! 🚀
