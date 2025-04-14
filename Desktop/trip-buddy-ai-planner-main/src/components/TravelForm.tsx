
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { generateItinerary } from '@/lib/api';

interface TravelFormProps {
  onItineraryGenerated: (itinerary: string) => void;
  setLoading: (loading: boolean) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onItineraryGenerated, setLoading }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    destination: '',
    duration: '7',
    budget: 50, // Budget level: 0-100
    interests: '',
    travelStyle: 'balanced',
    apiKey: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, budget: value[0] }));
  };

  const getBudgetLabel = (value: number) => {
    if (value < 25) return 'Budget';
    if (value < 50) return 'Moderate';
    if (value < 75) return 'Luxury';
    return 'Ultra Luxury';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.destination) {
      toast({
        title: "Destination required",
        description: "Please enter your travel destination",
        variant: "destructive"
      });
      return;
    }

    if (!formData.apiKey) {
      toast({
        title: "OpenAI API Key required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const result = await generateItinerary(formData);
      if (result) {
        onItineraryGenerated(result);
        toast({
          title: "Itinerary generated!",
          description: "Your personalized travel plan is ready."
        });
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to generate your itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Plan Your Trip</CardTitle>
        <CardDescription>
          Tell us about your dream vacation and our AI will create a personalized itinerary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="destination">Where do you want to go?</Label>
            <Input 
              id="destination" 
              name="destination"
              placeholder="Paris, Bali, Tokyo, etc."
              value={formData.destination}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">How many days?</Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => handleSelectChange('duration', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="10">10 days</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="budget">Budget Level</Label>
              <span className="text-sm font-medium">{getBudgetLabel(formData.budget)}</span>
            </div>
            <Slider 
              id="budget"
              min={0} 
              max={100} 
              step={1}
              value={[formData.budget]}
              onValueChange={handleSliderChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Your Interests</Label>
            <Textarea 
              id="interests" 
              name="interests"
              placeholder="History, food, outdoor activities, museums, etc."
              value={formData.interests}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelStyle">Travel Style</Label>
            <Select 
              value={formData.travelStyle} 
              onValueChange={(value) => handleSelectChange('travelStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your travel style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relaxed">Relaxed & Slow-paced</SelectItem>
                <SelectItem value="balanced">Balanced Mix</SelectItem>
                <SelectItem value="adventurous">Adventure & Exploration</SelectItem>
                <SelectItem value="luxurious">Luxury & Comfort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <Input 
              id="apiKey" 
              name="apiKey"
              type="password"
              placeholder="Enter your OpenAI API key"
              value={formData.apiKey}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Your API key is used only for this request and is not stored.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">Generate Itinerary</Button>
      </CardFooter>
    </Card>
  );
};

export default TravelForm;
