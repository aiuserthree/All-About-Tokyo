import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Wind, Thermometer, Eye, AlertTriangle, TrendingUp, Calendar, Train, Shield, PartyPopper, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getTokyoWeather, WeatherData, getWeatherRecommendation, getTokyoWeeklyForecast, DailyForecast, formatDate, getWeeklySummary } from "../services/weatherService";
import { getTokyoAirQuality, AirQualityData, getAQIDescription, getAirQualityEmoji, getAirQualityAlert } from "../services/airQualityService";
import { getTokyoTransportInfo, TransportResponse, getTransportStatusMessage, getTransportSummary } from "../services/transportService";
import { getTokyoEarthquakeInfo, EarthquakeAlert, getEarthquakeIcon, getEarthquakeSummary } from "../services/earthquakeService";
import { getTokyoEvents, EventsResponse, getEventsSummary, getCategoryInfo, formatEventTime, getPopularityIcon } from "../services/eventsService";
import { getTokyoTourismInfo, TourismResponse, getTourismSummary, getCrowdingInfo, getVisitRecommendation, getCategoryInfo as getTourismCategoryInfo } from "../services/tourismService";

interface TokyoLiveInfoScreenProps {
  onBack: () => void;
}

export function TokyoLiveInfoScreen({ onBack }: TokyoLiveInfoScreenProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[] | null>(null);
  const [transport, setTransport] = useState<TransportResponse | null>(null);
  const [earthquake, setEarthquake] = useState<EarthquakeAlert | null>(null);
  const [events, setEvents] = useState<EventsResponse | null>(null);
  const [tourism, setTourism] = useState<TourismResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setError(null);
      const [weatherData, airQualityData, forecastData, transportData, earthquakeData, eventsData, tourismData] = await Promise.all([
        getTokyoWeather(),
        getTokyoAirQuality(),
        getTokyoWeeklyForecast(),
        getTokyoTransportInfo(),
        getTokyoEarthquakeInfo(),
        getTokyoEvents(),
        getTokyoTourismInfo()
      ]);
      
      setWeather(weatherData);
      setAirQuality(airQualityData);
      setWeeklyForecast(forecastData);
      setTransport(transportData);
      setEarthquake(earthquakeData);
      setEvents(eventsData);
      setTourism(tourismData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // 5분마다 자동 새로고침
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllData();
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">실시간 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      {/* 모바일 최적화 헤더 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">도쿄 실시간 정보</h1>
              <p className="text-xs text-muted-foreground">
                {lastUpdated.toLocaleTimeString()} 업데이트
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-10 w-10"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* 오류 메시지 */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 날씨 정보 - 모바일 최적화 */}
        {weather && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Thermometer className="h-4 w-4" />
                현재 날씨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{weather.icon}</span>
                  <div>
                    <p className="text-xl font-bold">{weather.temperature}°C</p>
                    <p className="text-sm text-muted-foreground">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>습도 {weather.humidity}%</p>
                  <p>풍속 {weather.windSpeed}m/s</p>
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">{getWeatherRecommendation(weather)}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 공기질 정보 - 모바일 최적화 */}
        {airQuality && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wind className="h-4 w-4" />
                공기질 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold">{airQuality.aqi}</span>
                    <Badge style={{ backgroundColor: airQuality.color, color: '#000' }} className="text-xs">
                      {getAirQualityEmoji(airQuality.aqi)} {airQuality.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getAQIDescription(airQuality.aqi)}
                  </p>
                </div>
              </div>
              
              {/* 모바일에서 공기질 지표를 2x2 그리드로 표시 */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center p-2 bg-muted rounded text-xs">
                  <p className="text-muted-foreground">PM2.5</p>
                  <p className="font-semibold">{airQuality.pm25}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded text-xs">
                  <p className="text-muted-foreground">PM10</p>
                  <p className="font-semibold">{airQuality.pm10}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded text-xs">
                  <p className="text-muted-foreground">O₃</p>
                  <p className="font-semibold">{airQuality.o3}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded text-xs">
                  <p className="text-muted-foreground">NO₂</p>
                  <p className="font-semibold">{airQuality.no2}</p>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">{airQuality.recommendation}</p>
              </div>

              {/* 공기질 알림 */}
              {getAirQualityAlert(airQuality) && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
                  {getAirQualityAlert(airQuality)}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 주간 날씨 예보 - 모바일 최적화 */}
        {weeklyForecast && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                주간 날씨 예보
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 주간 요약 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-800">
                  {getWeeklySummary(weeklyForecast)}
                </p>
              </div>

              {/* 일별 예보 */}
              <div className="space-y-2">
                {weeklyForecast.slice(0, 7).map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs font-medium text-muted-foreground">
                          {formatDate(forecast.date)}
                        </p>
                      </div>
                      <div className="text-2xl">
                        {forecast.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{forecast.condition}</p>
                        <p className="text-xs text-muted-foreground">
                          강수확률 {forecast.precipitation}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-red-500">
                          {forecast.maxTemp}°
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {forecast.minTemp}°
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>💧 {forecast.humidity}%</span>
                        <span>💨 {forecast.windSpeed}m/s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 주간 팁 */}
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">💡</span>
                  <div className="text-xs text-amber-800">
                    <p className="font-medium mb-1">주간 여행 팁</p>
                    <p>
                      {weeklyForecast.some(f => f.condition.includes('비')) 
                        ? "일부 날에 비가 예상되니 우산을 준비하세요. 실내 관광지도 좋은 선택입니다."
                        : "대체로 맑은 날씨가 예상됩니다. 야외 활동에 최적의 날씨입니다!"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 교통 정보 - 모바일 최적화 */}
        {transport && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Train className="h-4 w-4" />
                교통 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 교통 상태 요약 */}
              <div className={`p-3 rounded-lg mb-4 ${
                transport.lines.some(line => line.status === 'suspended') 
                  ? 'bg-red-50 border border-red-200' 
                  : transport.lines.some(line => line.status === 'delayed')
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-green-50 border border-green-200'
              }`}>
                <p className="text-sm font-medium">
                  {getTransportStatusMessage(transport.lines)}
                </p>
              </div>

              {/* 주요 노선 상태 */}
              <div className="space-y-2 mb-4">
                {transport.lines.slice(0, 5).map((line, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: line.color }}
                      />
                      <span className="text-sm font-medium">{line.name}</span>
                    </div>
                    <div className="text-xs">
                      {line.status === 'normal' && <span className="text-green-600">정상</span>}
                      {line.status === 'delayed' && <span className="text-yellow-600">지연 {line.delay}분</span>}
                      {line.status === 'suspended' && <span className="text-red-600">운행중단</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* 주요 역 정보 */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">주요 역 도착 시간</h4>
                {transport.stations.slice(0, 4).map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <p className="text-sm font-medium">{station.name}</p>
                      <p className="text-xs text-muted-foreground">{station.line}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{station.nextTrain}분</p>
                      <p className={`text-xs ${
                        station.status === 'crowded' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {station.status === 'crowded' ? '혼잡' : '원활'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 지진 정보 - 모바일 최적화 */}
        {earthquake && (
          <Card className={earthquake.hasRecentEarthquake ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                지진 안전 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 안전 상태 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{getEarthquakeIcon(earthquake.hasRecentEarthquake ? earthquake.lastEarthquake?.status || 'safe' : 'safe')}</span>
                <div>
                  <p className="text-sm font-medium">{earthquake.safetyMessage}</p>
                  {earthquake.lastEarthquake && (
                    <p className="text-xs text-muted-foreground">
                      {getEarthquakeSummary(earthquake)}
                    </p>
                  )}
                </div>
              </div>

              {/* 추천사항 */}
              <div className="space-y-2">
                {earthquake.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white/50 rounded">
                    <span className="text-xs">💡</span>
                    <p className="text-xs">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 이벤트 정보 - 모바일 최적화 */}
        {events && events.events.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <PartyPopper className="h-4 w-4" />
                이벤트 & 축제
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 이벤트 요약 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-purple-800">
                  {getEventsSummary(events.events)}
                </p>
              </div>

              {/* 피처드 이벤트 */}
              {events.featuredEvent && (
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getCategoryInfo(events.featuredEvent.category).icon}</span>
                    <span className="text-xs font-medium text-blue-700">추천 이벤트</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{events.featuredEvent.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{events.featuredEvent.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>{formatEventTime(events.featuredEvent.date, events.featuredEvent.time)}</span>
                    <span className="text-blue-600">{events.featuredEvent.location}</span>
                  </div>
                </div>
              )}

              {/* 이벤트 목록 */}
              <div className="space-y-2">
                {events.events.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                    <span className="text-lg">{getCategoryInfo(event.category).icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-1">{event.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatEventTime(event.date, event.time)}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <p className="font-medium">{event.price}</p>
                      <p className="text-muted-foreground">{getPopularityIcon(event.popularity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 관광지 혼잡도 - 모바일 최적화 */}
        {tourism && tourism.spots.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                관광지 혼잡도
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 혼잡도 요약 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-amber-800">
                  {getTourismSummary(tourism.spots)}
                </p>
              </div>

              {/* 추천 관광지 */}
              {tourism.recommendations.length > 0 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 mb-2">💚 지금 방문하기 좋은 곳</h4>
                  <div className="space-y-2">
                    {tourism.recommendations.slice(0, 2).map((spot, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">{getTourismCategoryInfo(spot.category).icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{spot.name}</p>
                          <p className="text-xs text-muted-foreground">{spot.location}</p>
                        </div>
                        <div className="text-right text-xs">
                          <p className="font-medium text-green-600">⭐ {spot.rating}</p>
                          <p className="text-muted-foreground">{spot.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 관광지 목록 */}
              <div className="space-y-2">
                {tourism.spots.slice(0, 5).map((spot, index) => {
                  const crowdingInfo = getCrowdingInfo(spot.crowding);
                  return (
                    <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                      <span className="text-lg">{getTourismCategoryInfo(spot.category).icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1">{spot.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{spot.location}</span>
                          <span>•</span>
                          <span>⭐ {spot.rating}</span>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm">{crowdingInfo.icon}</span>
                          <span className="font-medium" style={{ color: crowdingInfo.color }}>
                            {crowdingInfo.label}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {spot.waitingTime > 0 ? `${spot.waitingTime}분 대기` : '대기 없음'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}


        {/* 실시간 업데이트 안내 - 모바일 최적화 */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary text-sm">실시간 업데이트</span>
            </div>
            <p className="text-xs text-muted-foreground">
              이 페이지는 5분마다 자동으로 새로고침됩니다. 
              수동으로 새로고침하려면 상단의 새로고침 버튼을 눌러주세요.
            </p>
          </CardContent>
        </Card>

        {/* 통계 정보 - 모바일 최적화 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              오늘의 도쿄
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">기온</p>
                <p className="font-bold text-lg">{weather?.temperature}°C</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">공기질</p>
                <p className="font-bold text-lg">{airQuality?.aqi}</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">교통</p>
                <p className="font-bold text-sm">
                  {transport ? (transport.lines.filter(l => l.status === 'normal').length + '/' + transport.lines.length) : '--'}
                </p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">이벤트</p>
                <p className="font-bold text-lg">{events?.totalEvents || 0}</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">관광지</p>
                <p className="font-bold text-lg">{tourism?.totalSpots || 0}</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">지진</p>
                <p className="font-bold text-sm">
                  {earthquake?.hasRecentEarthquake ? '⚠️' : '✅'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
