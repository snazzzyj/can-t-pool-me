# SHOOT THE LABUBU - Feature Specification

## 1. OVERVIEW
- **Scene ID:** `scene-13-minigame-elyse`
- **Minigame Name:** Shoot the Labubu
- **Character Focus:** Team minigame (showcases Elyse's combat skills and team coordination)
- **Narrative Context:** 

After infiltrating the Evil Pool Villain's mansion, the team encounters waves of Labubu guards blocking their path to the villain's lair. These corrupted collectible toys have been weaponized as minions. The team must work together - three members (Rab, Jenn, Joel) will shoot down the descending Labubus while two members (Elyse and Debbie) collect the fallen bodies in buckets. Elyse sees an opportunity to profit from the chaos, joking about selling the defeated Labubus on Facebook Marketplace.

The team must fight through three increasingly dangerous areas of the mansion: the lavish entrance staircase, the dark basement pool hall, and finally the cyberpunk lair itself.

- **Core Concept:** A cooperative Space Invaders-style shooter where 3 players shoot descending Labubus across 3 lanes while 2 players collect fallen bodies to restore team health. The team shares a health pool and must survive 3 waves per level across 3 levels.

- **Estimated Duration:** 6-9 minutes (3 waves × 30-45 seconds × 3 levels + stats screens)

## 2. VICTORY & FAILURE CONDITIONS

### Win Condition
- Successfully defeat all Labubus across all 3 levels (9 waves total)
- At least one shooter must survive each wave
- Transition to `scene-14-boss-battle` upon completion

### Lose Condition
- Team's shared health pool reaches 0 HP
- All three shooters die (Elyse and Debbie cannot die)
- Game Over screen appears with "Try Again" button
- Retry restarts the entire current level (all 3 waves)

### Post-Game Flow
**Victory:**
1. Final stats screen showing:
- Total team Labubu body count
- Elyse's individual body count
- Debbie's individual body count
- Each shooter's accuracy percentage
- Each shooter's individual kill count
2. "Continue" button advances to `scene-14-boss-battle`

**Defeat:**
1. Game Over screen with team stats
2. "Try Again" button restarts current level from wave 1

## 3. PLAYER MECHANICS

### 3.1 Active Players
All 5 players are active with distinct roles:

**Shooters (3 players):**
- Player 1 (Rab/Shark)
- Player 4 (Jenn/Hacktress)
- Player 5 (Joel/Hackerman)

**Collectors (2 players):**
- Player 2 (Elyse/Big Iron McGee)
- Player 3 (Debbie/.pxl)

### 3.2 Control Scheme

**Player 1 (Rab) - Left Lane Shooter:**
- **R key (hold):** Rapid fire shooting with slight cooldown between shots

**Player 2 (Elyse) - Left Collector:**
- **Left Arrow:** Move bucket left
- **Right Arrow:** Move bucket right

**Player 3 (Debbie) - Right Collector:**
- **A key:** Move bucket left
- **D key:** Move bucket right

**Player 4 (Jenn) - Center Lane Shooter:**
- **H key (hold):** Rapid fire shooting with slight cooldown between shots

**Player 5 (Joel) - Right Lane Shooter:**
- **J key (hold):** Rapid fire shooting with slight cooldown between shots

### 3.3 Player Representation

**Shooters:**
- Fixed positions at bottom of screen in 3 vertical lanes (left, center, right)
- Display character portrait sprite above shooting position:
- Rab: `Rab-1.png`
- Jenn: `Jenn-1.png`
- Joel: `Joel-1.png`
- Small white circle bullets fire upward from their lane
- When a shooter dies, their portrait grays out with red X overlay

**Collectors:**
- Elyse and Debbie move horizontally along the bottom of the screen
- Represented by bucket emoji (🪣) with character portrait above
- Both collectors share the same horizontal track
- Cannot collide with each other (pass through)
- Bucket width: 2 Labubu widths (84px) with forgiving hitbox

### 3.4 Cooperation Mechanics

**Shooter-Collector Synergy:**
- Shooters must eliminate Labubus efficiently to create falling bodies
- Collectors must catch bodies to restore team health (+5 HP per 10 bodies)
- Missed bodies do not count toward health restoration
- Team shares a single health pool (30 HP)

**Shared Resources:**
- All shooters share the same health bar (displayed as red bar at top)
- Individual ammo bars per shooter (displayed as blue bars below health)
- Collectors share body count responsibility (individual counts tracked)

**Critical Cooperation:**
- If all 3 shooters die, the level fails (even if Elyse/Debbie are active)
- Shooters must manage ammo carefully (30% more than total Labubus per wave)
- Collectors must prioritize catching bodies when health is low

## 4. GAME MECHANICS

### 4.1 Initial State

**Level 1 Start (Mansion Entrance):**
- Lavish staircase background (pixelated, warm tones, ornate details)
- 3 shooter positions at bottom (Rab left, Jenn center, Joel right)
- 2 collector buckets at bottom center
- HUD displays:
- Top center: Shared health bar (30/30 HP) in red
- Below health: 3 individual ammo bars (blue) labeled with character names
- Bottom corners: Elyse and Debbie body count (0)
- Top left: "Level 1 - Wave 1/3"
- Top right: Wave timer (45s countdown)
- "3... 2... 1... GO!" countdown before wave starts
- Background music begins (retro chiptune combat theme)

### 4.2 Interactive Elements

**Labubus (Enemies):**
- 5 color variants (functionally identical, random distribution):
- Red, Blue, Green, Yellow, Purple
- Size: 42px × 42px sprites
- Spawn from top of screen in wave patterns
- Descend vertically toward shooter line
- Speed increases by 25% as wave progresses
- When shot: Brief poof animation, then fall as limp body
- When reaching shooter line: Deal 1 damage to shared HP, then disappear

**Bullets:**
- Small white circles (8px diameter)
- Fire from shooter's lane position
- Travel upward at constant speed
- Instant kill on Labubu contact
- Disappear at top of screen or on hit

**Falling Bodies:**
- Defeated Labubus fall straight down from death position
- Same 42px × 42px sprite (no separate falling sprite)
- Must be caught by Elyse or Debbie's bucket
- If caught: Small cloud poof effect, +1 to collector's body count
- If missed: Body disappears at bottom, no count

### 4.3 Game Loop

**Wave Structure (30-45 seconds each):**
1. **Wave Start:** Countdown "3... 2... 1... GO!", timer begins
2. **Spawn Phase:** Labubus spawn in predetermined pattern from top
3. **Combat Phase:** 
- Shooters fire at descending Labubus
- Collectors catch falling bodies
- Speed gradually increases (0% → 25% faster)
4. **Wave End:** All Labubus defeated or timer expires
5. **Inter-Wave Pause:** 3-second pause, ammo refills
6. **Next Wave:** Repeat for waves 2 and 3

**Level Structure:**
- **Level 1 (Mansion Entrance):** 3 waves, 15 Labubus per wave (45 total)
- **Level 2 (Pool Hall Basement):** 3 waves, 20 Labubus per wave (60 total)
- **Level 3 (Cyberpunk Lair):** 3 waves, 25 Labubus per wave (75 total)

**Between Levels:**
- Stats screen displays team performance
- "Continue" button advances to next level
- Background changes to next environment

### 4.4 Progression & Difficulty

**Level 1: Mansion Entrance (Tutorial Difficulty)**
- 15 Labubus per wave
- Slower base speed
- Simple patterns (straight columns, gentle waves)

**Level 2: Pool Hall Basement (Medium Difficulty)**
- 20 Labubus per wave
- Medium base speed
- Complex patterns (zigzags, staggered columns)
- Darker background (harder to see)

**Level 3: Cyberpunk Lair (Hard Difficulty)**
- 25 Labubus per wave
- Fast base speed
- Chaotic patterns (random swarms, snake formations)
- Distracting cyberpunk background elements

**Wave Patterns (Space Invaders-inspired):**

**Level 1 Patterns:**
- Wave 1: Straight vertical columns (3 columns of 5)
- Wave 2: Gentle horizontal wave formation
- Wave 3: Staggered diagonal descent

**Level 2 Patterns:**
- Wave 1: Zigzag snake formation
- Wave 2: V-formation with center focus
- Wave 3: Alternating column drops

**Level 3 Patterns:**
- Wave 1: Chaotic swarm (random positions)
- Wave 2: Pincer formation (sides converge to center)
- Wave 3: Full screen cascade (all lanes simultaneously)

### 4.5 Scoring System

**Body Count (Primary Metric):**
- Only caught bodies count toward score
- Elyse's body count: Individual tracker
- Debbie's body count: Individual tracker
- Team total: Sum of both collectors

**Shooter Stats (Secondary Metrics):**
- **Accuracy:** (Hits / Shots Fired) × 100%
- **Kill Count:** Total Labubus killed per shooter
- Displayed on stats screen between levels

**No Point System:**
- Focus is on body count and survival, not score

### 4.6 Health/Lives System

**Shared Health Pool:**
- Team starts with 30 HP (shared across all shooters)
- Displayed as red bar at top center of screen
- Numerical display: "HP: 30/30"

**Damage:**
- Each Labubu reaching shooter line: -1 HP from shared pool
- Damage applies to all shooters simultaneously
- Visual feedback: Screen shake, red flash, health bar decreases

**Health Restoration:**
- Every 10 bodies caught: +5 HP to shared pool
- Maximum HP: 30 (cannot exceed)
- Visual feedback: Green flash, health bar increases

**Shooter Death:**
- Individual shooter dies when shared HP reaches 0
- Dead shooter's portrait grays out with red X
- Dead shooter cannot shoot for remainder of wave
- If all 3 shooters die: Level fails immediately

**Collector Immortality:**
- Elyse and Debbie cannot die
- Continue collecting bodies even if all shooters die
- Game only ends when all shooters are eliminated

### 4.7 Special Abilities & Power-ups

**No special abilities or power-ups in MVP.**

**Future Consideration (Phase 3):**
- Temporary rapid-fire power-up
- Shield that blocks 5 Labubus
- Slow-motion effect for 5 seconds

### 4.8 Physics & Movement

**Labubu Movement:**
- Vertical descent only (no horizontal movement)
- Constant speed per wave (increases 25% over wave duration)
- No collision with each other (can overlap)
- Spawn above screen, descend to shooter line

**Bullet Movement:**
- Vertical ascent only
- Constant speed (faster than Labubus)
- No bullet collision with other bullets
- Instant hit detection (no travel time simulation)

**Collector Movement:**
- Horizontal movement only (left/right)
- Smooth acceleration/deceleration
- Movement speed: 300px/second
- Bucket hitbox: 84px wide (2 Labubu widths)
- Forgiving hitbox: +10px on each side

**Collision Detection:**
- Bullet-Labubu: Instant kill, bullet disappears
- Bucket-Body: Body caught if any overlap, body disappears
- Labubu-Shooter Line: Damage dealt, Labubu disappears
- No friendly fire or collector collision

## 5. VISUAL REQUIREMENTS

### 5.1 Backgrounds

**Level 1: Mansion Entrance**
- **Description:** Lavish staircase at bottom of grand mansion entrance. Pixelated art style with warm lighting (golden chandeliers, red carpet, ornate railings, marble columns). Rich color palette (burgundy, gold, cream).
- **Asset:** Create procedurally or use CSS gradient with pixel filter
- **Dimensions:** Full screen (1920×1080 scaled)

**Level 2: Pool Hall Basement**
- **Description:** Dark basement pool hall. Pixelated art style with dim lighting (single hanging lamps, green felt pool tables, cue racks on walls, brick walls). Moody color palette (dark green, brown, dim yellow).
- **Asset:** Create procedurally or use CSS gradient with pixel filter
- **Dimensions:** Full screen (1920×1080 scaled)

**Level 3: Cyberpunk Lair**
- **Description:** High-tech villain's lair. Pixelated art style with neon blue lighting (computer screens, server racks, holographic displays, metallic walls). Cyberpunk color palette (electric blue, cyan, dark purple, black).
- **Asset:** Create procedurally or use CSS gradient with pixel filter
- **Dimensions:** Full screen (1920×1080 scaled)

### 5.2 Character Sprites

**Shooter Portraits (Fixed at bottom):**
- `public/assets/characters/Rab-1.png` (Player 1, left lane)
- `public/assets/characters/Jenn-1.png` (Player 4, center lane)
- `public/assets/characters/Joel-1.png` (Player 5, right lane)
- Display size: 64×64px
- Position: Above each shooter's lane

**Collector Representations:**
- Elyse: `public/assets/characters/Elyse-1.png` portrait (48×48px) above bucket emoji 🪣
- Debbie: `public/assets/characters/Debbie-1.png` portrait (48×48px) above bucket emoji 🪣
- Bucket emoji size: 48×48px

**Death State:**
- Gray out portrait with CSS filter: `grayscale(100%) opacity(50%)`
- Red X overlay (CSS pseudo-element or SVG)

### 5.3 Enemy/Obstacle Sprites

**Labubu Sprites (5 color variants):**
- **File paths:** 
- `public/assets/minigames/shoot-the-labubu/labubu-red.png`
- `public/assets/minigames/shoot-the-labubu/labubu-blue.png`
- `public/assets/minigames/shoot-the-labubu/labubu-green.png`
- `public/assets/minigames/shoot-the-labubu/labubu-yellow.png`
- `public/assets/minigames/shoot-the-labubu/labubu-purple.png`
- **Size:** 42×42px
- **Animation:** 
- Idle: Slight bobbing (CSS animation)
- Death: Brief poof sprite (3 frames, 100ms each)
- Falling: Same sprite, rotated slightly

**Poof Effect:**
- Small white cloud sprite (32×32px)
- 3-frame animation (expand → peak → fade)
- Duration: 300ms

### 5.4 UI Elements

**HUD Layout (Press Start 2P font):**

```javascript
┌─────────────────────────────────────────────────────────────┐
│  Level 1 - Wave 1/3          HP: ████████░░ 24/30      0:35 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                    [LABUBUS DESCENDING]                       │
│                                                               │
│                                                               │
│  Elyse: 12 bodies                      Debbie: 8 bodies      │
│                                                               │
│  [Rab Portrait]    [Jenn Portrait]    [Joel Portrait]        │
│  Ammo: ████░░      Ammo: ██████        Ammo: ███░░░          │
│     🪣                  🪣                                     │
└─────────────────────────────────────────────────────────────┘
```

**Top Bar (Fixed):**
- **Top Left:** "Level X - Wave Y/3" (white text, 16px)
- **Top Center:** Health bar (red fill, gray background, 200px wide, 20px tall)
- Label: "HP: 24/30" (white text, 14px)
- **Top Right:** Wave timer "0:35" (white text, 16px)

**Bottom Section (Fixed):**
- **Shooter Positions:** 3 lanes (left, center, right)
- Character portrait (64×64px)
- Name label below portrait (white text, 12px)
- Ammo bar below name (blue fill, gray background, 100px wide, 12px tall)
- Ammo count: "15/20" (white text, 10px)

**Collector Indicators:**
- **Bottom Left:** "Elyse: 12 bodies" (white text, 14px)
- **Bottom Right:** "Debbie: 8 bodies" (white text, 14px)
- Bucket emoji (🪣) moves horizontally with collector

**Stats Screen (Between Levels):**
```javascript
┌─────────────────────────────────────────────────────────────┐
│                     LEVEL 1 COMPLETE                          │
│                                                               │
│  TEAM STATS:                                                  │
│  Total Bodies Collected: 45                                   │
│                                                               │
│  COLLECTORS:                                                  │
│  Elyse:  23 bodies                                            │
│  Debbie: 22 bodies                                            │
│                                                               │
│  SHOOTERS:                                                    │
│  Rab:   Accuracy: 78%  |  Kills: 15                          │
│  Jenn:  Accuracy: 82%  |  Kills: 18                          │
│  Joel:  Accuracy: 71%  |  Kills: 12                          │
│                                                               │
│                    [CONTINUE]                                 │
└─────────────────────────────────────────────────────────────┘
```

**Game Over Screen:**
```javascript
┌─────────────────────────────────────────────────────────────┐
│                       GAME OVER                               │
│                                                               │
│  The Labubus overwhelmed the team!                            │
│                                                               │
│  Bodies Collected: 23                                         │
│  Waves Survived: 2/3                                          │
│                                                               │
│                    [TRY AGAIN]                                │
└─────────────────────────────────────────────────────────────┘
```

### 5.5 Visual Feedback

**Damage Effect (Labubu reaches shooter line):**
- Screen shake (5px horizontal, 200ms)
- Red flash overlay (opacity 30%, 300ms fade)
- Health bar decreases with smooth animation
- Sound: (Future - damage sound effect)

**Labubu Death:**
- Small white poof sprite at death position (300ms)
- Labubu sprite begins falling (same sprite, slight rotation)
- Sound: (Future - pop sound effect)

**Body Caught:**
- Small cloud poof at bucket position (200ms)
- Body count increments with brief scale animation (1.2x → 1.0x)
- Sound: (Future - catch sound effect)

**Shooter Death:**
- Portrait grays out instantly
- Red X fades in over portrait (500ms)
- Ammo bar turns red
- Sound: (Future - death sound effect)

**Health Restoration (+5 HP per 10 bodies):**
- Green flash overlay (opacity 20%, 300ms fade)
- Health bar increases with smooth animation
- "+5 HP" text floats up from health bar (1 second)
- Sound: (Future - heal sound effect)

**Wave Complete:**
- "WAVE COMPLETE" text fades in center screen (1 second)
- Brief pause (3 seconds)
- Ammo bars refill with animation (500ms)
- Sound: (Future - victory jingle)

**Level Complete:**
- Fade to stats screen (1 second transition)
- Stats animate in sequentially (100ms delay each)
- Sound: (Future - level complete fanfare)

### 5.6 HUD Layout Details

**Screen Dimensions:** 1920×1080 (scaled to fit viewport)

**Top Bar (0-80px from top):**
- Background: Semi-transparent black (rgba(0,0,0,0.7))
- Padding: 20px
- Level indicator: 20px from left
- Health bar: Centered horizontally
- Timer: 20px from right

**Game Area (80-920px from top):**
- Background: Level-specific background image
- Labubus spawn at y=80px
- Shooter line at y=880px
- Falling bodies travel from death position to y=920px

**Bottom Bar (920-1080px from top):**
- Background: Semi-transparent black (rgba(0,0,0,0.7))
- Padding: 20px
- Shooter portraits: Evenly spaced (x=400px, x=960px, x=1520px)
- Collector indicators: 40px from left/right edges
- Bucket emojis: Move between x=200px and x=1720px

**Z-Index Layers:**
1. Background (z-index: 0)
2. Falling bodies (z-index: 1)
3. Labubus (z-index: 2)
4. Bullets (z-index: 3)
5. Collectors (z-index: 4)
6. HUD elements (z-index: 10)
7. Overlays (stats, game over) (z-index: 20)

## 6. AUDIO REQUIREMENTS

### Background Music
- **Level 1:** Upbeat retro chiptune combat theme (medium tempo, major key)
- **Level 2:** Darker, more intense chiptune (faster tempo, minor key)
- **Level 3:** Aggressive cyberpunk chiptune (fastest tempo, electronic elements)
- **Stats Screen:** Calm victory theme (slower tempo, triumphant)
- **Game Over:** Somber defeat theme (slow tempo, minor key)

### Sound Effects (Future Phase)
- Shoot: Retro laser "pew" sound
- Labubu hit: Pop/poof sound
- Body caught: Soft thud/catch sound
- Damage taken: Harsh buzz/alarm
- Shooter death: Descending tone
- Health restore: Ascending chime
- Wave complete: Victory jingle (3 notes)
- Level complete: Fanfare (5 seconds)
- Game over: Defeat sting (2 seconds)

**Note:** Sound effects are Phase 2 priority. MVP focuses on background music only.

## 7. TECHNICAL SPECIFICATIONS

### 7.1 File Structure

```javascript
src/
  domains/
    mini-games/
      shoot-the-labubu/
        ShootTheLabubu.tsx              # Main game component
        ShootTheLabubuScene.tsx         # Scene wrapper
        constants.ts                     # Game constants
        types.ts                         # TypeScript types
        components/
          GameHUD.tsx                    # Top/bottom HUD display
          LabubuSprite.tsx               # Individual Labubu component
          ShooterLane.tsx                # Shooter position component
          CollectorBucket.tsx            # Collector bucket component
          StatsScreen.tsx                # Between-level stats
          GameOverScreen.tsx             # Defeat screen
          PreGameInstructions.tsx        # "How to Play" screen
        hooks/
          useShootTheLabubu.ts           # Main game logic hook
          useWaveManager.ts              # Wave spawning logic
          useCollisionDetection.ts       # Collision detection
          usePlayerInput.ts              # Keyboard input handling
        utils/
          wave-patterns.ts               # Labubu spawn patterns
          collision.ts                   # Collision helpers
          animation.ts                   # Animation helpers

public/
  assets/
    minigames/
      shoot-the-labubu/
        labubu-red.png
        labubu-blue.png
        labubu-green.png
        labubu-yellow.png
        labubu-purple.png
        poof-effect.png                  # 3-frame sprite sheet
```

### 7.2 Redux State Shape

```typescript
interface ShootTheLabubuState {
  // Game state
  gameStatus: 'pre-game' | 'countdown' | 'playing' | 'wave-complete' | 'level-complete' | 'game-over' | 'victory';
  currentLevel: 1 | 2 | 3;
  currentWave: 1 | 2 | 3;
  waveTimer: number; // seconds remaining
  
  // Team resources
  sharedHealth: number; // 0-30
  maxHealth: number; // 30
  
  // Shooters
  shooters: {
    rab: ShooterState;
    jenn: ShooterState;
    joel: ShooterState;
  };
  
  // Collectors
  collectors: {
    elyse: CollectorState;
    debbie: CollectorState;
  };
  
  // Entities
  labubus: LabubuEntity[];
  bullets: BulletEntity[];
  fallingBodies: FallingBodyEntity[];
  
  // Stats
  stats: {
    totalBodiesCaught: number;
    elyseBodies: number;
    debbieBodies: number;
    rabStats: ShooterStats;
    jennStats: ShooterStats;
    joelStats: ShooterStats;
  };
}

interface ShooterState {
  isAlive: boolean;
  ammo: number;
  maxAmmo: number;
  position: { x: number; y: number }; // Fixed position
  lane: 'left' | 'center' | 'right';
}

interface CollectorState {
  position: { x: number; y: number };
  bodiesCaught: number;
}

interface LabubuEntity {
  id: string;
  position: { x: number; y: number };
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  speed: number;
  isAlive: boolean;
}

interface BulletEntity {
  id: string;
  position: { x: number; y: number };
  shooterId: 'rab' | 'jenn' | 'joel';
}

interface FallingBodyEntity {
  id: string;
  position: { x: number; y: number };
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
}

interface ShooterStats {
  shotsFired: number;
  shotsHit: number;
  accuracy: number; // percentage
  kills: number;
}
```

### 7.3 Component Props

```typescript
// ShootTheLabubu.tsx (Main Component)
interface ShootTheLabubuProps {
  onComplete: () => void; // Transition to scene-14-boss-battle
  onRetry: () => void; // Restart current level
}

// GameHUD.tsx
interface GameHUDProps {
  level: number;
  wave: number;
  sharedHealth: number;
  maxHealth: number;
  waveTimer: number;
  shooters: {
    rab: ShooterState;
    jenn: ShooterState;
    joel: ShooterState;
  };
  collectors: {
    elyse: CollectorState;
    debbie: CollectorState;
  };
}

// LabubuSprite.tsx
interface LabubuSpriteProps {
  labubu: LabubuEntity;
  onDeath: (id: string) => void;
}

// ShooterLane.tsx
interface ShooterLaneProps {
  shooter: ShooterState;
  shooterName: 'Rab' | 'Jenn' | 'Joel';
  portraitSrc: string;
  onShoot: () => void;
}

// CollectorBucket.tsx
interface CollectorBucketProps {
  collector: CollectorState;
  collectorName: 'Elyse' | 'Debbie';
  portraitSrc: string;
}

// StatsScreen.tsx
interface StatsScreenProps {
  level: number;
  stats: {
    totalBodiesCaught: number;
    elyseBodies: number;
    debbieBodies: number;
    rabStats: ShooterStats;
    jennStats: ShooterStats;
    joelStats: ShooterStats;
  };
  onContinue: () => void;
}

// GameOverScreen.tsx
interface GameOverScreenProps {
  bodiesCaught: number;
  wavesSurvived: number;
  currentLevel: number;
  onRetry: () => void;
}

// PreGameInstructions.tsx
interface PreGameInstructionsProps {
  onStart: () => void;
}
```

### 7.4 Integration Points

**Scene Configuration:**
- **File:** `src/config/scenes/part-two/scene-13-minigame-elyse.ts`
- **Scene Type:** `minigame`
- **Scene ID:** `scene-13-minigame-elyse`

```typescript
// scene-13-minigame-elyse.ts
import { Scene } from '../../types';

export const scene13MinigameElyse: Scene = {
  id: 'scene-13-minigame-elyse',
  type: 'minigame',
  title: 'Shoot the Labubu',
  description: 'Fight through waves of Labubu guards',
  component: 'ShootTheLabubuScene', // Wrapper component
  nextScene: 'scene-14-boss-battle',
  dialogue: [
    {
      character: 'joel',
      characterName: 'Hackerman',
      text: 'Guards everywhere.',
      sprite: 'Joel-1.png',
    },
    {
      character: 'elyse',
      characterName: 'Big Iron McGee',
      text: 'Wait… are those…',
      sprite: 'Elyse-1.png',
    },
    {
      character: 'elyse',
      characterName: 'Big Iron McGee',
      text: 'LABUBUS?',
      sprite: 'Elyse-1.png',
    },
    {
      character: 'rab',
      characterName: 'Shark',
      text: "There's heaps, but if we take it in turns we should be able to push through.",
      sprite: 'Rab-1.png',
    },
    {
      character: 'elyse',
      characterName: 'Big Iron McGee',
      text: "If we kill them can I keep the bodies?... They'd be worth a fortune on Facebook Marketplace.",
      sprite: 'Elyse-1.png',
    },
  ],
};
```

**Pre-game Dialogue:**
- Dialogue renders in `DialogueScene.tsx` before minigame starts
- After final dialogue line, transition to `PreGameInstructions.tsx`
- Instructions screen shows controls and objective
- "Start" button begins countdown (3-2-1-GO)

**Post-game Transition:**
- **Victory:** `StatsScreen.tsx` → "Continue" button → `scene-14-boss-battle`
- **Defeat:** `GameOverScreen.tsx` → "Try Again" button → Restart current level

**Redux Integration:**
- Game state stored in `store/slices/game-slice.ts`
- Minigame state stored in `store/slices/shoot-the-labubu-slice.ts` (new slice)
- Dispatch actions for:
- `startGame()`
- `updateGameState()`
- `completeWave()`
- `completeLevel()`
- `gameOver()`
- `victory()`

### 7.5 Performance Targets

**Max Entities:**
- Labubus: 25 on screen simultaneously (Level 3, Wave 3)
- Bullets: 15 on screen simultaneously (3 shooters × 5 rapid fire)
- Falling Bodies: 10 on screen simultaneously
- **Total:** \~50 entities maximum

**Target FPS:** 60fps

**Render Strategy:** 
- **DOM-based rendering** (React components with CSS transforms)
- Use `transform: translate3d()` for hardware acceleration
- `requestAnimationFrame` for game loop
- Memoize static components (`React.memo`)
- Use CSS animations for simple effects (poof, shake)

**Optimization Techniques:**
- Object pooling for bullets and bodies (reuse entities)
- Spatial partitioning for collision detection (grid-based)
- Throttle collision checks to every 2 frames (30Hz)
- Lazy load background images
- Use CSS `will-change` for animated elements

**Performance Budget:**
- Initial load: < 2 seconds
- Frame time: < 16ms (60fps)
- Memory: < 100MB
- Asset size: < 5MB total

### 7.6 Game Loop Architecture

```typescript
// useShootTheLabubu.ts (Main Hook)
const useShootTheLabubu = () => {
  const [gameState, setGameState] = useState<ShootTheLabubuState>(initialState);
  
  // Game loop (60fps)
  useEffect(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    const gameLoop = () => {
      // 1. Update Labubu positions
      updateLabubuPositions(deltaTime);
      
      // 2. Update bullet positions
      updateBulletPositions(deltaTime);
      
      // 3. Update falling body positions
      updateFallingBodyPositions(deltaTime);
      
      // 4. Check collisions
      checkBulletLabubuCollisions();
      checkBucketBodyCollisions();
      checkLabubuShooterLineCollisions();
      
      // 5. Update wave timer
      updateWaveTimer(deltaTime);
      
      // 6. Check wave/level completion
      checkWaveCompletion();
      
      // 7. Spawn new Labubus (if needed)
      spawnLabubus();
      
      requestAnimationFrame(gameLoop);
    };
    
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameState.gameStatus]);
  
  return { gameState, actions };
};
```

### 7.7 Collision Detection Algorithm

```typescript
// utils/collision.ts

// Bullet-Labubu collision (AABB)
const checkBulletLabubuCollision = (
  bullet: BulletEntity,
  labubu: LabubuEntity
): boolean => {
  return (
    bullet.position.x < labubu.position.x + 42 &&
    bullet.position.x + 8 > labubu.position.x &&
    bullet.position.y < labubu.position.y + 42 &&
    bullet.position.y + 8 > labubu.position.y
  );
};

// Bucket-Body collision (Forgiving hitbox)
const checkBucketBodyCollision = (
  bucket: { x: number; y: number },
  body: FallingBodyEntity
): boolean => {
  const bucketWidth = 84 + 20; // 2 Labubus + 10px forgiveness each side
  const bucketHeight = 48;
  
  return (
    body.position.x + 42 > bucket.x - 10 &&
    body.position.x < bucket.x + bucketWidth + 10 &&
    body.position.y + 42 > bucket.y &&
    body.position.y < bucket.y + bucketHeight
  );
};

// Labubu-Shooter Line collision
const checkLabubuShooterLineCollision = (
  labubu: LabubuEntity,
  shooterLineY: number
): boolean => {
  return labubu.position.y + 42 >= shooterLineY;
};
```

### 7.8 Wave Spawning System

```typescript
// utils/wave-patterns.ts

type SpawnPattern = {
  delay: number; // ms between spawns
  positions: { x: number; lane: 'left' | 'center' | 'right' }[];
};

const LEVEL_1_PATTERNS: SpawnPattern[] = [
  // Wave 1: Straight columns
  {
    delay: 1000,
    positions: [
      { x: 400, lane: 'left' },
      { x: 960, lane: 'center' },
      { x: 1520, lane: 'right' },
      // ... 15 total
    ],
  },
  // Wave 2: Gentle wave
  {
    delay: 800,
    positions: [
      { x: 400, lane: 'left' },
      { x: 500, lane: 'left' },
      { x: 600, lane: 'left' },
      // ... 15 total
    ],
  },
  // Wave 3: Staggered diagonal
  {
    delay: 600,
    positions: [
      { x: 400, lane: 'left' },
      { x: 1000, lane: 'center' },
      { x: 1600, lane: 'right' },
      // ... 15 total
    ],
  },
];

// Similar patterns for LEVEL_2_PATTERNS and LEVEL_3_PATTERNS
```

### 7.9 Ammo Calculation

```typescript
// constants.ts

const LABUBUS_PER_WAVE = {
  level1: 15,
  level2: 20,
  level3: 25,
};

const AMMO_MULTIPLIER = 1.3; // 30% more than Labubus

const calculateAmmo = (level: number): number => {
  const labubus = LABUBUS_PER_WAVE[`level${level}`];
  return Math.ceil(labubus * AMMO_MULTIPLIER); // Per shooter
};

// Level 1: 15 × 1.3 = 20 ammo per shooter
// Level 2: 20 × 1.3 = 26 ammo per shooter
// Level 3: 25 × 1.3 = 33 ammo per shooter
```