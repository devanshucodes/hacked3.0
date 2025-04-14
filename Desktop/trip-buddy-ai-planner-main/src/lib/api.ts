import { toast } from "sonner";

interface TravelPreferences {
  destination: string;
  duration: string;
  budget: number;
  interests: string;
  travelStyle: string;
  apiKey: string;
}

export const generateItinerary = async (preferences: TravelPreferences): Promise<string> => {
  try {
    const { apiKey, ...userPrefs } = preferences;
    
    const prompt = `
      Create a detailed day-by-day travel itinerary for a trip to ${userPrefs.destination} for ${userPrefs.duration} days.
      
      Preferences:
      - Budget Level: ${getBudgetText(userPrefs.budget)}
      - Interests: ${userPrefs.interests || 'General sightseeing'}
      - Travel Style: ${userPrefs.travelStyle}
      
      Format the itinerary with clear sections for each day. For each day, include:
      - Morning activities with suggested times
      - Lunch recommendations with estimated costs
      - Afternoon activities
      - Dinner options with estimated costs
      - Evening entertainment if applicable
      
      For each activity, include:
      - Brief descriptions
      - Practical tips
      - Estimated costs or price ranges
      - Transportation options and costs
      
      Make the itinerary flow naturally with logical geographic progression through the destination.
      
      Important formatting rules:
      - Do not use markdown formatting (no **, ##, etc.)
      - Use clear section headers with proper spacing
      - Include estimated costs for each major activity and meal
      - Provide a daily budget summary at the end of each day
      - Use consistent spacing and formatting throughout
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional travel planner with extensive knowledge of destinations worldwide. Create detailed, realistic, and personalized travel itineraries.' 
          },
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate itinerary');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    let errorMessage = 'Failed to generate itinerary';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for common OpenAI API errors
      if (errorMessage.includes('invalid_api_key')) {
        errorMessage = 'Invalid OpenAI API key. Please check your key and try again.';
      } else if (errorMessage.includes('insufficient_quota')) {
        errorMessage = 'Your OpenAI account has insufficient quota. Please check your billing.';
      }
    }
    
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

function getBudgetText(budgetValue: number): string {
  if (budgetValue < 25) return 'Budget-friendly options, focusing on free/low-cost activities and affordable dining';
  if (budgetValue < 50) return 'Moderate budget with a mix of affordable and mid-range options';
  if (budgetValue < 75) return 'Higher-end budget with premium experiences and fine dining options';
  return 'Luxury experiences with high-end accommodations, fine dining, and exclusive activities';
}
