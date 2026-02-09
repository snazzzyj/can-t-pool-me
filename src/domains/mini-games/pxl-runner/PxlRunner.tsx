import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Press_Start_2P } from 'next/font/google';
import { GameState, LevelType, PlayerData, Obstacle } from './types';
import { getAssetPath } from '@/shared/utils/game';
import {
  PLAYERS_INIT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  LEVELS,
  LEVEL_TIME,
  INITIAL_LIVES,
  PLAYER_X,
  GROUND_Y,
  GRAVITY,
  INVINCIBILITY_DURATION,
  DEATH_DURATION,
  ANIMALS
} from './constants';
import AnimalSelection from './components/AnimalSelection';
import PlayerCountSelection from './components/PlayerCountSelection';
import HUD from './components/HUD';
import Overlays from './components/Overlays';
import './pxl-runner.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Maps codenames to the actual filename in /assets/characters/
const CHARACTER_ASSET_MAP: Record<string, string> = {
  'Sharker': 'Rab-1',
  'Big Iron McGee': 'Elyse-1',
  '.pxl': 'Debbie-1',
  'Hacktress': 'Jenn-1',
  'Hackerman': 'Joel-1'
};

interface PixelRunnerProps {
  onComplete: () => void;
}

const PixelRunner: React.FC<PixelRunnerProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYER_COUNT_SELECTION);
  const [numPlayers, setNumPlayers] = useState(5);
  const [currentLevel, setCurrentLevel] = useState<LevelType>(LevelType.DESERT);
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [selectingPlayerIndex, setSelectingPlayerIndex] = useState(0);
  const [timer, setTimer] = useState(() => LEVELS[LevelType.DESERT].duration ?? LEVEL_TIME);
  const [countdown, setCountdown] = useState(3);
  const [scale, setScale] = useState(1);

  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const timerRef = useRef<number>(LEVELS[LevelType.DESERT].duration ?? LEVEL_TIME);
  const obstaclesRef = useRef<Obstacle[][]>([[], [], [], [], []]);
  const spawnTimerRef = useRef<number[]>([0, 0, 0, 0, 0]);

  // Memoized character position map
  const characterPositions = useMemo(() => ({
    'Chicken.png': { left: '28%', top: '20px' },
    'Dino.png': { left: '35%', top: '10px' },
    'Snail.png': { left: '35%', top: '0px' },
    'Frog.png': { left: '50%', top: '2px' },
    'Bun.png': { left: '30%', top: '15px' },
    'Goose.png': { left: '42%', top: '20px' },
    default: { left: '50%', top: '0px' }
  }), []);

  // Helper function to get character position based on animal
  const getCharacterPosition = useCallback((animalPath: string) => {
    const key = Object.keys(characterPositions).find(k => k !== 'default' && animalPath.includes(k));
    return key ? characterPositions[key as keyof typeof characterPositions] : characterPositions.default;
  }, [characterPositions]);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / SCREEN_WIDTH;
      const scaleY = window.innerHeight / SCREEN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentLevel]);

  const handlePlayerCountSelect = (count: number) => {
    setNumPlayers(count);
    const initialPlayers = PLAYERS_INIT.slice(0, count).map(p => ({
      ...p,
      animal: '',
      lives: INITIAL_LIVES,
      y: GROUND_Y,
      vy: 0,
      isJumping: false,
      isInvincible: false,
      invincibilityTimer: 0,
      isDead: false,
      deathTimer: 0,
      progress: 0,
      finishTime: null,
      assetPath: `/assets/characters/${CHARACTER_ASSET_MAP[p.codename] || 'Rab-1'}.png`
    }));
    setPlayers(initialPlayers);
    setGameState(GameState.ANIMAL_SELECTION);
  };

  const handleAnimalSelect = (animalId: string) => {
    const newPlayers = [...players];

    // Find the selected animal from ANIMALS array
    const selectedAnimal = ANIMALS.find(a => a.id === animalId);

    if (selectedAnimal) {
      // Store the asset path instead of emoji
      newPlayers[selectingPlayerIndex].animal = selectedAnimal.assetPath;
    }

    setPlayers(newPlayers);

    if (selectingPlayerIndex < numPlayers - 1) {
      setSelectingPlayerIndex(selectingPlayerIndex + 1);
    } else {
      setGameState(GameState.COUNTDOWN);
    }
  };

  const resetLevel = useCallback(() => {
    setTimer(LEVELS[currentLevel].duration ?? LEVEL_TIME);
    timerRef.current = LEVELS[currentLevel].duration ?? LEVEL_TIME;
    setGameState(GameState.COUNTDOWN);
    setCountdown(3);
    obstaclesRef.current = [[], [], [], [], []];
    spawnTimerRef.current = [0, 0, 0, 0, 0];

    // reset the animation frame timestamp to avoid a huge delta on restart
    lastTimeRef.current = 0;

    setPlayers(prev => prev.map(p => ({
      ...p,
      lives: INITIAL_LIVES,
      y: GROUND_Y,
      vy: 0,
      isJumping: false,
      isInvincible: false,
      isDead: false,
      progress: 0,
      finishTime: null
    })));
  }, [currentLevel]);

  const handleLevelComplete = useCallback(() => {
    if (currentLevel === LevelType.DESERT) {
      setCurrentLevel(LevelType.RAINFOREST);
    } else if (currentLevel === LevelType.RAINFOREST) {
      setCurrentLevel(LevelType.SNOWSTORM);
    } else {
      setGameState(GameState.VICTORY);
      setTimeout(() => onComplete(), 3000);
      return;
    }
    setGameState(GameState.TRANSITION);
    setTimeout(() => resetLevel(), 2000);
  }, [currentLevel, resetLevel, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGameState(prev => prev === GameState.PLAYING ? GameState.PAUSED : (prev === GameState.PAUSED ? GameState.PLAYING : prev));
        return;
      }
      if (gameState !== GameState.PLAYING) return;
      const key = e.key.toUpperCase();
      setPlayers(prev => {
        const next = [...prev];
        const idx = next.findIndex(p => p.key === key);
        if (idx !== -1) {
          const p = next[idx];
          if (!p.isJumping && !p.isDead && !p.finishTime) {
            p.isJumping = true;
            p.vy = -12;
          }
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Debug: log state transitions for troubleshooting
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[PxlRunner] gameState change', gameState);
  }, [gameState]);

  const update = useCallback((time: number) => {
    if (gameState === GameState.PLAYING) {
      const deltaTime = lastTimeRef.current === 0 ? 16 : Math.min(64, time - lastTimeRef.current);
      const levelConfig = LEVELS[currentLevel];

      // Update timer ref and state - only update state if changed significantly
      const prevTimer = timerRef.current;
      timerRef.current = Math.max(0, timerRef.current - deltaTime / 1000);
      const timerChanged = Math.floor(timerRef.current) !== Math.floor(prevTimer);

      setPlayers(prevPlayers => {
        let allFinished = true;
        let hasStateChanges = false;
        const nextPlayers: PlayerData[] = [];

        for (let i = 0; i < prevPlayers.length; i++) {
          const player = prevPlayers[i];
          const p: PlayerData = { ...player };

          if (p.finishTime) {
            nextPlayers.push(p);
            continue;
          }

          if (p.isJumping) {
            p.y += p.vy;
            p.vy += GRAVITY;
            if (p.y >= GROUND_Y) {
              p.y = GROUND_Y;
              p.isJumping = false;
              p.vy = 0;
            }
            hasStateChanges = true;
          }

          if (p.isInvincible) {
            p.invincibilityTimer -= deltaTime;
            if (p.invincibilityTimer <= 0) {
              p.isInvincible = false;
              hasStateChanges = true;
            }
          }

          if (p.isDead) {
            p.deathTimer -= deltaTime;
            if (p.deathTimer <= 0) {
              p.isDead = false;
              p.lives = INITIAL_LIVES;
              p.y = GROUND_Y;
              p.progress = 0;
              obstaclesRef.current[i] = [];
              hasStateChanges = true;
            }
            allFinished = false;
            nextPlayers.push(p);
            continue;
          }

          const levelDuration = levelConfig.duration ?? LEVEL_TIME;
          p.progress += (levelConfig.speed * deltaTime) / 1000;
          const totalDist = levelConfig.speed * levelDuration;

          if (p.progress >= totalDist) {
            p.finishTime = time;
            hasStateChanges = true;
          } else {
            allFinished = false;
          }

          // Spawn obstacles
          spawnTimerRef.current[i] -= deltaTime;
          if (spawnTimerRef.current[i] <= 0 && p.progress < totalDist * 0.95) {
            const obsConfig = levelConfig.obstacles[Math.floor(Math.random() * levelConfig.obstacles.length)];
            obstaclesRef.current[i].push({ id: Math.random().toString(), x: SCREEN_WIDTH, ...obsConfig });
            const [min, max] = levelConfig.spawnFreq;
            spawnTimerRef.current[i] = (min + Math.random() * (max - min)) * 1000;
            hasStateChanges = true;
          }

          // Collision detection - optimized with early exit
          if (!p.isInvincible && !p.isDead && !p.finishTime) {
            const pX = PLAYER_X;
            const pY = p.y - 48;
            const pW = 40;
            const pH = 40;

            const obstacles = obstaclesRef.current[i];
            for (let j = 0; j < obstacles.length; j++) {
              const obs = obstacles[j];
              obs.x -= (levelConfig.speed * deltaTime) / 1000;

              // AABB collision detection optimized
              const oX = obs.x;
              const oY = GROUND_Y - obs.height;
              const oW = obs.width;
              const oH = obs.height;

              if (pX < oX + oW && pX + pW > oX && pY < oY + oH && pY + pH > oY) {
                p.lives--;
                if (p.lives <= 0) {
                  p.isDead = true;
                  p.deathTimer = DEATH_DURATION;
                } else {
                  p.isInvincible = true;
                  p.invincibilityTimer = INVINCIBILITY_DURATION;
                }
                hasStateChanges = true;
                break; // Exit early - only take damage once per frame
              }
            }

            // Remove off-screen obstacles
            obstaclesRef.current[i] = obstacles.filter(obs => obs.x > -100);
          } else {
            // Still update obstacle positions even if player is dead/invincible
            const obstacles = obstaclesRef.current[i];
            for (let j = 0; j < obstacles.length; j++) {
              obstacles[j].x -= (levelConfig.speed * deltaTime) / 1000;
            }
            obstaclesRef.current[i] = obstacles.filter(obs => obs.x > -100);
          }

          nextPlayers.push(p);
        }

        // Only trigger state changes if something actually changed
        if (!hasStateChanges && prevPlayers === nextPlayers) {
          return prevPlayers;
        }

        // Check win condition
        if (allFinished) {
          handleLevelComplete();
        } else if (timerRef.current === 0) {
          // eslint-disable-next-line no-console
          console.warn('[PxlRunner] timer reached 0 and not all players finished -> GAME_OVER', { currentLevel });
          setGameState(GameState.GAME_OVER);
        }

        return nextPlayers;
      });

      // Only update timer display if it changed
      if (timerChanged) {
        setTimer(timerRef.current);
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  }, [gameState, currentLevel, handleLevelComplete]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [update]);

  useEffect(() => {
    if (gameState === GameState.COUNTDOWN) {
      const id = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setGameState(GameState.PLAYING);
            clearInterval(id);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [gameState]);

  return (
    <div className={`pxl-runner-container ${pressStart2P.className} w-full h-screen overflow-hidden flex items-center justify-center select-none`}>
      <div
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'center center' }}
        className="relative bg-black flex flex-col overflow-hidden shadow-2xl"
      >
        {gameState === GameState.PLAYER_COUNT_SELECTION && <PlayerCountSelection onSelect={handlePlayerCountSelect} />}
        {gameState === GameState.ANIMAL_SELECTION && (
          <AnimalSelection
            currentPlayer={players[selectingPlayerIndex]}
            selectingIndex={selectingPlayerIndex}
            totalToSelect={numPlayers}
            onSelect={handleAnimalSelect}
          />
        )}
        {(gameState === GameState.PLAYING || gameState === GameState.PAUSED || gameState === GameState.COUNTDOWN || gameState === GameState.TRANSITION) && (
          <>
            <HUD timer={timer} level={currentLevel} players={players} />
            <div className="flex-1 flex flex-col">
              {players.map((p, i) => {
                const completed = !!p.finishTime;
                const bgColor = LEVELS[currentLevel].bgColor + '22';
                const bgImage = getAssetPath(LEVELS[currentLevel].backgroundImage);
                const laneOpacity = completed ? 0.45 : 1;
                
                return (
                <div
                  key={p.id}
                  className="flex-1 relative border-b-4 border-opacity-40 overflow-hidden"
                  style={{
                    borderColor: p.color,
                    backgroundColor: bgColor,
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: laneOpacity
                  }}
                >
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-black/70 px-4 py-2 rounded border border-white/20">
                    <span className="text-[14px] text-white font-bold">{p.codename} ({p.key})</span>
                    <div className="flex gap-1">
                      {[...Array(INITIAL_LIVES)].map((_, li) => (
                        <span key={li} className="text-lg">{li < p.lives ? '❤️' : '🖤'}</span>
                      ))}
                    </div>
                  </div>

                  {completed && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                      <div className="bg-black/60 px-6 py-3 rounded text-4xl text-white font-bold tracking-wider uppercase">LEVEL COMPLETE</div>
                    </div>
                  )}

                  {!p.isDead && (
                    <div
                      className={`absolute z-20 ${p.isInvincible ? 'animate-pulse opacity-60' : ''}`}
                      style={{ left: PLAYER_X, top: p.y - 55 }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Animal sprite - main character */}
                        <img
                          src={getAssetPath(p.animal)}
                          alt={p.codename}
                          className="w-16 h-16 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        {/* Character avatar - positioned based on animal */}
                        <img
                          src={getAssetPath(p.assetPath)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 object-contain"
                          style={{
                            imageRendering: 'pixelated',
                            ...getCharacterPosition(p.animal)
                          }}
                          alt={p.codename}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-avatar')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'fallback-avatar absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-xs font-bold';
                              fallback.style.backgroundColor = p.color;
                              const position = getCharacterPosition(p.animal);
                              fallback.style.left = position.left;
                              fallback.style.top = position.top;
                              fallback.innerText = p.codename.charAt(0);
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {obstaclesRef.current[i]?.map(obs => (
                    <div key={obs.id} className="absolute z-10 text-5xl pointer-events-none" style={{ left: obs.x, top: GROUND_Y - obs.height - 10, willChange: 'transform' }}>
                      {obs.emoji}
                    </div>
                  ))}
                  <div className="absolute left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-600 z-20" style={{ top: GROUND_Y + 9 }}></div>
                  <div className="absolute bottom-0 left-0 w-full h-3 bg-white/10">
                    <div className="h-full transition-all" style={{ width: `${(p.progress / (LEVELS[currentLevel].speed * (LEVELS[currentLevel].duration ?? LEVEL_TIME))) * 100}%`, backgroundColor: p.color }}></div>
                  </div>
                </div>
                );
              })}
            </div>
          </>
        )}
        <Overlays gameState={gameState} currentLevel={currentLevel} countdown={countdown} onRestart={resetLevel} />
      </div>
    </div>
  );
};

export default PixelRunner;