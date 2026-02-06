'use client';

/**
 * Main game logic: state, game loop, collisions, wave spawning.
 * Refactored for maximum robustness and synchronized rendering.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import type {
  ShootTheLabubuState,
  LabubuEntity,
  BulletEntity,
  FallingBodyEntity,
  ShooterId,
} from '../types';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MAX_HEALTH,
  BULLET_SPEED,
  BULLET_SIZE,
  LABUBU_SIZE,
  SHOOTER_LINE_Y,
  BOTTOM_BAR_TOP,
  COLLECTOR_SPEED,
  COLLECTOR_MIN_X,
  COLLECTOR_MAX_X,
  SHOOTER_SPEED,
  SHOOTER_MIN_X,
  SHOOTER_MAX_X,
  BODIES_PER_HEAL,
  HP_PER_HEAL,
  INTER_WAVE_PAUSE_MS,
  FIRE_COOLDOWN_MS,
  LEVEL_CONFIGS,
  SHOOTER_LANE_X,
  WAVE_SPEED_RAMP_END,
  COUNTDOWN_SECONDS,
} from '../constants';
import { checkBulletLabubuCollision, checkBucketBodyCollision } from '../utils/collision';
import { getWavePattern } from '../utils/wave-patterns';
import { applyDecay } from '../utils/animation';
import { SHAKE_DURATION_MS, DAMAGE_FLASH_DURATION_MS, HEAL_FLASH_DURATION_MS } from '../utils/animation';
import type { PlayerInputState } from './usePlayerInput';

function createShooterState(level: 1 | 2 | 3) {
  const config = LEVEL_CONFIGS[level];
  const shooter = (lane: 'left' | 'center' | 'right') => ({
    isAlive: true,
    ammo: config.ammoPerShooter,
    maxAmmo: config.ammoPerShooter,
    position: { x: SHOOTER_LANE_X[lane], y: 950 },
    lane,
  });
  return { rab: shooter('left'), jenn: shooter('center'), joel: shooter('right') };
}

function createInitialState(): ShootTheLabubuState {
  const level = 1;
  const config = LEVEL_CONFIGS[level];
  return {
    gameStatus: 'pre-game',
    currentLevel: 1,
    currentWave: 1,
    waveTimer: config.waveDurationSeconds,
    sharedHealth: MAX_HEALTH,
    maxHealth: MAX_HEALTH,
    shooters: createShooterState(1),
    collectors: {
      elyse: { position: { x: 500, y: BOTTOM_BAR_TOP - 24 }, bodiesCaught: 0 },
      debbie: { position: { x: 1400, y: BOTTOM_BAR_TOP - 24 }, bodiesCaught: 0 },
    },
    labubus: [],
    bullets: [],
    fallingBodies: [],
    poofs: [],
    floatingTexts: [],
    stats: {
      totalBodiesCaught: 0,
      elyseBodies: 0,
      debbieBodies: 0,
      rabStats: { shotsFired: 0, shotsHit: 0, accuracy: 0, kills: 0 },
      jennStats: { shotsFired: 0, shotsHit: 0, accuracy: 0, kills: 0 },
      joelStats: { shotsFired: 0, shotsHit: 0, accuracy: 0, kills: 0 },
    },
    bodiesSinceLastHeal: 0,
    screenShake: 0,
    damageFlash: 0,
    healFlash: 0,
    waveStartTime: null,
  };
}

export function useShootTheLabubu(
  inputRef: React.RefObject<PlayerInputState | null>,
  onComplete: () => void,
  onRetry?: () => void
) {
  const [state, setState] = useState<ShootTheLabubuState>(createInitialState);

  // Use a ref to store the latest state for the game loop to avoid stale closures
  const stateRef = useRef<ShootTheLabubuState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const waveSpawnIndexRef = useRef(0);
  const waveSpawnListRef = useRef<ReturnType<typeof getWavePattern>>([]);
  const lastFireTimeRef = useRef<Record<ShooterId, number>>({ rab: 0, jenn: 0, joel: 0 });
  const countdownEndRef = useRef<number | null>(null);
  const waveCompleteAtRef = useRef<number | null>(null);

  // Internal counters to avoid global state pollution
  const entityIdCounter = useRef({ bullet: 0, body: 0, labubu: 0, poof: 0, text: 0 });

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameStatus: 'countdown' }));
    countdownEndRef.current = Date.now() + COUNTDOWN_SECONDS * 1000;
  }, []);

  const retry = useCallback(() => {
    if (onRetry) onRetry();
    const currentLevel = stateRef.current.currentLevel;
    const config = LEVEL_CONFIGS[currentLevel];

    setState(() => ({
      ...createInitialState(),
      gameStatus: 'countdown',
      currentLevel: currentLevel,
      currentWave: 1,
      waveTimer: config.waveDurationSeconds,
      shooters: createShooterState(currentLevel),
      sharedHealth: MAX_HEALTH,
    }));

    waveSpawnIndexRef.current = 0;
    waveSpawnListRef.current = [];
    waveCompleteAtRef.current = null;
    countdownEndRef.current = Date.now() + COUNTDOWN_SECONDS * 1000;
  }, [onRetry]);

  const startWave = useCallback((level: 1 | 2 | 3, wave: 1 | 2 | 3) => {
    const config = LEVEL_CONFIGS[level];
    waveSpawnIndexRef.current = 0;
    waveSpawnListRef.current = getWavePattern(level, wave);

    setState((prev) => {
      // Only reset shooters at the start of a level (wave 1)
      const shooters = wave === 1 ? createShooterState(level) : prev.shooters;

      return {
        ...prev,
        gameStatus: 'playing',
        currentLevel: level,
        currentWave: wave,
        waveTimer: config.waveDurationSeconds,
        waveStartTime: Date.now(),
        shooters,
        labubus: [],
        bullets: [],
        fallingBodies: [],
        poofs: [],
        floatingTexts: [],
      };
    });
  }, []);

  const continueToNextLevel = useCallback(() => {
    setState((prev) => {
      const nextLevel = (prev.currentLevel + 1) as 1 | 2 | 3;
      if (nextLevel > 3) {
        return { ...prev, gameStatus: 'victory' };
      }
      const config = LEVEL_CONFIGS[nextLevel];
      countdownEndRef.current = Date.now() + COUNTDOWN_SECONDS * 1000;
      return {
        ...prev,
        gameStatus: 'countdown',
        currentLevel: nextLevel,
        currentWave: 1,
        waveTimer: config.waveDurationSeconds,
        shooters: createShooterState(nextLevel),
        labubus: [],
        bullets: [],
        fallingBodies: [],
        poofs: [],
        floatingTexts: [],
      };
    });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (state.gameStatus !== 'countdown') return;
    const interval = setInterval(() => {
      const now = Date.now();
      if (countdownEndRef.current && now >= countdownEndRef.current) {
        countdownEndRef.current = null;
        startWave(stateRef.current.currentLevel, stateRef.current.currentWave);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [state.gameStatus, startWave]);

  // Victory effect
  useEffect(() => {
    if (state.gameStatus === 'victory') {
      onComplete();
    }
  }, [state.gameStatus, onComplete]);

  // Game Loop
  useEffect(() => {
    if (state.gameStatus !== 'playing') return;

    let rafId: number;
    let lastTime = Date.now();

    const loop = () => {
      const now = Date.now();
      const deltaMs = Math.min(now - lastTime, 100); // Cap delta to 100ms to prevent huge skips
      lastTime = now;
      const deltaSec = deltaMs / 1000;

      const s = stateRef.current;
      if (s.gameStatus !== 'playing') return;

      // Create a fresh copy of the state for updates
      const next = { ...s };
      const config = LEVEL_CONFIGS[s.currentLevel];
      const waveStartTime = s.waveStartTime || now;
      const waveElapsedSec = (now - waveStartTime) / 1000;
      const speedMult = Math.min(1 + (waveElapsedSec / config.waveDurationSeconds) * (WAVE_SPEED_RAMP_END - 1), WAVE_SPEED_RAMP_END);

      next.waveTimer = Math.max(0, s.waveTimer - deltaSec);
      next.screenShake = applyDecay(s.screenShake, deltaMs, SHAKE_DURATION_MS);
      next.damageFlash = applyDecay(s.damageFlash, deltaMs, DAMAGE_FLASH_DURATION_MS);
      next.healFlash = applyDecay(s.healFlash, deltaMs, HEAL_FLASH_DURATION_MS);

      // Clean up poofs and floating texts
      next.poofs = s.poofs.filter((p) => now - p.createdAt < 250);
      next.floatingTexts = s.floatingTexts.filter((t) => now - t.createdAt < 1000);

      // Input handling: Collectors
      const input = inputRef.current;
      if (input) {
        const elyseX = s.collectors.elyse.position.x + input.elyseMove * COLLECTOR_SPEED * deltaSec;
        const debbieX = s.collectors.debbie.position.x + input.debbieMove * COLLECTOR_SPEED * deltaSec;
        next.collectors = {
          elyse: { ...s.collectors.elyse, position: { ...s.collectors.elyse.position, x: Math.max(COLLECTOR_MIN_X, Math.min(COLLECTOR_MAX_X, elyseX)) } },
          debbie: { ...s.collectors.debbie, position: { ...s.collectors.debbie.position, x: Math.max(COLLECTOR_MIN_X, Math.min(COLLECTOR_MAX_X, debbieX)) } },
        };

        // Input handling: Shooters Movement
        const rabX = s.shooters.rab.position.x + input.rabMove * SHOOTER_SPEED * deltaSec;
        const jennX = s.shooters.jenn.position.x + input.jennMove * SHOOTER_SPEED * deltaSec;
        const joelX = s.shooters.joel.position.x + input.joelMove * SHOOTER_SPEED * deltaSec;

        next.shooters = {
          rab: { ...s.shooters.rab, position: { ...s.shooters.rab.position, x: Math.max(SHOOTER_MIN_X, Math.min(SHOOTER_MAX_X, rabX)) } },
          jenn: { ...s.shooters.jenn, position: { ...s.shooters.jenn.position, x: Math.max(SHOOTER_MIN_X, Math.min(SHOOTER_MAX_X, jennX)) } },
          joel: { ...s.shooters.joel, position: { ...s.shooters.joel.position, x: Math.max(SHOOTER_MIN_X, Math.min(SHOOTER_MAX_X, joelX)) } },
        };

        // Input handling: Shooting
        const fireBullet = (id: ShooterId) => {
          const shooter = next.shooters[id];
          if (!shooter.isAlive || shooter.ammo <= 0) return;
          const lastFire = lastFireTimeRef.current[id];
          if (now - lastFire < FIRE_COOLDOWN_MS) return;

          lastFireTimeRef.current[id] = now;
          const newBullet: BulletEntity = {
            id: `bullet-${++entityIdCounter.current.bullet}`,
            position: { x: shooter.position.x - BULLET_SIZE / 2, y: SHOOTER_LINE_Y - 50 },
            shooterId: id,
          };
          next.bullets = [...next.bullets, newBullet];
          next.shooters = { ...next.shooters, [id]: { ...shooter, ammo: shooter.ammo - 1 } };
          next.stats = {
            ...next.stats,
            [`${id}Stats`]: { ...next.stats[`${id}Stats`], shotsFired: next.stats[`${id}Stats`].shotsFired + 1 },
          } as ShootTheLabubuState['stats'];
        };

        if (input.shootRab) fireBullet('rab');
        if (input.shootJenn) fireBullet('jenn');
        if (input.shootJoel) fireBullet('joel');
      }

      // Spawns
      const spawnList = waveSpawnListRef.current;
      const elapsedMsSinceWaveStart = now - waveStartTime;
      while (waveSpawnIndexRef.current < spawnList.length) {
        const ev = spawnList[waveSpawnIndexRef.current];
        if (elapsedMsSinceWaveStart < ev.delayMs) break;

        const newLabubu: LabubuEntity = {
          id: `labubu-${++entityIdCounter.current.labubu}`,
          position: { x: ev.x - LABUBU_SIZE / 2, y: -LABUBU_SIZE },
          color: ev.color,
          speed: config.baseSpeed * speedMult,
          isAlive: true,
        };
        next.labubus = [...next.labubus, newLabubu];
        waveSpawnIndexRef.current++;
      }

      // Movement: Bullets
      next.bullets = next.bullets
        .map((b) => ({ ...b, position: { ...b.position, y: b.position.y - BULLET_SPEED * deltaSec } }))
        .filter((b) => b.position.y > -BULLET_SIZE);

      // Movement: Labubus & Damage Check
      const survivingLabubus: LabubuEntity[] = [];
      let currentHealth = next.sharedHealth;
      let someShooterDied = false;

      for (const lab of next.labubus) {
        const nextY = lab.position.y + lab.speed * deltaSec;
        if (nextY + LABUBU_SIZE >= SHOOTER_LINE_Y) {
          currentHealth -= 1;
          next.screenShake = 1;
          next.damageFlash = 1;
          if (currentHealth <= 0) someShooterDied = true;
          continue; // Labubu reached the line, dealt damage, and vanished
        }
        survivingLabubus.push({ ...lab, position: { ...lab.position, y: nextY } });
      }
      next.labubus = survivingLabubus;
      next.sharedHealth = Math.max(0, currentHealth);
      if (someShooterDied || currentHealth <= 0) {
        next.shooters = {
          rab: { ...next.shooters.rab, isAlive: false },
          jenn: { ...next.shooters.jenn, isAlive: false },
          joel: { ...next.shooters.joel, isAlive: false },
        };
      }

      // Collision: Bullets vs Labubus
      const bulletsToRemove = new Set<string>();
      const labubusToRemove = new Set<string>();

      for (const bullet of next.bullets) {
        for (const lab of next.labubus) {
          if (labubusToRemove.has(lab.id)) continue;
          if (checkBulletLabubuCollision(bullet, lab)) {
            bulletsToRemove.add(bullet.id);
            labubusToRemove.add(lab.id);

            // Stats update
            const sid = bullet.shooterId;
            next.stats = {
              ...next.stats,
              [`${sid}Stats`]: {
                ...next.stats[`${sid}Stats`],
                shotsHit: next.stats[`${sid}Stats`].shotsHit + 1,
                kills: next.stats[`${sid}Stats`].kills + 1,
              },
            } as ShootTheLabubuState['stats'];

            // Create falling body and poof
            next.fallingBodies = [
              ...next.fallingBodies,
              { id: `body-${++entityIdCounter.current.body}`, position: { ...lab.position }, color: lab.color }
            ];
            next.poofs = [
              ...next.poofs,
              { id: `poof-${++entityIdCounter.current.poof}`, position: { ...lab.position }, createdAt: now }
            ];
            break;
          }
        }
      }
      next.bullets = next.bullets.filter(b => !bulletsToRemove.has(b.id));
      next.labubus = next.labubus.filter(l => !labubusToRemove.has(l.id));

      // Movement: Falling Bodies & Collections
      const elysePos = next.collectors.elyse.position;
      const debbiePos = next.collectors.debbie.position;
      const gravity = 400;
      let elyseCaughtCount = 0;
      let debbieCaughtCount = 0;

      next.fallingBodies = next.fallingBodies.map((body) => {
        const nextY = body.position.y + gravity * deltaSec;
        if (nextY > SCREEN_HEIGHT + 50) return null; // Off screen

        const updatedBody = { ...body, position: { ...body.position, y: nextY } };
        if (checkBucketBodyCollision(elysePos.x, elysePos.y, updatedBody)) {
          elyseCaughtCount++;
          return null;
        }
        if (checkBucketBodyCollision(debbiePos.x, debbiePos.y, updatedBody)) {
          debbieCaughtCount++;
          return null;
        }
        return updatedBody;
      }).filter((b): b is FallingBodyEntity => b !== null);

      if (elyseCaughtCount > 0 || debbieCaughtCount > 0) {
        const totalCaught = elyseCaughtCount + debbieCaughtCount;
        next.collectors = {
          elyse: { ...next.collectors.elyse, bodiesCaught: next.collectors.elyse.bodiesCaught + elyseCaughtCount },
          debbie: { ...next.collectors.debbie, bodiesCaught: next.collectors.debbie.bodiesCaught + debbieCaughtCount },
        };
        next.stats = {
          ...next.stats,
          totalBodiesCaught: next.stats.totalBodiesCaught + totalCaught,
          elyseBodies: next.stats.elyseBodies + elyseCaughtCount,
          debbieBodies: next.stats.debbieBodies + debbieCaughtCount,
        };

        // Healing logic
        let bodiesProgress = next.bodiesSinceLastHeal + totalCaught;
        while (bodiesProgress >= BODIES_PER_HEAL) {
          bodiesProgress -= BODIES_PER_HEAL;
          next.sharedHealth = Math.min(MAX_HEALTH, next.sharedHealth + HP_PER_HEAL);
          next.healFlash = 1;
          next.floatingTexts = [
            ...next.floatingTexts,
            { id: `heal-${++entityIdCounter.current.text}`, text: '+5 HP', position: { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 }, createdAt: now }
          ];
        }
        next.bodiesSinceLastHeal = bodiesProgress;
      }

      // Status Checks
      if (!next.shooters.rab.isAlive && !next.shooters.jenn.isAlive && !next.shooters.joel.isAlive) {
        next.gameStatus = 'game-over';
      } else {
        const patternsDepleted = waveSpawnIndexRef.current >= spawnList.length;
        const allCleared = next.labubus.length === 0 && next.fallingBodies.length === 0;
        const timerOut = next.waveTimer <= 0;

        if (allCleared && (patternsDepleted || timerOut)) {
          if (!waveCompleteAtRef.current) {
            waveCompleteAtRef.current = now;
          } else if (now - waveCompleteAtRef.current >= INTER_WAVE_PAUSE_MS) {
            next.gameStatus = 'wave-complete';
            waveCompleteAtRef.current = null;
          }
        }
      }

      // Synchronize back to React state
      setState(next);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [state.gameStatus, inputRef, startWave]);

  // Handle wave-complete transition
  useEffect(() => {
    if (state.gameStatus !== 'wave-complete') return;
    const nextWave = (state.currentWave + 1);
    if (nextWave > 3) {
      setState(prev => ({ ...prev, gameStatus: 'level-complete' }));
    } else {
      startWave(state.currentLevel, nextWave as 1 | 2 | 3);
    }
  }, [state.gameStatus, startWave, state.currentLevel, state.currentWave]);

  return {
    state,
    startGame,
    retry,
    continueToNextLevel,
  };
}
