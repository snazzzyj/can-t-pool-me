
import React from 'react';
import HackingMainframe from './HackingMainframe';

interface HackingMainframeSceneProps {
  onComplete: () => void;
}

const HackingMainframeScene: React.FC<HackingMainframeSceneProps> = ({ onComplete }) => {
  return (
    <div className="w-full h-screen">
      <HackingMainframe onComplete={onComplete} />
    </div>
  );
};

export default HackingMainframeScene;
