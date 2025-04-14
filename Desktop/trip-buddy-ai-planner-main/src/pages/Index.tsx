
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TravelForm from '@/components/TravelForm';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import LoadingState from '@/components/LoadingState';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [itinerary, setItinerary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleItineraryGenerated = (generatedItinerary: string) => {
    setItinerary(generatedItinerary);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="container max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start Planning Your Dream Trip</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your preferences, and our AI will create a personalized travel itinerary just for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <TravelForm 
                onItineraryGenerated={handleItineraryGenerated} 
                setLoading={setIsLoading}
              />
            </div>
            
            <div>
              <ScrollArea className="h-[600px] rounded-md">
                {isLoading ? (
                  <LoadingState />
                ) : (
                  <ItineraryDisplay itinerary={itinerary} />
                )}
              </ScrollArea>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="bg-primary/5 py-16">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Travelers Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how Trip Buddy has helped travelers create unforgettable experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg p-6 border shadow-sm travel-card"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.destination}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const testimonials = [
  {
    name: "Sarah J.",
    destination: "Tokyo, Japan",
    text: "Trip Buddy created the perfect balance of cultural experiences and modern attractions for my Tokyo trip. I discovered places I would have never found on my own!"
  },
  {
    name: "Michael R.",
    destination: "Barcelona, Spain",
    text: "I was overwhelmed with planning our family vacation until I used Trip Buddy. The AI understood our needs perfectly and planned a kid-friendly itinerary."
  },
  {
    name: "Elena K.",
    destination: "Bali, Indonesia",
    text: "As a solo traveler, safety and authentic experiences were my priority. Trip Buddy delivered a perfect mix of popular spots and hidden gems."
  }
];

export default Index;
