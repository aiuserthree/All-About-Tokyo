import { CloudSun } from "lucide-react";
import { useState, useEffect } from "react";
import { getTokyoWeather, WeatherData } from "../services/weatherService";

interface AppBarProps {
  city?: string;
}

export function AppBar({ city = "도쿄" }: AppBarProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 날씨 정보 가져오기
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        const weatherData = await getTokyoWeather();
        setWeather(weatherData);
      } catch (error) {
        console.error('날씨 정보 로드 실패:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);
  return (
    <div className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-secondary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{city}</span>
            {weatherLoading ? (
              <span className="text-xs text-muted-foreground">날씨 로딩 중...</span>
            ) : weather ? (
              <span className="text-xs text-muted-foreground">
                {weather.condition} {weather.temperature}°C
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">날씨 정보 없음</span>
            )}
          </div>
        </div>
      </div>
      

    </div>
  );
}