import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_CONFIG, MAP_DEFAULT_CONFIG } from '../config/maps';

interface Restaurant {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: string;
  price: string;
  rating: number;
  openTime: string;
  tags: string[];
}

interface GoogleMapProps {
  restaurants: Restaurant[];
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  className?: string;
}

export function GoogleMap({ restaurants, onRestaurantSelect, className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // API 키가 설정되지 않은 경우 데모 모드 표시
        if (!GOOGLE_MAPS_CONFIG.apiKey || 
            GOOGLE_MAPS_CONFIG.apiKey === 'your_google_maps_api_key_here' ||
            GOOGLE_MAPS_CONFIG.apiKey === 'DEMO_API_KEY' ||
            GOOGLE_MAPS_CONFIG.apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE' ||
            GOOGLE_MAPS_CONFIG.apiKey === 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
          throw new Error('DEMO_MODE');
        }

        // API 키가 올바른 형식인지 확인 (더 유연하게)
        if (!GOOGLE_MAPS_CONFIG.apiKey.startsWith('AIzaSy') || GOOGLE_MAPS_CONFIG.apiKey.length < 30) {
          throw new Error('DEMO_MODE');
        }

        // API 키 로딩 로그는 한 번만 출력
        if (!window.googleMapsLoaded) {
          console.log('🗺️ Google Maps API 키 확인됨:', GOOGLE_MAPS_CONFIG.apiKey.substring(0, 10) + '...');
          window.googleMapsLoaded = true;
        }

        const loader = new Loader({
          apiKey: GOOGLE_MAPS_CONFIG.apiKey,
          version: GOOGLE_MAPS_CONFIG.version,
          libraries: GOOGLE_MAPS_CONFIG.libraries,
        });

        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { InfoWindow } = await loader.importLibrary('maps');

        if (!mapRef.current) return;

        const mapInstance = new Map(mapRef.current, {
          ...MAP_DEFAULT_CONFIG,
          center: restaurants.length > 0 
            ? { lat: restaurants[0].lat, lng: restaurants[0].lng }
            : MAP_DEFAULT_CONFIG.center,
        });

        setMap(mapInstance);

        // 마커 생성
        const newMarkers: google.maps.Marker[] = [];
        const infoWindow = new InfoWindow();

        restaurants.forEach((restaurant) => {
          const marker = new Marker({
            position: { lat: restaurant.lat, lng: restaurant.lng },
            map: mapInstance,
            title: restaurant.title,
            animation: google.maps.Animation.DROP,
          });

          // 마커 클릭 이벤트
          marker.addListener('click', () => {
            infoWindow.setContent(`
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${restaurant.title}</h3>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${restaurant.category}</p>
                <p style="margin: 0 0 4px 0; font-size: 12px;">⭐ ${restaurant.rating} • ${restaurant.price}</p>
                <p style="margin: 0; font-size: 11px; color: #888;">${restaurant.openTime}</p>
              </div>
            `);
            infoWindow.open(mapInstance, marker);
            
            if (onRestaurantSelect) {
              onRestaurantSelect(restaurant);
            }
          });

          newMarkers.push(marker);
        });

        setMarkers(newMarkers);

        // 모든 마커가 보이도록 지도 범위 조정
        if (restaurants.length > 1) {
          const bounds = new google.maps.LatLngBounds();
          restaurants.forEach((restaurant) => {
            bounds.extend({ lat: restaurant.lat, lng: restaurant.lng });
          });
          mapInstance.fitBounds(bounds);
        }

        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류';
        
        // API 키 오류인 경우 데모 모드로 전환
        if (errorMessage.includes('InvalidKey') || errorMessage.includes('API key')) {
          setError('DEMO_MODE');
        } else if (errorMessage === 'DEMO_MODE') {
          // 데모 모드는 정상적인 동작이므로 오류 로그 출력하지 않음
          setError('DEMO_MODE');
        } else {
          console.error('Google Maps 로딩 실패:', err);
          setError(`지도를 불러올 수 없습니다: ${errorMessage}`);
        }
        setIsLoading(false);
      }
    };

    initMap();

    // 컴포넌트 언마운트 시 마커 정리
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [restaurants]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 bg-muted rounded-lg ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    if (error === 'DEMO_MODE') {
      return (
        <div className={`relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">🗺️ 지도 데모 모드</h3>
              <p className="text-sm text-blue-600 mb-4">
                API 키 설정이 필요합니다
              </p>
              <div className="space-y-2 text-xs text-blue-500">
                <p>📍 {restaurants.length}개의 맛집 위치</p>
                <p>🎯 마커 클릭으로 상세 정보 확인</p>
                <p>🔍 줌 및 팬 기능</p>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-2">API 키 설정 방법:</p>
                <div className="space-y-1 text-xs text-blue-600">
                  <p>1. Google Cloud Console 접속</p>
                  <p>2. API 키 제한 해제</p>
                  <p>3. Maps JavaScript API 활성화</p>
                </div>
                <p className="text-xs text-blue-500 mt-2">
                  자세한 방법: docs/quick-fix-api-key.md
                </p>
              </div>
            </div>
          </div>
          
          {/* 데모용 마커들 */}
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
              }}
              title={restaurant.title}
              onClick={() => onRestaurantSelect && onRestaurantSelect(restaurant)}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div className={`flex items-center justify-center h-64 bg-muted rounded-lg ${className}`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">API 키 오류</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>🔑 API 키: {GOOGLE_MAPS_CONFIG.apiKey.substring(0, 10)}...</p>
            <p>📋 해결 방법:</p>
            <p>1. Google Cloud Console에서 API 키 제한 해제</p>
            <p>2. Maps JavaScript API 활성화 확인</p>
            <p>3. 결제 계정 연결 확인</p>
          </div>
          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <p className="text-xs text-red-700 font-medium mb-1">자세한 해결 방법:</p>
            <p className="text-xs text-red-600">docs/api-key-troubleshooting.md 참고</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}
