/**
 * Main game logic: state, game loop, collisions, wave spawning.
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

function createInitialState(): ShootTheLabubuState {
  const level = 1;
  const config = LEVEL_CONFIGS[level];
  const shooter = (lane: 'left' | 'center' | 'right') => ({
    isAlive: true,
    ammo: config.ammoPerShooter,
    maxAmmo: config.ammoPerShooter,
    position: { x: SHOOTER_LANE_X[lane], y: 950 },
    lane,
  });
  return {
    gameStatus: 'pre-game',
    currentLevel: 1,
    currentWave: 1,
    waveTimer: LEVEL_CONFIGS[1].waveDurationSeconds,
    sharedHealth: MAX_HEALTH,
    maxHealth: MAX_HEALTH,
    shooters: {
      rab: shooter('left'),
      jenn: shooter('center'),
      joel: shooter('right'),
    },
    collectors: {
      elyse: { position: { x: 500, y: BOTTOM_BAR_TOP - 24 }, bodiesCaught: 0 },
      debbie: { position: { x: 1400, y: BOTTOM_BAR_TOP - 24 }, bodiesCaught: 0 },
    },
    labubus: [],
    bullets: [],
    fallingBodies: [],
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

let bulletId = 0;
let bodyId = 0;
let labubuId = 0;

export function useShootTheLabubu(
  inputRef: React.RefObject<PlayerInputState | null>,
  onComplete: () => void,
  onRetry?: () => void
) {
  const [state, setState] = useState<ShootTheLabubuState>(createInitialState);

  const waveSpawnIndexRef = useRef(0);
  const waveSpawnListRef = useRef<ReturnType<typeof getWavePattern>>([]);
  const lastFireTimeRef = useRef<Record<ShooterId, number>>({ rab: 0, jenn: 0, joel: 0 });
  const waveCompleteAtRef = useRef<number | null>(null);
  const countdownEndRef = useRef<number | null>(null);

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameStatus: 'countdown' }));
    countdownEndRef.current = Date.now() + COUNTDOWN_SECONDS * 1000;
  }, []);

  const startWave = useCallback((level: 1 | 2 | 3, wave: 1 | 2 | 3) => {
    waveSpawnIndexRef.current = 0;
    waveSpawnListRef.current = getWavePattern(level, wave);
    const config = LEVEL_CONFIGS[level];
    setState((prev) => ({
      ...prev,
      gameStatus: 'playing',
      currentLevel: level,
      currentWave: wave,
      waveTimer: config.waveDurationSeconds,
      waveStartTime: Date.now(),
      shooters: createShooterState(level),
    }));
  }, []);

  const retry = useCallback(() => {
    if (onRetry) onRetry();
    setState(createInitialState());
    waveSpawnIndexRef.current = 0;
    waveSpawnListRef.current = [];
    waveCompleteAtRef.current = null;
    countdownEndRef.current = null;
  }, [onRetry]);

  const continueToNextLevel = useCallback(() => {
    setState((prev) => {
      const nextLevel = (prev.currentLevel + 1) as 1 | 2 | 3;
      if (nextLevel > 3) {
        return { ...prev, gameStatus: 'victory' };
      }
      const config = LEVEL_CONFIGS[nextLevel];
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
      };
    });
    countdownEndRef.current = Date.now() + COUNTDOWN_SECONDS * 1000;
  }, []);

  // Countdown: when finished, start wave
  useEffect(() => {
    if (state.gameStatus !== 'countdown') return;
    const t = setInterval(() => {
      const now = Date.now();
      if (countdownEndRef.current && now >= countdownEndRef.current) {
        countdownEndRef.current = null;
        startWave(state.currentLevel, state.currentWave);
      }
    }, 100);
    return () => clearInterval(t);
  }, [state.gameStatus, state.currentLevel, state.currentWave, startWave]);

  // Victory: call onComplete
  useEffect(() => {
    if (state.gameStatus === 'victory') {
      onComplete();
    }
  }, [state.gameStatus, onComplete]);

  // Game loop
  useEffect(() => {
    if (state.gameStatus !== 'playing') return;

    let rafId: number;
    let lastTime = 0;
    const loop = (time: number) => {
      const now = time;
      const deltaMs = lastTime ? Math.min(now - lastTime, 100) : 16;
      lastTime = now;
      setState((prev) => {
        if (prev.gameStatus !== 'playing') return prev;
        const deltaSec = deltaMs / 1000;
        const config = LEVEL_CONFIGS[prev.currentLevel];
        const waveElapsed = prev.waveStartTime ? (now - prev.waveStartTime) / 1000 : 0;
        const speedMult = Math.min(1 + (waveElapsed / config.waveDurationSeconds) * (WAVE_SPEED_RAMP_END - 1), WAVE_SPEED_RAMP_END);

        let next = { ...prev };
        next.waveTimer = Math.max(0, prev.waveTimer - deltaSec);
        next.screenShake = applyDecay(prev.screenShake, deltaMs, SHAKE_DURATION_MS);
        next.damageFlash = applyDecay(prev.damageFlash, deltaMs, DAMAGE_FLASH_DURATION_MS);
        next.healFlash = applyDecay(prev.healFlash, deltaMs, HEAL_FLASH_DURATION_MS);

        // Input: move collectors
        const input = inputRef?.current;
        if (input) {
          const elyseX = prev.collectors.elyse.position.x + input.elyseMove * COLLECTOR_SPEED * deltaSec;
          const debbieX = prev.collectors.debbie.position.x + input.debbieMove * COLLECTOR_SPEED * deltaSec;
          next = {
            ...next,
            collectors: {
              elyse: { ...prev.collectors.elyse, position: { ...prev.collectors.elyse.position, x: Math.max(COLLECTOR_MIN_X, Math.min(COLLECTOR_MAX_X, elyseX)) } },
              debbie: { ...prev.collectors.debbie, position: { ...prev.collectors.debbie.position, x: Math.max(COLLECTOR_MIN_X, Math.min(COLLECTOR_MAX_X, debbieX)) } },
            },
          };
        }

        // Spawn Labubus from pattern
        const spawnList = waveSpawnListRef.current;
        const waveStart = prev.waveStartTime ?? 0;
        while (waveSpawnIndexRef.current < spawnList.length) {
          const ev = spawnList[waveSpawnIndexRef.current];
          if ((now - waveStart) < ev.delayMs) break;
          const labubu: LabubuEntity = {
            id: `labubu-${++labubuId}`,
            position: { x: ev.x - LABUBU_SIZE / 2, y: -LABUBU_SIZE },
            color: ev.color,
            speed: config.baseSpeed * speedMult,
            isAlive: true,
          };
          next.labubus = [...next.labubus, labubu];
          waveSpawnIndexRef.current++;
        }

        // Fire bullets from input + cooldown
        if (input) {
          const shoot = (id: ShooterId) => {
            const s = next.shooters[id];
            if (!s.isAlive || s.ammo <= 0) return;
            const last = lastFireTimeRef.current[id];
            if (now - last < FIRE_COOLDOWN_MS) return;
            lastFireTimeRef.current[id] = now;
            const bullet: BulletEntity = {
              id: `bullet-${++bulletId}`,
              position: { x: s.position.x - BULLET_SIZE / 2, y: SHOOTER_LINE_Y - 50 },
              shooterId: id,
            };
            next.bullets = [...next.bullets, bullet];
            next.shooters = { ...next.shooters, [id]: { ...s, ammo: s.ammo - 1 } };
            next.stats = {
              ...next.stats,
              [`${id}Stats`]: { ...next.stats[`${id}Stats`], shotsFired: next.stats[`${id}Stats`].shotsFired + 1 },
            } as ShootTheLabubuState['stats'];
          };
          if (input.shootRab) shoot('rab');
          if (input.shootJenn) shoot('jenn');
          if (input.shootJoel) shoot('joel');
        }

        // Move bullets up
        next.bullets = next.bullets
          .map((b) => ({ ...b, position: { ...b.position, y: b.position.y - BULLET_SPEED * deltaSec } }))
          .filter((b) => b.position.y > -BULLET_SIZE);

        // Move Labubus down & check shooter line (damage)
        const aliveLabubus: LabubuEntity[] = [];
        let health = next.sharedHealth;
        const shooterAlive = { ...next.shooters };
        for (const lab of next.labubus) {
          if (!lab.isAlive) continue;
          const newY = lab.position.y + lab.speed * deltaSec;
          if (newY + LABUBU_SIZE >= SHOOTER_LINE_Y) {
            health -= 1;
            next.screenShake = 1;
            next.damageFlash = 1;
            if (health <= 0) {
              shooterAlive.rab = { ...shooterAlive.rab, isAlive: false };
              shooterAlive.jenn = { ...shooterAlive.jenn, isAlive: false };
              shooterAlive.joel = { ...shooterAlive.joel, isAlive: false };
            }
            continue;
          }
          aliveLabubus.push({ ...lab, position: { ...lab.position, y: newY }, speed: config.baseSpeed * speedMult });
        }
        next.labubus = aliveLabubus;
        next.sharedHealth = Math.max(0, health);
        next.shooters = shooterAlive;

        // Bullet-Labubu collision
        const hitBulletIds = new Set<string>();
        const hitLabubuIds = new Set<string>();
        for (const bullet of next.bullets) {
          if (hitBulletIds.has(bullet.id)) continue;
          for (const lab of next.labubus) {
            if (hitLabubuIds.has(lab.id)) continue;
            if (checkBulletLabubuCollision(bullet, lab)) {
              hitBulletIds.add(bullet.id);
              hitLabubuIds.add(lab.id);
              const shooterId = bullet.shooterId;
              next.stats = {
                ...next.stats,
                [`${shooterId}Stats`]: {
                  ...next.stats[`${shooterId}Stats`],
                  shotsHit: next.stats[`${shooterId}Stats`].shotsHit + 1,
                  kills: next.stats[`${shooterId}Stats`].kills + 1,
                },
              } as ShootTheLabubuState['stats'];
              const body: FallingBodyEntity = {
                id: `body-${++bodyId}`,
                position: { ...lab.position },
                color: lab.color,
              };
              next.fallingBodies = [...next.fallingBodies, body];
              break;
            }
          }
        }
        next.bullets = next.bullets.filter((b) => !hitBulletIds.has(b.id));
        next.labubus = next.labubus.filter((l) => !hitLabubuIds.has(l.id));

        // Move falling bodies down & bucket collision
        const elysePos = next.collectors.elyse.position;
        const debbiePos = next.collectors.debbie.position;
        const fallingGravity = 400;
        const caughtIds = new Set<string>();
        let elyseCaught = 0;
        let debbieCaught = 0;
        let newBodiesSinceLastHeal = next.bodiesSinceLastHeal;
        let newHealth = next.sharedHealth;

        next.fallingBodies = next.fallingBodies
          .map((f) => {
            const newY = f.position.y + fallingGravity * deltaSec;
            if (newY > SCREEN_HEIGHT + 50) return null;
            const body = { ...f, position: { ...f.position, y: newY } };
            if (checkBucketBodyCollision(elysePos.x, elysePos.y, body)) {
              caughtIds.add(body.id);
              elyseCaught++;
              newBodiesSinceLastHeal++;
              return null;
            }
            if (checkBucketBodyCollision(debbiePos.x, debbiePos.y, body)) {
              caughtIds.add(body.id);
              debbieCaught++;
              newBodiesSinceLastHeal++;
              return null;
            }
            return body;
          })
          .filter((f): f is FallingBodyEntity => f !== null);

        if (elyseCaught > 0 || debbieCaught > 0) {
          next.collectors = {
            elyse: { ...next.collectors.elyse, bodiesCaught: next.collectors.elyse.bodiesCaught + elyseCaught },
            debbie: { ...next.collectors.debbie, bodiesCaught: next.collectors.debbie.bodiesCaught + debbieCaught },
          };
          next.stats = {
            ...next.stats,
            totalBodiesCaught: next.stats.totalBodiesCaught + elyseCaught + debbieCaught,
            elyseBodies: next.stats.elyseBodies + elyseCaught,
            debbieBodies: next.stats.debbieBodies + debbieCaught,
          };
        }
        while (newBodiesSinceLastHeal >= BODIES_PER_HEAL) {
          newBodiesSinceLastHeal -= BODIES_PER_HEAL;
          newHealth = Math.min(MAX_HEALTH, newHealth + HP_PER_HEAL);
          next.healFlash = 1;
        }
        next.bodiesSinceLastHeal = newBodiesSinceLastHeal;
        next.sharedHealth = newHealth;

        // Game over: all shooters dead
        if (!next.shooters.rab.isAlive && !next.shooters.jenn.isAlive && !next.shooters.joel.isAlive) {
          next.gameStatus = 'game-over';
          return next;
        }

        // Wave complete: all Labubus gone or timer 0
        const waveDone = next.labubus.length === 0 && next.fallingBodies.length === 0 && (next.waveTimer <= 0 || waveSpawnIndexRef.current >= spawnList.length);
        if (waveDone && !waveCompleteAtRef.current) {
          waveCompleteAtRef.current = now;
        }
        if (waveCompleteAtRef.current && now - waveCompleteAtRef.current >= INTER_WAVE_PAUSE_MS) {
          next.gameStatus = 'wave-complete';
          return next;
        }

        return next;
      });

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [state.gameStatus, inputRef]);

  // When status becomes wave-complete, schedule transition to next wave or level-complete
  useEffect(() => {
    if (state.gameStatus !== 'wave-complete') return;
    const t = setTimeout(() => {
      setState((prev) => {
        if (prev.currentWave >= 3) return { ...prev, gameStatus: 'level-complete' };
        const config = LEVEL_CONFIGS[prev.currentLevel];
        const nextWave = (prev.currentWave + 1) as 1 | 2 | 3;
        waveSpawnIndexRef.current = 0;
        waveSpawnListRef.current = getWavePattern(prev.currentLevel, nextWave);
        return {
          ...prev,
          gameStatus: 'playing',
          currentWave: nextWave,
          waveTimer: config.waveDurationSeconds,
          waveStartTime: Date.now(),
          shooters: {
            rab: { ...prev.shooters.rab, ammo: config.ammoPerShooter, maxAmmo: config.ammoPerShooter },
            jenn: { ...prev.shooters.jenn, ammo: config.ammoPerShooter, maxAmmo: config.ammoPerShooter },
            joel: { ...prev.shooters.joel, ammo: config.ammoPerShooter, maxAmmo: config.ammoPerShooter },
          },
          labubus: [],
          bullets: [],
          fallingBodies: [],
        };
      });
      waveCompleteAtRef.current = null;
    }, 100);
    return () => clearTimeout(t);
  }, [state.gameStatus]);

  return {
    state,
    startGame,
    retry,
    continueToNextLevel,
  };
}
