
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Map, Calendar, PlaneTakeoff } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/60 mix-blend-multiply" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 py-32 md:py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
          Your Personal AI Travel Planner
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
          Create personalized itineraries based on your preferences, budget, and interests with our AI-powered travel companion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            <PlaneTakeoff className="mr-2 h-5 w-5" />
            Plan Your Trip
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20">
            <Plane className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Smart Itineraries</h3>
            <p className="text-white/80">AI-generated plans tailored to your interests and travel style.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20">
            <Map className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Local Insights</h3>
            <p className="text-white/80">Discover hidden gems and authentic experiences in your destination.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20">
            <Calendar className="h-10 w-10 mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Budget Control</h3>
            <p className="text-white/80">Plan trips that match your spending preferences without compromise.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
