import React from 'react';
import { getRotationDegrees } from '../utils/orientation-checker';

interface PuzzlePieceProps {
  shape: number[][]; // [[x,y], [x,y]...]
  orientation: number;
  totalOrientations: number;
  color: string;
  isActive: boolean;
  size?: number;
}

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  shape,
  orientation,
  totalOrientations,
  color,
  isActive,
  size = 120
}) => {
  const points = shape.map(p => `${p[0]},${p[1]}`).join(' ');
  const degrees = getRotationDegrees(orientation, totalOrientations);

  return (
    <div
      className={`relative transition-all duration-75 ease-out ${isActive ? 'z-20' : 'z-10'}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${degrees}deg)`,
      }}
    >
      <svg
        viewBox="-50 -50 100 100"
        width="100%"
        height="100%"
        className="overflow-visible"
      >
        <polygon
          points={points}
          fill={color}
          fillOpacity={0.4}
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className={isActive ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}
        />
        {/* Wireframe / Internal Details for tech look */}
        <polygon
          points={points}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          transform="scale(0.8)"
        />
        <circle cx="0" cy="0" r="2" fill={color} />
      </svg>
    </div>
  );
};
