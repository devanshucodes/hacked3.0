
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane } from 'lucide-react';

const LoadingState = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <Plane className="h-16 w-16 text-primary animate-float" />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
        </div>
        <h3 className="mt-6 text-xl font-medium">Creating Your Dream Itinerary</h3>
        <p className="mt-2 text-muted-foreground text-center max-w-md">
          Our AI is carefully crafting a personalized travel plan based on your preferences. This may take a moment...
        </p>
        
        <div className="mt-8 flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
