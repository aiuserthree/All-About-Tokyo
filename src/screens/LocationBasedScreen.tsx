import { useState, useEffect } from "react";
import { MapPin, Navigation, RefreshCw, X, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { allTokyoPlaces, Place } from "../data/tokyoLocations";

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface LocationBasedPlace extends Place {
  distance?: number;
}

interface LocationBasedScreenProps {
  onBack?: () => void;
}

export function LocationBasedScreen({ onBack }: LocationBasedScreenProps) {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlaces, setRecommendedPlaces] = useState<LocationBasedPlace[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [recommendationMode, setRecommendationMode] = useState<string>("");

  // 화면 마운트 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 위치 권한 요청 및 현재 위치 가져오기
  const getCurrentLocation = () => {
    setIsLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(location);
        setLocationPermission(true);
        generateLocationBasedRecommendations(location);
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "위치 요청 시간이 초과되었습니다.";
            break;
          default:
            errorMessage = "알 수 없는 오류가 발생했습니다.";
            break;
        }
        setLocationError(errorMessage);
        setLocationPermission(false);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // 두 지점 간의 거리 계산 (하버사인 공식)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 위치 기반 추천 장소 생성
  const generateLocationBasedRecommendations = (userLoc: Location) => {
    // 도쿄 중심 좌표 (대략적인 위치)
    const tokyoCenter = { latitude: 35.6762, longitude: 139.6503 };
    
    // 사용자가 도쿄 근처에 있는지 확인 (약 50km 반경)
    const distanceFromTokyo = calculateDistance(
      userLoc.latitude, 
      userLoc.longitude, 
      tokyoCenter.latitude, 
      tokyoCenter.longitude
    );

    let placesToRecommend: LocationBasedPlace[] = allTokyoPlaces;

    // 사용자가 도쿄 근처에 있다면 실제 거리 계산
    if (distanceFromTokyo < 50) {
      console.log(`도쿄 근처에 위치 (${distanceFromTokyo.toFixed(1)}km) - 실제 거리 계산`);
      setRecommendationMode(`도쿄 근처에서 실제 거리 기반 추천 (${distanceFromTokyo.toFixed(1)}km)`);
      placesToRecommend = allTokyoPlaces
        .map(place => {
          // 실제 좌표를 사용하여 거리 계산
          const distance = calculateDistance(
            userLoc.latitude,
            userLoc.longitude,
            place.lat,
            place.lng
          );
          return {
            ...place,
            distance: Math.round(distance * 10) / 10
          };
        })
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 10); // 거리순으로 정렬 후 상위 10개 선택
    } else {
      console.log(`도쿄에서 멀리 위치 (${distanceFromTokyo.toFixed(1)}km) - 랜덤 추천`);
      setRecommendationMode(`도쿄에서 멀리 위치하여 랜덤 추천 (${distanceFromTokyo.toFixed(1)}km)`);
      // 도쿄 근처가 아닌 경우 랜덤 추천 제공
      placesToRecommend = allTokyoPlaces
        .sort(() => 0.5 - Math.random()) // 랜덤 섞기
        .slice(0, 10) // 최대 10개 선택
        .map(place => ({
          ...place,
          distance: Math.round((Math.random() * 20 + 1) * 10) / 10
        }));
    }
    
    setRecommendedPlaces(placesToRecommend);
  };

  // 컴포넌트 마운트 시 위치 권한 확인 및 기본 추천 생성
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
        setLocationPermission(result.state === 'granted');
      });
    }
    
    // 위치 권한이 없어도 기본 추천 제공
    if (recommendedPlaces.length === 0) {
      setRecommendationMode("기본 랜덤 추천 (위치 정보 없음)");
      const defaultRecommendations = allTokyoPlaces
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map(place => ({
          ...place,
          distance: Math.round((Math.random() * 20 + 1) * 10) / 10
        }));
      setRecommendedPlaces(defaultRecommendations);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">위치 기반 추천</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack || (() => window.history.back())}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            닫기
          </Button>
        </div>

        {/* 위치 정보 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              현재 위치
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!userLocation && !locationError && (
              <div className="text-center py-8 space-y-6">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto" />
                <p className="text-gray-600">
                  현재 위치를 기반으로<br />
                  주변 추천 장소를 찾아드립니다
                </p>
                <Button
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  className="gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  {isLoading ? "위치 확인 중..." : "위치 확인하기"}
                </Button>
              </div>
            )}

            {locationError && (
              <Alert variant="destructive">
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}

            {userLocation && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">위치 확인 완료!</span>
                </div>
                <p className="text-sm text-green-700">
                  위도: {userLocation.latitude.toFixed(6)}<br />
                  경도: {userLocation.longitude.toFixed(6)}
                  {userLocation.accuracy && (
                    <span className="block mt-1">
                      정확도: ±{Math.round(userLocation.accuracy)}m
                    </span>
                  )}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                  className="mt-2 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  위치 새로고침
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 추천 장소 섹션 */}
        {recommendedPlaces.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                추천 장소 ({recommendedPlaces.length}개)
              </CardTitle>
              {recommendationMode && (
                <p className="text-sm text-muted-foreground mt-1">
                  {recommendationMode}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendedPlaces.map((place) => (
                  <Card key={place.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {place.title}
                        </h3>
                        {place.distance && (
                          <Badge variant="secondary" className="ml-2">
                            {place.distance}km
                          </Badge>
                        )}
                      </div>
                      
                      <Badge variant="outline" className="mb-2">
                        {place.category}
                      </Badge>
                      
                      <p className="text-sm text-gray-600 mb-3 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {place.description || place.address}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">
                          ⭐ {place.rating}
                        </span>
                        {place.price && (
                          <span className="text-xs text-gray-500">
                            💰 {place.price}
                          </span>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => window.open(place.mapUrl || `https://maps.google.com/?q=${place.lat},${place.lng}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        지도에서 보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 도쿄 여행 안내 */}
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-pink-600" />
              <h3 className="font-semibold text-gray-800">도쿄 여행 팁</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              현재 위치를 기반으로 도쿄의 다양한 맛집, 관광명소, 카페 등을 추천해드립니다. 
              각 장소를 클릭하면 Google Maps에서 정확한 위치를 확인할 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
