'use client';

import React, { useState, useEffect } from 'react';
import { useShootTheLabubu } from './hooks/useShootTheLabubu';
import { usePlayerInput } from './hooks/usePlayerInput';
import { SCREEN_WIDTH, SCREEN_HEIGHT, BULLET_SIZE, CHARACTER_PORTRAITS, BOTTOM_BAR_TOP } from './constants';
import GameHUD from './components/GameHUD';
import LabubuSprite from './components/LabubuSprite';
import ShooterLane from './components/ShooterLane';
import CollectorBucket from './components/CollectorBucket';
import StatsScreen from './components/StatsScreen';
import GameOverScreen from './components/GameOverScreen';
import PreGameInstructions from './components/PreGameInstructions';
import CountdownOverlay from './components/CountdownOverlay';
import './shoot-the-labubu.css';

interface ShootTheLabubuProps {
  onComplete: () => void;
  onRetry?: () => void;
}

export default function ShootTheLabubu({ onComplete, onRetry }: ShootTheLabubuProps) {
  const inputRef = usePlayerInput();
  const { state, startGame, retry, continueToNextLevel } = useShootTheLabubu(
    inputRef,
    onComplete,
    onRetry
  );

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / SCREEN_WIDTH;
      const scaleY = window.innerHeight / SCREEN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-game
  if (state.gameStatus === 'pre-game') {
    return (
      <div className="shoot-the-labubu-root flex h-screen w-full items-center justify-center bg-black">
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className="level-bg level-1 absolute inset-0" />
          <PreGameInstructions onStart={startGame} />
        </div>
      </div>
    );
  }

  // Countdown
  if (state.gameStatus === 'countdown') {
    return (
      <div className="shoot-the-labubu-root flex h-screen w-full items-center justify-center bg-black">
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className={`level-bg level-${state.currentLevel} absolute inset-0`} />
          <CountdownOverlay />
        </div>
      </div>
    );
  }

  // Game Over
  if (state.gameStatus === 'game-over') {
    const wavesSurvived = state.currentWave; // approximate; could track in state
    return (
      <div className="shoot-the-labubu-root flex h-screen w-full items-center justify-center bg-black">
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className={`level-bg level-${state.currentLevel} absolute inset-0`} />
          <GameOverScreen
            bodiesCaught={state.stats.totalBodiesCaught}
            wavesSurvived={state.currentWave}
            currentLevel={state.currentLevel}
            onRetry={retry}
          />
        </div>
      </div>
    );
  }

  // Level complete (stats + continue)
  if (state.gameStatus === 'level-complete') {
    return (
      <div className="shoot-the-labubu-root flex h-screen w-full items-center justify-center bg-black">
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <div className={`level-bg level-${state.currentLevel} absolute inset-0`} />
          <StatsScreen
            level={state.currentLevel}
            stats={state.stats}
            onContinue={continueToNextLevel}
          />
        </div>
      </div>
    );
  }

  // Playing or wave-complete (same view; wave-complete shows brief pause then auto-advances)
  const shakeX = state.screenShake > 0 ? (Math.random() - 0.5) * 10 : 0;

  return (
    <div className="shoot-the-labubu-root flex h-screen w-full items-center justify-center bg-black">
      <div
        className="relative overflow-hidden"
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          transform: `scale(${scale}) translate3d(${shakeX}px, 0, 0)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Level background */}
        <div className={`level-bg level-${state.currentLevel} absolute inset-0`} />

        {/* Game area: labubus (z-2), bullets (z-3), falling bodies (z-1), collectors (z-4), shooters (z-4) */}
        <div className="absolute inset-0" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Falling bodies */}
          {state.fallingBodies.map((body) => (
            <LabubuSprite
              key={body.id}
              labubu={{ ...body, isAlive: true, speed: 0 }}
              isFalling
            />
          ))}
          {/* Labubus */}
          {state.labubus.map((lab) => (
            <LabubuSprite key={lab.id} labubu={lab} />
          ))}
          {/* Bullets */}
          {state.bullets.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-full bg-white"
              style={{
                left: b.position.x,
                top: b.position.y,
                width: BULLET_SIZE,
                height: BULLET_SIZE,
                zIndex: 3,
              }}
            />
          ))}
          {/* Collectors */}
          <CollectorBucket
            collector={state.collectors.elyse}
            collectorName="Elyse"
            portraitSrc={CHARACTER_PORTRAITS.elyse}
          />
          <CollectorBucket
            collector={state.collectors.debbie}
            collectorName="Debbie"
            portraitSrc={CHARACTER_PORTRAITS.debbie}
          />
          {/* Shooters */}
          <ShooterLane
            shooter={state.shooters.rab}
            shooterName="Rab"
            portraitSrc={CHARACTER_PORTRAITS.rab}
          />
          <ShooterLane
            shooter={state.shooters.jenn}
            shooterName="Jenn"
            portraitSrc={CHARACTER_PORTRAITS.jenn}
          />
          <ShooterLane
            shooter={state.shooters.joel}
            shooterName="Joel"
            portraitSrc={CHARACTER_PORTRAITS.joel}
          />
        </div>

        <GameHUD
          level={state.currentLevel}
          wave={state.currentWave}
          sharedHealth={state.sharedHealth}
          maxHealth={state.maxHealth}
          waveTimer={state.waveTimer}
          shooters={state.shooters}
          collectors={state.collectors}
        />

        {/* Damage flash */}
        {state.damageFlash > 0 && (
          <div
            className="pointer-events-none absolute inset-0 bg-red-600 transition-opacity"
            style={{ opacity: state.damageFlash * 0.3, zIndex: 15 }}
          />
        )}
        {/* Heal flash */}
        {state.healFlash > 0 && (
          <div
            className="pointer-events-none absolute inset-0 bg-green-500 transition-opacity"
            style={{ opacity: state.healFlash * 0.2, zIndex: 15 }}
          />
        )}

        {state.gameStatus === 'countdown' && <CountdownOverlay />}
      </div>
    </div>
  );
}
