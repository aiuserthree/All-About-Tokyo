// Vercel API Route for weather data
// This solves CORS issues by proxying the Open-Meteo API

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Tokyo coordinates: 35.6762, 139.6503
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FTokyo',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Tokyo-Travel-Guide/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Add timestamp for caching
    const weatherData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'open-meteo'
    };

    // Cache for 10 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
    
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Weather API proxy error:', error);
    
    // Return fallback data
    const fallbackData = {
      current: {
        temperature_2m: 22,
        relative_humidity_2m: 60,
        wind_speed_10m: 5,
        weather_code: 0
      },
      timestamp: new Date().toISOString(),
      source: 'fallback',
      error: error.message
    };
    
    res.status(200).json(fallbackData);
  }
}
