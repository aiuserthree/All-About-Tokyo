import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { placesByType } from "../data/tokyoLocations";
import { ArrowLeft, Camera, MapPin } from "lucide-react";

interface PhotospotScreenProps {
  onBack?: () => void;
}

export function PhotospotScreen({ onBack }: PhotospotScreenProps) {
  const photospotPlaces = placesByType.photospot || [];

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

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24 space-y-4">
        {/* Header */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">📸 포토스팟</h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            도쿄의 인스타그램 명소들을 만나보세요
          </p>
        </div>

        {/* 포토스팟 카테고리 */}
        <div className="px-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🗼</div>
                <div className="text-sm font-semibold text-pink-800">도쿄타워 포토스팟</div>
                <div className="text-xs text-pink-600">세븐일레븐, 횡단보도 등</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🚦</div>
                <div className="text-sm font-semibold text-blue-800">애니메이션 스팟</div>
                <div className="text-xs text-blue-600">너의이름은, 신주쿠 등</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🚆</div>
                <div className="text-sm font-semibold text-green-800">지하철 뷰</div>
                <div className="text-xs text-green-600">요요기역, 오니버스 등</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🌃</div>
                <div className="text-sm font-semibold text-purple-800">야경 스팟</div>
                <div className="text-xs text-purple-600">도쿄역, 마루노우치 등</div>
              </div>
            </Card>
          </div>
        </div>

        {/* 포토스팟 목록 */}
        <div className="space-y-3">
          <div className="px-4">
            <h2 className="text-lg font-semibold">📸 모든 포토스팟</h2>
            <p className="text-sm text-muted-foreground mt-1">
              총 {photospotPlaces.length}개의 포토스팟
            </p>
          </div>
          
          <div className="px-4 space-y-3">
            {photospotPlaces.length > 0 ? (
              photospotPlaces.map((place, index) => (
                <PlaceCard
                  key={`photospot-${index}`}
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
              ))
            ) : (
              <Card className="p-6 text-center">
                <div className="text-4xl mb-2">📸</div>
                <h3 className="text-lg font-semibold mb-2">포토스팟 데이터 준비 중</h3>
                <p className="text-muted-foreground">
                  곧 멋진 포토스팟들을 만나보실 수 있습니다!
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* 포토스팟 팁 */}
        <div className="px-4">
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="space-y-2">
              <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
                <span className="text-lg">💡</span>
                포토스팟 촬영 팁
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 일몰 시간대(17:00-19:00)에 도쿄타워 포토스팟 방문</li>
                <li>• 세븐일레븐 앞 횡단보도는 신호 대기 시간 활용</li>
                <li>• 너의이름은 건널목은 평일 오전이 한산함</li>
                <li>• 지하철 뷰는 기차 운행 시간 확인 후 방문</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
