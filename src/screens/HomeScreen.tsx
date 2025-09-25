import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { placesByType } from "../data/tokyoLocations";
import { useState, useEffect } from "react";
import { getTokyoWeather, getWeatherRecommendation, WeatherData } from "../services/weatherService";
import { MapPin } from "lucide-react";
import { getOptimalPlaceImage } from "../utils/mapImageGenerator";

interface HomeScreenProps {
  onNavigateToTab?: (tabIndex: number) => void;
  onLocationBasedClick?: () => void;
  onPhotospotClick?: () => void;
  onEventsClick?: () => void;
}

export function HomeScreen({ onNavigateToTab, onLocationBasedClick, onPhotospotClick, onEventsClick }: HomeScreenProps) {
  // 디버깅용 콘솔 로그
  console.log('HomeScreen props:', { onNavigateToTab, onLocationBasedClick });
  
  // 날씨 상태 관리
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // 화면 마운트 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
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

  const handleMapClick = (place: any) => {
    if (place.mapUrl) {
      window.open(place.mapUrl, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
      window.open(url, '_blank');
    }
  };

  const handleReferenceClick = (place: any) => {
    if (place.referenceUrl) {
      window.open(place.referenceUrl, '_blank');
    }
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
          <PlaceCard
            key={`${title}-${index}`}
            title={place.title}
            category={place.category}
            image={place.image}
            distance={place.distance}
            price={place.price}
            rating={place.rating}
            openTime={place.openTime}
            tags={place.tags}
            lat={place.lat}
            lng={place.lng}
            address={place.address}
            mapUrl={place.mapUrl}
            referenceUrl={place.referenceUrl}
            onClick={() => handleMapClick(place)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24 space-y-4">
        {/* Welcome Section */}
        <div className="p-4 space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">도쿄에 오신 것을 환영합니다! 🗼</h1>
            <p className="text-muted-foreground">
              도쿄의 모든 것을 한 번에 만나보세요
            </p>
          </div>
          
          {/* YouTube Video Section */}
          <Card className="overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                id="youtube-video"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/xY_heAX39qc?autoplay=0&mute=0&loop=1&playlist=xY_heAX39qc&controls=1&showinfo=1&rel=0&modestbranding=1&enablejsapi=1"
                title="Tokyo Travel Guide Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Card>
          
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
          
          {/* 3일 여행 일정 버튼들 */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🗾 3일 여행 일정</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Card 
                className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => onNavigateToTab?.(8)} // Day 1
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">🗼</div>
                  <div className="text-sm font-semibold text-blue-800">Day 1</div>
                  <div className="text-xs text-blue-600">도쿄타워 & 오다이바</div>
                </div>
              </Card>
              <Card 
                className="p-3 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => onNavigateToTab?.(9)} // Day 2
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">🛍️</div>
                  <div className="text-sm font-semibold text-green-800">Day 2</div>
                  <div className="text-xs text-green-600">시부야 & 신주쿠</div>
                </div>
              </Card>
              <Card 
                className="p-3 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 cursor-pointer hover:shadow-md transition-all duration-200"
                onClick={() => onNavigateToTab?.(10)} // Day 3
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">🏛️</div>
                  <div className="text-sm font-semibold text-purple-800">Day 3</div>
                  <div className="text-xs text-purple-600">아사쿠사 & 우에노</div>
                </div>
              </Card>
            </div>
          </div>

          {/* 포토스팟 & 이벤트 카드 */}
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="p-4 bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={onPhotospotClick || (() => console.log('onPhotospotClick not provided'))}
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">📸</div>
                <div className="text-sm font-semibold text-pink-800">포토스팟</div>
                <div className="text-xs text-pink-600">인스타 명소</div>
              </div>
            </Card>
            <Card 
              className="p-4 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={onEventsClick || (() => console.log('onEventsClick not provided'))}
            >
              <div className="text-center space-y-2">
                <div className="text-2xl">🎪</div>
                <div className="text-sm font-semibold text-purple-800">이벤트</div>
                <div className="text-xs text-purple-600">페스티벌 & 행사</div>
              </div>
            </Card>
          </div>

          {/* 위치 기반 추천 버튼 */}
          <Card className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-200" style={{ border: '2px solid red' }}>
            <div className="text-center space-y-3">
              <div className="text-xl">📍</div>
              <Button
                onClick={onLocationBasedClick || (() => console.log('onLocationBasedClick not provided'))}
                className="gap-2 w-full"
                size="sm"
                style={{ 
                  backgroundColor: '#dc2626 !important',
                  color: 'white !important',
                  border: '2px solid #dc2626 !important',
                  minHeight: '40px',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: '1',
                  visibility: 'visible'
                }}
              >
                <MapPin className="w-4 h-4" style={{ color: 'white' }} />
                위치 기반 추천
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4">
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
            <Card 
              className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onNavigateToTab?.(4)}
            >
              <div className="text-2xl mb-1">☕</div>
              <div className="text-sm font-medium">카페 & 디저트</div>
              <div className="text-xs text-muted-foreground">{placesByType.cafe.length}곳</div>
            </Card>
          </div>
        </div>

        {/* Category Recommendations */}
        <div className="space-y-4">
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