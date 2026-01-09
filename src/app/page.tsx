'use client';

import { WelcomeScreen } from '@/shared/components/welcome-screen';

export default function Home() {
  const handleStartClick = () => {
    alert ('Adventure is out there...');
  };

  return <WelcomeScreen onStartClick={handleStartClick} />;
}