import React from 'react';
import AIEcosystem from '~/components/chat/AIEcosystem';
import BackgroundRays from '~/components/ui/BackgroundRays';
import { Header } from '~/components/header/Header';

export default function AIEcosystemPage() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <AIEcosystem />
    </div>
  );
} 