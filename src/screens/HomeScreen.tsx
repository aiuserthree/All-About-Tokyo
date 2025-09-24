import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { placesByType } from "../data/tokyoLocations";
import { useState, useEffect } from "react";
import { getTokyoWeather, getWeatherRecommendation, WeatherData } from "../services/weatherService";

interface HomeScreenProps {
  onNavigateToTab?: (tabIndex: number) => void;
}

export function HomeScreen({ onNavigateToTab }: HomeScreenProps) {
  // 날씨 상태 관리
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

  // 각 카테고리에서 랜덤으로 3개씩 선택하는 함수
  const getRandomPlaces = (places: any[], count: number) => {
    const shuffled = [...places].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // 카테고리별 추천 장소 생성
  const categoryRecommendations = {
    restaurant: getRandomPlaces(placesByType.restaurant, 3),
    attraction: getRandomPlaces(placesByType.attraction, 3),
    shopping: getRandomPlaces(placesByType.shopping, 3),
    cafe: getRandomPlaces(placesByType.cafe, 3)
  };

  // 디버깅용 콘솔 로그
  console.log('Places by type:', {
    restaurant: placesByType.restaurant.length,
    attraction: placesByType.attraction.length,
    shopping: placesByType.shopping.length,
    cafe: placesByType.cafe.length
  });

  const handleCardClick = (place: any) => {
    // 구글 맵으로 이동
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const renderCategorySection = (title: string, places: any[], icon: string) => (
    <div className="space-y-3">
      <div className="px-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h3>
      </div>
      
      <div className="px-4 space-y-3">
        {places.map((place, index) => (
          <Card 
            key={`${title}-${index}`}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleCardClick(place)}
          >
            <div className="relative h-28 bg-muted">
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded-full text-xs">
                ★ {place.rating}
              </div>
            </div>
            
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1 text-sm">{place.title}</h4>
                  <p className="text-xs text-muted-foreground">{place.category}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground line-clamp-1">📍 {place.address}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>📍 {place.distance || "근처"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💰 {place.price || "가격문의"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {place.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                  <span 
                    key={tagIndex} 
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24 space-y-6">
        {/* Welcome Section */}
        <div className="p-4 space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">도쿄에 오신 것을 환영합니다! 🗼</h1>
            <p className="text-muted-foreground">
              도쿄의 모든 것을 한 번에 만나보세요
            </p>
          </div>
          
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="text-center space-y-2">
              <h2 className="font-semibold text-blue-900">오늘의 날씨</h2>
              {weatherLoading ? (
                <div className="space-y-2">
                  <div className="text-3xl">⏳</div>
                  <p className="text-blue-700">날씨 정보를 불러오는 중...</p>
                </div>
              ) : weather ? (
                <>
                  <div className="text-3xl">{weather.icon}</div>
                  <p className="text-blue-700">{weather.condition}, {weather.temperature}°C</p>
                  <p className="text-sm text-blue-600">{getWeatherRecommendation(weather)}</p>
                  <div className="flex justify-center gap-4 text-xs text-blue-500 mt-2">
                    <span>💧 습도 {weather.humidity}%</span>
                    <span>💨 풍속 {weather.windSpeed}m/s</span>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl">❓</div>
                  <p className="text-blue-700">날씨 정보를 가져올 수 없습니다</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="px-4">
          <div className="grid grid-cols-3 gap-4">
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(1)}
            >
              <div className="text-2xl mb-1">🍜</div>
              <div className="text-sm font-medium">맛집</div>
              <div className="text-xs text-muted-foreground">{placesByType.restaurant.length}곳</div>
            </Card>
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(2)}
            >
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-sm font-medium">명소</div>
              <div className="text-xs text-muted-foreground">{placesByType.attraction.length}곳</div>
            </Card>
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(3)}
            >
              <div className="text-2xl mb-1">🛍️</div>
              <div className="text-sm font-medium">쇼핑</div>
              <div className="text-xs text-muted-foreground">{placesByType.shopping.length}곳</div>
            </Card>
          </div>
          
          {/* Additional Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(4)}
            >
              <div className="text-2xl mb-1">☕</div>
              <div className="text-sm font-medium">카페</div>
              <div className="text-xs text-muted-foreground">{placesByType.cafe.length}곳</div>
            </Card>
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(5)}
            >
              <div className="text-2xl mb-1">🍰</div>
              <div className="text-sm font-medium">디저트</div>
              <div className="text-xs text-muted-foreground">{placesByType.dessert?.length || 0}곳</div>
            </Card>
          </div>
        </div>

        {/* Category Recommendations */}
        <div className="space-y-6">
          <div className="px-4">
            <h2 className="text-xl font-semibold">카테고리별 추천</h2>
            <p className="text-sm text-muted-foreground mt-1">각 카테고리에서 랜덤으로 선별된 추천 장소입니다</p>
          </div>
          
          {renderCategorySection("맛집 추천", categoryRecommendations.restaurant, "🍜")}
          {renderCategorySection("명소 추천", categoryRecommendations.attraction, "🏛️")}
          {renderCategorySection("쇼핑 추천", categoryRecommendations.shopping, "🛍️")}
          {renderCategorySection("카페 추천", categoryRecommendations.cafe, "☕")}
        </div>
      </div>
    </div>
  );
}