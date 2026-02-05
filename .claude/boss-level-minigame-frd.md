# BOSS BATTLE MINIGAME - Feature Specification

## 1. OVERVIEW
- **Scene ID:** `scene-14-boss-battle`
- **Character:** All Team Members (Rab/Sharker, Elyse/Big Iron McGee, Debbie/.pxl, Jenn/Hacktress, Joel/Hackerman)
- **Narrative Context:** After successfully completing all four character-specific minigames, the team confronts the Pool Villain who has kidnapped Mushi the cat. The villain taunts them, but the team is ready to take them down using their combined skills and coordination. This is the climactic showdown where all five players must work together with perfect timing to defeat the villain.
- **Core Concept:** A rhythm-based timing challenge where players must stop a moving line within a shrinking green zone by pressing their designated keys. Success requires coordination across all five players over three progressively harder levels, culminating in a rapid-fire button-mashing finale.
- **Estimated Duration:** \~60 seconds (3 levels × 10s each + final level \~20s + transition animations \~10s)

## 2. VICTORY & FAILURE CONDITIONS

### Win Condition
- **Primary:** Successfully complete all 3 timing levels + the final button-mash level
- **Timing Levels (1-3):** At least 3 out of 5 players must stop the line within the green zone per level
- **Final Level:** Team collectively presses their keys 100 times within 15 seconds

### Lose Condition
- **Timing Levels:** Fewer than 3 players hit the green zone in any single level
- **Final Level:** Team fails to reach 100 collective presses within 15 seconds
- **Time Limit:** Any level timer reaches 0 before all players have attempted their press

### Post-Game Flow

**On Victory:**
1. Play victory animation (Pool Villain gets knocked down)
2. Transition to Scene 15 (Rescue Mushi)
3. After Scene 15 dialogue, transition to Victory/Credits screen

**On Failure:**
1. Show "RETRY" overlay with message: "The Pool Villain is too strong! Try again!"
2. Reset to beginning of Boss Battle minigame (stay in scene-14)
3. No penalty - unlimited retries

## 3. PLAYER MECHANICS

### 3.1 Active Players
All 5 players are active and required for optimal success.

| Player | Character | Role |
| --- | --- | --- |
| Player 1 | Rab (Sharker) | Timing participant |
| Player 2 | Elyse (Big Iron McGee) | Timing participant |
| Player 3 | Debbie (.pxl) | Timing participant |
| Player 4 | Jenn (Hacktress) | Timing participant |
| Player 5 | Joel (Hackerman) | Timing participant |

### 3.2 Control Scheme

**Levels 1-3 (Timing Levels):**
- **Player 1 (Rab):** `Q` - Stop the line
- **Player 2 (Elyse):** `W` - Stop the line
- **Player 3 (Debbie):** `E` - Stop the line
- **Player 4 (Jenn):** `R` - Stop the line
- **Player 5 (Joel):** `T` - Stop the line

**Level 4 (Final Button Mash):**
- **Player 1 (Rab):** `Q` - Rapid press
- **Player 2 (Elyse):** `W` - Rapid press
- **Player 3 (Debbie):** `E` - Rapid press
- **Player 4 (Jenn):** `R` - Rapid press
- **Player 5 (Joel):** `T` - Rapid press

**Rationale:** QWERT keys are in a horizontal row, making it easy for 5 players to sit side-by-side at one keyboard. Each player has one finger on their designated key.

### 3.3 Player Representation

**Timing Levels (1-3):**
- Each player has a dedicated horizontal bar/lane
- Player's character portrait appears next to their bar
- Each bar shows:
- Moving vertical line (sweeping left-to-right, then right-to-left)
- Green zone (centered on the bar)
- Player's key label (Q, W, E, R, T)
- Status indicator (waiting/success/fail)

**Final Level (4):**
- Five character sprites shown at bottom of screen
- Each character "swings" a pool cue when their player presses their key
- Collective press counter in center of screen
- Progress bar showing 0/100 presses

### 3.4 Cooperation Mechanics
- **Timing Levels:** Players must individually succeed, but team needs 3/5 successes to pass each level
- **Pressure Distribution:** If 2 players fail early, remaining 3 must all succeed
- **Final Level:** All presses count toward shared goal - encourages everyone to contribute
- **No Interference:** Players cannot negatively affect each other (no friendly fire)

## 4. GAME MECHANICS

### 4.1 Initial State

**Pre-Game:**
1. Dialogue plays (Pool Villain taunts, Sharker responds)
2. Instruction screen appears:
- "BOSS BATTLE: DEFEAT THE POOL VILLAIN"
- "Work together to time your strikes perfectly!"
- Shows each player's key assignment with character portrait
- "Press any key to begin..."

**Game Start:**
- 5 horizontal bars appear (one per player)
- Each bar shows green zone (30% width, centered)
- Moving line starts at left edge of each bar
- Timer shows 10 seconds
- Level indicator: "LEVEL 1/3"

### 4.2 Interactive Elements

**Timing Bar Components:**
- **Moving Line:** Vertical line that sweeps across the bar
- Level 1: 2 seconds per full sweep (left→right or right→left)
- Level 2: 1.5 seconds per full sweep
- Level 3: 1 second per full sweep
- **Green Zone:** Target area for stopping the line
- Level 1: 30% of bar width
- Level 2: 20% of bar width
- Level 3: 10% of bar width
- **Player Key Indicator:** Shows which key to press (Q/W/E/R/T)
- **Status Indicator:** 
- Gray: Waiting for player input
- Green: Success (stopped in green zone)
- Red: Fail (stopped outside green zone)
- Yellow: Perfect (stopped in center 20% of green zone)

**Pool Villain Sprite:**
- Positioned in center-top of screen
- Reacts to player success/failure:
- Takes damage when level is passed (shake animation)
- Taunts when level is failed (idle animation)

### 4.3 Game Loop

**Timing Levels (1-3):**
1. Level starts, timer begins counting down from 10s
2. Moving lines sweep across all 5 bars simultaneously
3. Each player presses their key to stop their line
4. Line freezes where it was when key was pressed
5. Game evaluates if line is in green zone (success) or outside (fail)
6. Visual feedback shows success/fail for each player
7. Once all 5 players have pressed (or timer expires):
- Count successes
- If ≥3 successes: Play "HIT" animation, advance to next level
- If <3 successes: Play "FAIL" animation, show retry screen
8. Between levels: 2-second animation of team hitting Pool Villain with pool cues

**Final Level (4):**
1. Screen changes to button-mash mode
2. Timer shows 15 seconds
3. Counter shows 0/100 presses
4. Players rapidly press their keys
5. Each press increments counter and triggers character "swing" animation
6. If counter reaches 100 before timer expires: Victory!
7. If timer expires before 100 presses: Retry screen

### 4.4 Progression & Difficulty

| Level | Green Zone Size | Line Speed | Time Limit |
| --- | --- | --- | --- |
| 1 | 30% of bar | 2s per sweep | 10s |
| 2 | 20% of bar | 1.5s per sweep | 10s |
| 3 | 10% of bar | 1s per sweep | 10s |
| 4 (Final) | N/A | N/A | 15s |

**Difficulty Curve:**
- Smaller green zones require more precision
- Faster line speed gives less reaction time
- Level 3 is significantly harder (10% zone + 1s sweep)
- Final level shifts from precision to speed/endurance

### 4.5 Scoring System

**Points per Timing Level:**
- **Perfect Hit** (center 20% of green zone): 100 points
- **Good Hit** (outer 80% of green zone): 50 points
- **Miss** (outside green zone): 0 points

**Bonus Points:**
- **All 5 Players Succeed:** +200 bonus points
- **Level Completion:** +100 points

**Final Level:**
- **Each Press:** 10 points
- **Completion Bonus:** +500 points

**Maximum Possible Score:**
- Level 1: (5 × 100) + 200 + 100 = 800 points
- Level 2: (5 × 100) + 200 + 100 = 800 points
- Level 3: (5 × 100) + 200 + 100 = 800 points
- Level 4: (100 × 10) + 500 = 1500 points
- **Total Max:** 3900 points

**Score Display:**
- Shown in top-right corner throughout game
- Updates in real-time as players score
- Final score shown on victory screen

### 4.6 Health/Lives System

**No Traditional Health System:**
- Players don't have individual health bars
- Pool Villain has visual "damage states":
- **Level 1 Complete:** Villain looks slightly dazed
- **Level 2 Complete:** Villain is staggering
- **Level 3 Complete:** Villain is on one knee
- **Level 4 Complete:** Villain is knocked out on the ground

**Failure = Instant Retry:**
- No lives/continues system
- Failing any level triggers immediate retry option
- No penalty for retrying

### 4.7 Special Abilities & Power-ups

**No Power-ups or Special Abilities:**
- Pure skill-based timing challenge
- All players have equal capabilities
- Success depends on coordination and timing

### 4.8 Physics & Movement

**Line Movement:**
- Linear interpolation (smooth, constant speed)
- Bounces at edges (reverses direction)
- No acceleration/deceleration
- Synchronized across all 5 bars (all lines move together)

**No Player Movement:**
- Players don't move avatars
- Static bar-based interface
- Only interaction is key press timing

## 5. VISUAL REQUIREMENTS

### 5.1 Background
- **Description:** Dark, dramatic pool hall interior with spotlight effect
- **Style:** Pixel art, moody lighting
- **Asset:** Create new background or use modified version of existing pool hall asset
- **Atmosphere:** Tense, climactic showdown vibe

### 5.2 Character Sprites

**Required Assets:**

**Player Character Portraits (for timing bars):**
- `/public/assets/characters/Rab-1.png` (Player 1)
- `/public/assets/characters/Elyse-1.png` (Player 2)
- `/public/assets/characters/Debbie-1.png` (Player 3)
- `/public/assets/characters/Jenn-1.png` (Player 4)
- `/public/assets/characters/Joel-1.png` (Player 5)

**Full Character Sprites (for final level):**
- Same as above, but full-body sprites
- **Animation Needed:** "Swing pool cue" animation (3-4 frames)
- Frame 1: Idle/ready stance
- Frame 2: Wind-up
- Frame 3: Swing
- Frame 4: Follow-through

**Pool Villain Sprite:**
- **NEW ASSET NEEDED:** Pool Villain character sprite
- **Required States:**
- Idle/taunting (animated loop)
- Taking damage (shake/flash effect)
- Dazed (after Level 1)
- Staggering (after Level 2)
- On one knee (after Level 3)
- Knocked out (after Level 4)

### 5.3 Enemy/Obstacle Sprites

**Pool Cue Sprite:**
- **NEW ASSET NEEDED:** Pixel art pool cue
- Used in "hit" animations between levels
- Should match character sprite scale

**Impact Effects:**
- **NEW ASSET NEEDED:** Hit/impact particle effect
- Appears when pool cue connects with villain
- Small star/spark burst animation

### 5.4 UI Elements

**HUD Layout:**

```javascript
┌─────────────────────────────────────────────────────────────┐
│  LEVEL 2/3                    BOSS BATTLE          SCORE: 1250 │
│                                                                 │
│                    [POOL VILLAIN SPRITE]                        │
│                         (centered)                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [Rab Portrait] Q  ├──────────█████──────────┤  [Status]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [Elyse Portrait] W ├──────────█████──────────┤ [Status]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [Debbie Portrait] E ├──────────█████──────────┤ [Status] │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [Jenn Portrait] R  ├──────────█████──────────┤ [Status]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ [Joel Portrait] T  ├──────────█████──────────┤ [Status]  │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│                        TIMER: 7s                                │
└─────────────────────────────────────────────────────────────┘

Legend:
█████ = Green zone (target area)
├─────┤ = Bar boundaries
│ = Moving line (sweeps left-right)
```

**Final Level Layout:**

```javascript
┌─────────────────────────────────────────────────────────────┐
│                    FINAL STRIKE!           SCORE: 2400       │
│                                                               │
│                  PRESSES: 67/100                              │
│              [████████████░░░░░░░░]                           │
│                                                               │
│                    TIMER: 8s                                  │
│                                                               │
│  [Rab]    [Elyse]   [Debbie]   [Jenn]    [Joel]             │
│   (Q)      (W)        (E)        (R)       (T)               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**UI Component Specifications:**

1. **Level Indicator**
- Position: Top-left
- Font: Pixel/retro style, bold
- Size: 24px
- Color: White with black outline

2. **Score Display**
- Position: Top-right
- Font: Pixel/retro style
- Size: 24px
- Color: Yellow with black outline
- Updates with +points animation when scored

3. **Timer**
- Position: Bottom-center
- Font: Large pixel/retro style
- Size: 36px
- Color: 
    - Green: >5 seconds remaining
    - Yellow: 3-5 seconds
    - Red: <3 seconds (pulsing)

4. **Timing Bars**
- Width: 70% of screen width
- Height: 60px each
- Spacing: 10px between bars
- Border: 2px solid white
- Background: Dark gray (#333)
- Green Zone: Bright green (#00FF00) with 50% opacity
- Moving Line: Bright white (#FFFFFF), 4px wide

5. **Status Indicators**
- Position: Right side of each bar
- Size: 40px × 40px
- Icons:
    - ⏳ (Waiting): Gray
    - ✓ (Success): Green
    - ⭐ (Perfect): Gold
    - ✗ (Fail): Red

6. **Press Counter (Final Level)**
- Position: Center-top
- Font: Extra large pixel style
- Size: 48px
- Color: White
- Format: "67/100"
- Progress bar below counter

### 5.5 Visual Feedback

**Damage Effect (When Level Passed):**
1. Pool Villain sprite shakes (5px horizontal oscillation, 0.3s)
2. Red flash overlay on villain sprite
3. Impact particles burst from villain
4. Screen shake (subtle, 2px, 0.2s)
5. All 5 character sprites appear briefly, swinging pool cues in unison
6. Sound effect: Heavy impact/thud

**Victory Effect (Final Level Complete):**
1. Slow-motion effect (0.5x speed) for final press
2. Bright white flash (full screen, 0.2s)
3. Pool Villain falls backward (animated)
4. Confetti explosion from top of screen
5. "VICTORY!" text zooms in from background
6. Character sprites jump in celebration
7. Triumphant music sting

**Hit Effects (Successful Press in Green Zone):**
- **Perfect Hit:**
- Gold sparkle burst at line position
- "+100" points popup (floats upward, fades)
- Satisfying "ding" sound
- Status indicator turns gold (⭐)
  
- **Good Hit:**
- Green flash at line position
- "+50" points popup
- "Success" sound effect
- Status indicator turns green (✓)

**Miss Effect:**
- Red "X" appears at line position
- Status indicator turns red (✗)
- Sad trombone/buzzer sound
- Bar shakes briefly (2px, 0.1s)

**Between-Level Transition:**
1. Freeze all bars
2. 1-second pause
3. All 5 characters appear in foreground
4. Characters swing pool cues simultaneously
5. Pool cues connect with villain (impact effect)
6. Villain reacts (damage state change)
7. 1-second pause
8. Fade to next level setup

### 5.6 HUD Layout

See ASCII diagrams in section 5.4 above.

**Responsive Considerations:**
- Minimum width: 1024px (game is designed for desktop/shared keyboard)
- Bars scale proportionally to screen width
- Character portraits scale down on smaller screens
- Timer and score remain fixed size for readability

## 6. AUDIO REQUIREMENTS

### 6.1 Background Music
- **Style:** Intense, fast-paced electronic/chiptune boss battle theme
- **Tempo:** 140-160 BPM
- **Mood:** Urgent, climactic, heroic
- **Loop:** Seamless loop for duration of minigame
- **Volume:** Moderate (allows SFX to be heard clearly)

### 6.2 Sound Effects

**Timing Levels:**
- `line_sweep.wav` - Subtle whoosh as line moves (looping)
- `perfect_hit.wav` - Satisfying "ding" for perfect hits (gold zone)
- `good_hit.wav` - Positive "bleep" for good hits (green zone)
- `miss.wav` - Negative buzzer for misses
- `level_complete.wav` - Triumphant sting when level passed
- `level_fail.wav` - Sad trombone when level failed
- `impact.wav` - Heavy thud when pool cues hit villain

**Final Level:**
- `button_press.wav` - Quick click sound for each key press
- `progress_milestone.wav` - Plays at 25%, 50%, 75% progress
- `final_strike.wav` - Epic impact sound for 100th press
- `victory_fanfare.wav` - Triumphant music sting for victory

**UI Sounds:**
- `countdown_beep.wav` - Beep for 3-2-1 countdown
- `timer_warning.wav` - Urgent beeping when <3 seconds remain
- `retry_prompt.wav` - Soft prompt sound for retry screen

## 7. TECHNICAL SPECIFICATIONS

### 7.1 File Structure

```javascript
src/
  domains/
    mini-games/
      boss-battle/
        BossBattle.tsx                    # Main game component
        BossBattleScene.tsx               # Scene wrapper with dialogue
        constants.ts                      # Game constants (speeds, zones, etc.)
        types.ts                          # TypeScript interfaces
        components/
          TimingBar.tsx                   # Individual player timing bar
          TimingLevel.tsx                 # Levels 1-3 container
          FinalLevel.tsx                  # Level 4 button-mash
          PoolVillain.tsx                 # Villain sprite with damage states
          GameHUD.tsx                     # Score, timer, level indicator
          PreGameInstructions.tsx         # Instruction screen
          BetweenLevelAnimation.tsx       # Hit animation between levels
          RetryScreen.tsx                 # Retry prompt on failure
          VictoryAnimation.tsx            # Victory sequence
        hooks/
          useBossBattle.ts                # Main game logic hook
          useTimingBar.ts                 # Individual bar logic
          useFinalLevel.ts                # Button-mash logic
        utils/
          scoring.ts                      # Score calculation functions
          timing.ts                       # Timing/collision detection
          animations.ts                   # Animation helper functions
```

### 7.2 Redux State Shape

```typescript
interface BossBattleState {
  // Game state
  currentLevel: 1 | 2 | 3 | 4;
  gameStatus: 'instructions' | 'playing' | 'between-levels' | 'victory' | 'retry';
  score: number;
  
  // Timing levels (1-3)
  timingLevels: {
    level1: LevelState;
    level2: LevelState;
    level3: LevelState;
  };
  
  // Final level (4)
  finalLevel: {
    pressCount: number;
    targetPresses: number;
    timeRemaining: number;
  };
  
  // Player results
  playerResults: {
    player1: PlayerResult;
    player2: PlayerResult;
    player3: PlayerResult;
    player4: PlayerResult;
    player5: PlayerResult;
  };
}

interface LevelState {
  greenZoneSize: number;        // Percentage (30, 20, 10)
  lineSpeed: number;             // Milliseconds per sweep
  timeLimit: number;             // Seconds
  timeRemaining: number;         // Seconds
  completed: boolean;
  passed: boolean;               // true if ≥3 players succeeded
}

interface PlayerResult {
  playerId: 1 | 2 | 3 | 4 | 5;
  characterName: string;
  keyPressed: boolean;
  pressTimestamp: number | null; // When they pressed (ms since level start)
  linePosition: number;          // Where line was (0-100%)
  hitGreenZone: boolean;
  hitPerfectZone: boolean;
  pointsEarned: number;
}
```

### 7.3 Component Props

```typescript
// BossBattle.tsx
interface BossBattleProps {
  onComplete: (score: number) => void;
  onRetry: () => void;
}

// TimingBar.tsx
interface TimingBarProps {
  playerId: 1 | 2 | 3 | 4 | 5;
  characterName: string;
  characterPortrait: string;
  assignedKey: 'Q' | 'W' | 'E' | 'R' | 'T';
  greenZoneSize: number;         // 0-100 (percentage)
  lineSpeed: number;              // ms per sweep
  onKeyPress: (playerId: number, linePosition: number) => void;
  disabled: boolean;              // true after player has pressed
  result: PlayerResult | null;   // null until player presses
}

// TimingLevel.tsx
interface TimingLevelProps {
  level: 1 | 2 | 3;
  greenZoneSize: number;
  lineSpeed: number;
  timeLimit: number;
  onLevelComplete: (passed: boolean, results: PlayerResult[]) => void;
}

// FinalLevel.tsx
interface FinalLevelProps {
  targetPresses: number;
  timeLimit: number;
  onComplete: (success: boolean, finalPressCount: number) => void;
}

// PoolVillain.tsx
interface PoolVillainProps {
  damageState: 'healthy' | 'dazed' | 'staggering' | 'kneeling' | 'knocked-out';
  isBeingHit: boolean;            // Triggers hit animation
}

// GameHUD.tsx
interface GameHUDProps {
  currentLevel: 1 | 2 | 3 | 4;
  score: number;
  timeRemaining: number;
}
```

### 7.4 Integration Points

**Scene Configuration:**
```typescript
// src/config/scenes/part-two/scene-14-boss-battle.ts

import { Scene } from '@/config/scenes/types';

export const scene14BossBattle: Scene = {
  id: 'scene-14-boss-battle',
  title: 'Boss Battle',
  type: 'minigame',
  
  // Pre-game dialogue
  dialogue: [
    {
      speaker: 'Pool Villain',
      text: 'What?! How did you get in here?',
      characterImage: '/assets/characters/Pool-Villain.png',
      position: 'right'
    },
    {
      speaker: 'Sharker',
      text: "Doesn't matter. Give us back Mushi or else.",
      characterImage: '/assets/characters/Rab-1.png',
      position: 'left'
    },
    {
      speaker: 'Pool Villain',
      text: 'Hahahah you imbeciles think you can defeat me? You can die trying.',
      characterImage: '/assets/characters/Pool-Villain.png',
      position: 'right'
    },
    {
      speaker: 'Sharker',
      text: "Oh we've done more impossible things. Trust us.",
      characterImage: '/assets/characters/Rab-1.png',
      position: 'left'
    }
  ],
  
  // Minigame component
  minigameComponent: 'BossBattle',
  
  // Post-game transitions
  onVictory: {
    nextScene: 'scene-15-rescue-mushi'
  },
  
  onFailure: {
    action: 'retry',
    retryScene: 'scene-14-boss-battle'
  }
};
```

**Next Scene (Scene 15):**
```typescript
// src/config/scenes/part-two/scene-15-rescue-mushi.ts

export const scene15RescueMushi: Scene = {
  id: 'scene-15-rescue-mushi',
  title: 'Rescue Mushi',
  type: 'dialogue',
  
  dialogue: [
    {
      speaker: 'Everyone',
      text: 'Mushi!',
      characterImage: '/assets/characters/Team-Group.png',
      position: 'center'
    },
    {
      speaker: 'Mushi',
      text: '❤️ ❤️',
      characterImage: '/assets/characters/Mushi-Cat.png',
      position: 'center'
    },
    {
      speaker: 'Pool Villain',
      text: "You'll never get away with this!",
      characterImage: '/assets/characters/Pool-Villain.png',
      position: 'right'
    },
    {
      speaker: 'Sharker',
      text: "No, you'll never get away with this.",
      characterImage: '/assets/characters/Rab-1.png',
      position: 'left'
    },
    {
      speaker: 'Narrator',
      text: '*Rab destroys the cue*',
      characterImage: null,
      position: 'center'
    },
    {
      speaker: 'Sharker',
      text: 'Memento Mori bitch.',
      characterImage: '/assets/characters/Rab-1.png',
      position: 'left'
    },
    {
      speaker: 'Narrator',
      text: '*Closing scene. Rab knocks the guy out with a pool cue.*',
      characterImage: null,
      position: 'center'
    }
  ],
  
  onComplete: {
    nextScene: 'victory-screen'
  }
};
```

**Victory Screen:**
```typescript
// src/config/scenes/victory-screen.ts

export const victoryScreen: Scene = {
  id: 'victory-screen',
  title: 'Victory!',
  type: 'victory',
  
  component: 'VictoryScreen',
  
  music: '/assets/audio/fancy-socks-birkenstocks-8bit.mp3',
  
  options: [
    {
      label: 'Credits',
      action: 'show-credits'
    },
    {
      label: 'Play Again',
      action: 'restart-game',
      nextScene: 'welcome-screen'
    }
  ]
};
```