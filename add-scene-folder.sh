#!/bin/bash

# Bash script to create new scene configuration structure
# This script only creates NEW folders and files without modifying existing ones

set -e  # Exit on error

echo "🚀 Creating new scene configuration structure..."

# Base directory
BASE_DIR="src/config/scenes"

# Create main scenes directory
mkdir -p "$BASE_DIR"

# Create subdirectories
mkdir -p "$BASE_DIR/part-one"
mkdir -p "$BASE_DIR/part-two"
mkdir -p "$BASE_DIR/transitions"

echo "📁 Created directory structure"

# Create main scenes index.ts (barrel export)
cat > "$BASE_DIR/index.ts" << 'EOF'
/**
 * Scene Configuration Barrel Export
 * Centralizes all scene imports for easy access throughout the application
 */

export * from './part-one';
export * from './part-two';
export * from './transitions';
export * from './types';
EOF

# Create scenes types.ts
cat > "$BASE_DIR/types.ts" << 'EOF'
/**
 * Scene-specific type definitions
 * Extend or override base game types as needed for scene configurations
 */

// Add scene-specific types here as needed
export interface SceneMetadata {
  id: string;
  title: string;
  part: 'one' | 'two' | 'transition';
  order: number;
}

// Example: Extended scene configuration type
export interface ExtendedSceneConfig {
  metadata: SceneMetadata;
  // Add additional scene properties here
}
EOF

echo "📄 Created main scene files (index.ts, types.ts)"

# ============================================
# PART ONE: Visual Novel Scenes
# ============================================

# Create Part One index.ts
cat > "$BASE_DIR/part-one/index.ts" << 'EOF'
/**
 * Part One: Visual Novel Scenes
 * Barrel export for all Part One scene configurations
 */

export { default as scene01FinnRab } from './scene-01-finn-rab';
export { default as scene02RabSuspicious } from './scene-02-rab-suspicious';
export { default as scene03MysteriousCaller } from './scene-03-mysterious-caller';
export { default as scene04JennRab } from './scene-04-jenn-rab';
export { default as scene05ElyseRab } from './scene-05-elyse-rab';
export { default as scene06DebbieRab } from './scene-06-debbie-rab';
export { default as scene07JoelRab } from './scene-07-joel-rab';
export { default as scene08TeamAssembly } from './scene-08-team-assembly';
EOF

# Create Part One scene files
cat > "$BASE_DIR/part-one/scene-01-finn-rab.ts" << 'EOF'
/**
 * Scene 01: Finn & Rab
 * Opening scene introducing the main character and initial setup
 */

const scene01FinnRab = {
  id: 'scene-01-finn-rab',
  title: 'Finn & Rab',
  part: 'one' as const,
  order: 1,
  // Add scene configuration here
};

export default scene01FinnRab;
EOF

cat > "$BASE_DIR/part-one/scene-02-rab-suspicious.ts" << 'EOF'
/**
 * Scene 02: Rab Suspicious
 * Rab becomes suspicious of the situation
 */

const scene02RabSuspicious = {
  id: 'scene-02-rab-suspicious',
  title: 'Rab Suspicious',
  part: 'one' as const,
  order: 2,
  // Add scene configuration here
};

export default scene02RabSuspicious;
EOF

cat > "$BASE_DIR/part-one/scene-03-mysterious-caller.ts" << 'EOF'
/**
 * Scene 03: Mysterious Caller
 * A mysterious caller reaches out to Rab
 */

const scene03MysteriousCaller = {
  id: 'scene-03-mysterious-caller',
  title: 'Mysterious Caller',
  part: 'one' as const,
  order: 3,
  // Add scene configuration here
};

export default scene03MysteriousCaller;
EOF

cat > "$BASE_DIR/part-one/scene-04-jenn-rab.ts" << 'EOF'
/**
 * Scene 04: Jenn & Rab
 * Introduction of Jenn (Hacktress)
 */

const scene04JennRab = {
  id: 'scene-04-jenn-rab',
  title: 'Jenn & Rab',
  part: 'one' as const,
  order: 4,
  // Add scene configuration here
};

export default scene04JennRab;
EOF

cat > "$BASE_DIR/part-one/scene-05-elyse-rab.ts" << 'EOF'
/**
 * Scene 05: Elyse & Rab
 * Introduction of Elyse (Big Iron McGee)
 */

const scene05ElyseRab = {
  id: 'scene-05-elyse-rab',
  title: 'Elyse & Rab',
  part: 'one' as const,
  order: 5,
  // Add scene configuration here
};

export default scene05ElyseRab;
EOF

cat > "$BASE_DIR/part-one/scene-06-debbie-rab.ts" << 'EOF'
/**
 * Scene 06: Debbie & Rab
 * Introduction of Debbie (.pxl)
 */

const scene06DebbieRab = {
  id: 'scene-06-debbie-rab',
  title: 'Debbie & Rab',
  part: 'one' as const,
  order: 6,
  // Add scene configuration here
};

export default scene06DebbieRab;
EOF

cat > "$BASE_DIR/part-one/scene-07-joel-rab.ts" << 'EOF'
/**
 * Scene 07: Joel & Rab
 * Introduction of Joel (Hackerman)
 */

const scene07JoelRab = {
  id: 'scene-07-joel-rab',
  title: 'Joel & Rab',
  part: 'one' as const,
  order: 7,
  // Add scene configuration here
};

export default scene07JoelRab;
EOF

cat > "$BASE_DIR/part-one/scene-08-team-assembly.ts" << 'EOF'
/**
 * Scene 08: Team Assembly
 * The team comes together for the mission
 */

const scene08TeamAssembly = {
  id: 'scene-08-team-assembly',
  title: 'Team Assembly',
  part: 'one' as const,
  order: 8,
  // Add scene configuration here
};

export default scene08TeamAssembly;
EOF

echo "✅ Created Part One scene files (8 scenes)"

# ============================================
# PART TWO: Heist & Minigames
# ============================================

# Create Part Two index.ts
cat > "$BASE_DIR/part-two/index.ts" << 'EOF'
/**
 * Part Two: Heist & Minigames
 * Barrel export for all Part Two scene configurations
 */

export { default as scene09HeistBegins } from './scene-09-heist-begins';
export { default as scene10MinigameDebbie } from './scene-10-minigame-debbie';
export { default as scene11MinigameElyse } from './scene-11-minigame-elyse';
export { default as scene12MinigameJenn } from './scene-12-minigame-jenn';
export { default as scene13MinigameJoel } from './scene-13-minigame-joel';
export { default as scene14BossBattle } from './scene-14-boss-battle';
export { default as scene15Victory } from './scene-15-victory';
export { default as scene16RescueMushi } from './scene-16-rescue-mushi';
EOF

# Create Part Two scene files
cat > "$BASE_DIR/part-two/scene-09-heist-begins.ts" << 'EOF'
/**
 * Scene 09: Heist Begins
 * The team begins their heist operation
 */

const scene09HeistBegins = {
  id: 'scene-09-heist-begins',
  title: 'Heist Begins',
  part: 'two' as const,
  order: 9,
  // Add scene configuration here
};

export default scene09HeistBegins;
EOF

cat > "$BASE_DIR/part-two/scene-10-minigame-debbie.ts" << 'EOF'
/**
 * Scene 10: Minigame - Debbie
 * Debbie's minigame challenge
 */

const scene10MinigameDebbie = {
  id: 'scene-10-minigame-debbie',
  title: 'Minigame: Debbie',
  part: 'two' as const,
  order: 10,
  // Add scene configuration here
};

export default scene10MinigameDebbie;
EOF

cat > "$BASE_DIR/part-two/scene-11-minigame-elyse.ts" << 'EOF'
/**
 * Scene 11: Minigame - Elyse
 * Elyse's minigame challenge
 */

const scene11MinigameElyse = {
  id: 'scene-11-minigame-elyse',
  title: 'Minigame: Elyse',
  part: 'two' as const,
  order: 11,
  // Add scene configuration here
};

export default scene11MinigameElyse;
EOF

cat > "$BASE_DIR/part-two/scene-12-minigame-jenn.ts" << 'EOF'
/**
 * Scene 12: Minigame - Jenn
 * Jenn's minigame challenge
 */

const scene12MinigameJenn = {
  id: 'scene-12-minigame-jenn',
  title: 'Minigame: Jenn',
  part: 'two' as const,
  order: 12,
  // Add scene configuration here
};

export default scene12MinigameJenn;
EOF

cat > "$BASE_DIR/part-two/scene-13-minigame-joel.ts" << 'EOF'
/**
 * Scene 13: Minigame - Joel
 * Joel's minigame challenge
 */

const scene13MinigameJoel = {
  id: 'scene-13-minigame-joel',
  title: 'Minigame: Joel',
  part: 'two' as const,
  order: 13,
  // Add scene configuration here
};

export default scene13MinigameJoel;
EOF

cat > "$BASE_DIR/part-two/scene-14-boss-battle.ts" << 'EOF'
/**
 * Scene 14: Boss Battle
 * Final confrontation with the boss
 */

const scene14BossBattle = {
  id: 'scene-14-boss-battle',
  title: 'Boss Battle',
  part: 'two' as const,
  order: 14,
  // Add scene configuration here
};

export default scene14BossBattle;
EOF

cat > "$BASE_DIR/part-two/scene-15-victory.ts" << 'EOF'
/**
 * Scene 15: Victory
 * Celebration of the team's success
 */

const scene15Victory = {
  id: 'scene-15-victory',
  title: 'Victory',
  part: 'two' as const,
  order: 15,
  // Add scene configuration here
};

export default scene15Victory;
EOF

cat > "$BASE_DIR/part-two/scene-16-rescue-mushi.ts" << 'EOF'
/**
 * Scene 16: Rescue Mushi
 * Final scene - rescuing Mushi
 */

const scene16RescueMushi = {
  id: 'scene-16-rescue-mushi',
  title: 'Rescue Mushi',
  part: 'two' as const,
  order: 16,
  // Add scene configuration here
};

export default scene16RescueMushi;
EOF

echo "✅ Created Part Two scene files (8 scenes)"

# ============================================
# TRANSITIONS
# ============================================

# Create Transitions index.ts
cat > "$BASE_DIR/transitions/index.ts" << 'EOF'
/**
 * Transition Slides
 * Barrel export for all transition scene configurations
 */

export { default as transition01Chapter1 } from './transition-01-chapter-1';
export { default as transition02FewDaysLater } from './transition-02-few-days-later';
export { default as transition03Chapter2 } from './transition-03-chapter-2';
export { default as transition04Chapter3 } from './transition-04-chapter-3';
export { default as transition05ToBeContinued } from './transition-05-to-be-continued';
EOF

# Create Transition scene files
cat > "$BASE_DIR/transitions/transition-01-chapter-1.ts" << 'EOF'
/**
 * Transition 01: Chapter 1
 * Opening chapter transition
 */

const transition01Chapter1 = {
  id: 'transition-01-chapter-1',
  title: 'Chapter 1',
  part: 'transition' as const,
  order: 1,
  // Add transition configuration here
};

export default transition01Chapter1;
EOF

cat > "$BASE_DIR/transitions/transition-02-few-days-later.ts" << 'EOF'
/**
 * Transition 02: Few Days Later
 * Time skip transition
 */

const transition02FewDaysLater = {
  id: 'transition-02-few-days-later',
  title: 'Few Days Later',
  part: 'transition' as const,
  order: 2,
  // Add transition configuration here
};

export default transition02FewDaysLater;
EOF

cat > "$BASE_DIR/transitions/transition-03-chapter-2.ts" << 'EOF'
/**
 * Transition 03: Chapter 2
 * Chapter 2 transition
 */

const transition03Chapter2 = {
  id: 'transition-03-chapter-2',
  title: 'Chapter 2',
  part: 'transition' as const,
  order: 3,
  // Add transition configuration here
};

export default transition03Chapter2;
EOF

cat > "$BASE_DIR/transitions/transition-04-chapter-3.ts" << 'EOF'
/**
 * Transition 04: Chapter 3
 * Chapter 3 transition
 */

const transition04Chapter3 = {
  id: 'transition-04-chapter-3',
  title: 'Chapter 3',
  part: 'transition' as const,
  order: 4,
  // Add transition configuration here
};

export default transition04Chapter3;
EOF

cat > "$BASE_DIR/transitions/transition-05-to-be-continued.ts" << 'EOF'
/**
 * Transition 05: To Be Continued
 * Ending transition
 */

const transition05ToBeContinued = {
  id: 'transition-05-to-be-continued',
  title: 'To Be Continued',
  part: 'transition' as const,
  order: 5,
  // Add transition configuration here
};

export default transition05ToBeContinued;
EOF

echo "✅ Created Transition scene files (5 transitions)"

# ============================================
# Summary
# ============================================

echo ""
echo "🎉 Scene configuration structure created successfully!"
echo ""
echo "📊 Summary:"
echo "  - Main directory: $BASE_DIR"
echo "  - Part One scenes: 8 files"
echo "  - Part Two scenes: 8 files"
echo "  - Transitions: 5 files"
echo "  - Total files created: 24"
echo ""
echo "📝 Next steps:"
echo "  1. Review the generated files in $BASE_DIR"
echo "  2. Update src/config/game.ts to import from the new scenes directory"
echo "  3. Populate each scene file with actual game configuration data"
echo "  4. Update types.ts with any additional scene-specific types"
echo ""
echo "✨ No existing files were modified!"