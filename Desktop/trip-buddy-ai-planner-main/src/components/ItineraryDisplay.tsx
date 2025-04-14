import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, MapPin, UtilityPole, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItineraryDisplayProps {
  itinerary: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  // Parse days from the itinerary text
  const days = itinerary.split(/Day \d+:/g).filter(Boolean).map((day, index) => ({
    id: `day-${index + 1}`,
    title: `Day ${index + 1}`,
    content: day.trim()
  }));

  const isEmpty = !itinerary || days.length === 0;

  if (isEmpty) {
    return null;
  }

  const formatDayContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Skip empty lines
      if (!line.trim()) return null;
      
      // Style budget-related lines
      if (line.toLowerCase().includes('budget') || line.includes('$')) {
        return (
          <div key={i} className="bg-primary/5 p-3 rounded-lg my-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            <span className="font-medium">{line}</span>
          </div>
        );
      }
      
      // Style section headers
      if (line.trim().toLowerCase().includes('morning') || 
          line.trim().toLowerCase().includes('afternoon') || 
          line.trim().toLowerCase().includes('evening') ||
          line.trim().toLowerCase().includes('lunch') ||
          line.trim().toLowerCase().includes('dinner')) {
        return (
          <h3 key={i} className="text-lg font-semibold mt-4 mb-2 text-primary">
            {line}
          </h3>
        );
      }
      
      // Regular content
      return (
        <p key={i} className="mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Travel Itinerary</CardTitle>
            <CardDescription>
              A personalized plan based on your preferences
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {days.length > 0 ? (
          <Tabs defaultValue={days[0].id} className="w-full">
            <TabsList className="mb-4 w-full overflow-x-auto flex flex-nowrap">
              {days.map((day) => (
                <TabsTrigger key={day.id} value={day.id} className="whitespace-nowrap">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {day.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day) => (
              <TabsContent key={day.id} value={day.id} className="space-y-4">
                <div className="prose max-w-none">
                  {formatDayContent(day.content)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <UtilityPole className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No itinerary data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ItineraryDisplay;
