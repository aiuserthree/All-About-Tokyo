import { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, Wind, Thermometer, Eye, AlertTriangle, TrendingUp, Calendar, Shield, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getTokyoWeather, WeatherData, getWeatherRecommendation, getTokyoWeeklyForecast, DailyForecast, formatDate, getWeeklySummary } from "../services/weatherService";
import { getTokyoAirQuality, AirQualityData, getAQIDescription, getAirQualityEmoji, getAirQualityAlert } from "../services/airQualityService";
import { getTokyoEarthquakeInfo, EarthquakeAlert, getEarthquakeIcon, getEarthquakeSummary } from "../services/earthquakeService";
import { getTokyoExchangeRates, ExchangeRateData, getExchangeRateSummary, getTrendIcon } from "../services/exchangeRateService";

interface TokyoLiveInfoScreenProps {
  onBack: () => void;
}

export function TokyoLiveInfoScreen({ onBack }: TokyoLiveInfoScreenProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<DailyForecast[] | null>(null);
  const [earthquake, setEarthquake] = useState<EarthquakeAlert | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setError(null);
      const [weatherData, airQualityData, forecastData, earthquakeData, exchangeRateData] = await Promise.all([
        getTokyoWeather(),
        getTokyoAirQuality(),
        getTokyoWeeklyForecast(),
        getTokyoEarthquakeInfo(),
        getTokyoExchangeRates()
      ]);
      
      setWeather(weatherData);
      setAirQuality(airQualityData);
      setWeeklyForecast(forecastData);
      setEarthquake(earthquakeData);
      setExchangeRates(exchangeRateData);
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
              <h1 className="text-lg font-bold">도쿄 정보 대시보드</h1>
              <p className="text-xs text-muted-foreground">
                {lastUpdated.toLocaleTimeString()} 업데이트
              </p>
              <p className="text-xs text-green-600">
                ✅ 모든 데이터: 실시간 API (Open-Meteo, USGS, ExchangeRate-API)
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

        {/* 환율 정보 - 모바일 최적화 */}
        {exchangeRates && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4" />
                실시간 환율
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 환율 요약 */}
              {(() => {
                const summary = getExchangeRateSummary(exchangeRates.rates);
                return (
                  <div className="space-y-3 mb-4">
                    {/* 100엔 기준 한국 원화 강조 */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-2xl">💴</span>
                          <span className="text-xl font-bold text-blue-700">100엔</span>
                          <span className="text-xl">=</span>
                          <span className="text-3xl font-bold text-red-600">
                            {summary.jpy100ToKrw.toLocaleString()}원
                          </span>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">한국 원화 기준</p>
                      </div>
                    </div>
                    
                    {/* 추천 메시지 */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800 text-center">
                        {summary.recommendation}
                      </p>
                    </div>
                  </div>
                );
              })()}



              {/* 업데이트 시간 */}
              <div className="mt-3 pt-2 border-t border-muted/50">
                <p className="text-xs text-muted-foreground text-center">
                  기준 통화: {exchangeRates.base} • 업데이트: {new Date(exchangeRates.date).toLocaleDateString()}
                </p>
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
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">기온</p>
                <p className="font-bold text-lg">{weather?.temperature}°C</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">공기질</p>
                <p className="font-bold text-lg">{airQuality?.aqi}</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">지진 안전</p>
                <p className="font-bold text-sm">
                  {earthquake?.hasRecentEarthquake ? '⚠️' : '✅'}
                </p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded">
                <p className="text-muted-foreground">환율</p>
                <p className="font-bold text-sm">
                  {exchangeRates ? (100 * exchangeRates.rates.KRW).toFixed(0) + '원' : '--'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
