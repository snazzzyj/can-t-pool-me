import React from 'react';
import { getRotationDegrees } from '../utils/orientation-checker';

interface TargetHoleProps {
  shape: number[][];
  color: string;
  isActive: boolean;
  isFilled: boolean;
  ghostOrientation?: number;
  correctOrientation?: number;
  totalOrientations?: number;
}

export const TargetHole: React.FC<TargetHoleProps> = ({
  shape,
  color,
  isActive,
  isFilled,
  ghostOrientation = 0,
  correctOrientation = 0,
  totalOrientations = 1,
}) => {
  const points = shape.map(p => `${p[0]},${p[1]}`).join(' ');
  const ghostDegrees = getRotationDegrees(ghostOrientation, totalOrientations);
  const targetDegrees = getRotationDegrees(correctOrientation, totalOrientations);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* The Hole (Static) - Rotated to match correct solution */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
        style={{ transform: `rotate(${targetDegrees}deg)` }}
      >
        <svg viewBox="-50 -50 100 100" width="100%" height="100%" className="overflow-visible">
          <polygon
            points={points}
            fill="black"
            fillOpacity={0.8}
            stroke={isActive ? color : '#334155'}
            strokeWidth={isActive ? 3 : 1}
            className={`transition-colors duration-300 ${isActive ? 'animate-pulse-slow' : ''}`}
          />
        </svg>

        {/* Success Fill (Inside the rotated container so it matches) */}
        {isFilled && (
          <div className="absolute inset-0 z-10 animate-fade-in">
            <svg viewBox="-50 -50 100 100" width="100%" height="100%">
              <polygon points={points} fill={color} />
            </svg>
          </div>
        )}
      </div>

      {/* Ghost Overlay (Active Turn) - Rotated by User Input */}
      {/* Note: ghostOrientation is absolute rotation 0..360 based on index. 
          It acts independently of target rotation container because we want to animate it freely?
          No, if we put it inside target container, it would be relative. 
          We keep it outside (relative to 0) so user controls absolute rotation on screen.
      */}
      {isActive && !isFilled && (
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-40"
          style={{ transform: `rotate(${ghostDegrees}deg)`, transition: 'transform 0.05s linear' }}
        >
          <svg viewBox="-50 -50 100 100" width="100%" height="100%">
            <polygon
              points={points}
              fill={color}
              fillOpacity={0.1}
              stroke={color}
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
