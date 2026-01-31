import React from 'react';
import { PuzzlePerfect } from './components/PuzzlePerfect';

interface PuzzlePerfectSceneProps {
  onComplete: () => void;
}

const PuzzlePerfectScene: React.FC<PuzzlePerfectSceneProps> = ({ onComplete }) => {
  return (
    <div className="w-full h-screen">
      <PuzzlePerfect onComplete={() => onComplete()} />
    </div>
  );
};

export default PuzzlePerfectScene;
