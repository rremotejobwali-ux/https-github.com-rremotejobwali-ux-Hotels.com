import { GoogleGenAI, Type } from "@google/genai";
import { Hotel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We simulate a database ID by generating random strings, 
// but in a real app these would come from the DB.
const generateId = () => Math.random().toString(36).substr(2, 9);

export const fetchHotelsByLocation = async (location: string): Promise<Hotel[]> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `Generate a realistic list of 8 hotels in or near ${location}. 
    Include a mix of luxury, mid-range, and budget options. 
    Ensure the amenities are specific to the hotel type.
    The prices should be realistic for the location.
    The description should be catchy, about 2 sentences long.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              pricePerNight: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              reviewsCount: { type: Type.INTEGER },
              amenities: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              location: { type: Type.STRING }
            },
            required: ["name", "description", "pricePerNight", "rating", "reviewsCount", "amenities", "location"]
          }
        }
      }
    });

    const rawData = JSON.parse(response.text || "[]");

    // Augment with images and IDs locally since Gemini text output doesn't give hosted image URLs
    return rawData.map((hotel: any, index: number) => ({
      ...hotel,
      id: generateId(),
      // Use picsum with a consistent seed based on name length + index to simulate distinct hotel images
      imageUrl: `https://picsum.photos/seed/${hotel.name.replace(/\s/g, '')}${index}/800/600`,
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data in case of API failure or empty key
    return [
      {
        id: "fallback-1",
        name: "Grand Plaza Hotel",
        location: location,
        description: "A lovely place to stay in the heart of the city.",
        pricePerNight: 150,
        rating: 4.5,
        reviewsCount: 120,
        amenities: ["WiFi", "Pool", "Gym"],
        imageUrl: "https://picsum.photos/seed/fallback1/800/600"
      }
    ];
  }
};

export const fetchFeaturedHotels = async (): Promise<Hotel[]> => {
  // Simulating a "Featured" call - usually we might cache this or hardcode popular destinations
  // For this demo, we'll ask for hotels in "Global Top Destinations"
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 4 featured luxury hotels from famous cities around the world (e.g. Paris, Tokyo, NY, Dubai).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              location: { type: Type.STRING },
              description: { type: Type.STRING },
              pricePerNight: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              reviewsCount: { type: Type.INTEGER },
              amenities: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });
    
    const rawData = JSON.parse(response.text || "[]");
    return rawData.map((hotel: any, index: number) => ({
      ...hotel,
      id: `featured-${index}`,
      imageUrl: `https://picsum.photos/seed/featured${index}/800/600`,
      isFeatured: true
    }));
  } catch (e) {
    return [];
  }
};