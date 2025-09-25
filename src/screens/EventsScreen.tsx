import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";
import { eventPlaces } from "../data/tokyoLocations";

interface EventsScreenProps {
  onBack?: () => void;
}

export function EventsScreen({ onBack }: EventsScreenProps) {
  // 이벤트 & 페스티벌 데이터를 tokyoLocations에서 가져오기
  const eventsData = eventPlaces;

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
              <Calendar className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">🎪 이벤트 & 페스티벌</h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            도쿄의 특별한 이벤트와 페스티벌을 만나보세요
          </p>
        </div>

        {/* 이벤트 카테고리 */}
        <div className="px-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎨</div>
                <div className="text-sm font-semibold text-purple-800">아트페스티벌</div>
                <div className="text-xs text-purple-600">문 아트 나이트, 롯폰기 아트</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎮</div>
                <div className="text-sm font-semibold text-blue-800">게임박람회</div>
                <div className="text-xs text-blue-600">도쿄 게임 쇼</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🌸</div>
                <div className="text-sm font-semibold text-green-800">계절 이벤트</div>
                <div className="text-xs text-green-600">벚꽃, 단풍, 눈 축제</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎭</div>
                <div className="text-sm font-semibold text-pink-800">문화행사</div>
                <div className="text-xs text-pink-600">공연, 전시, 축제</div>
              </div>
            </Card>
          </div>
        </div>

        {/* 이벤트 목록 */}
        <div className="space-y-3">
          <div className="px-4">
            <h2 className="text-lg font-semibold">🎪 2025년 이벤트 & 페스티벌</h2>
            <p className="text-sm text-muted-foreground mt-1">
              총 {eventsData.length}개의 특별한 이벤트
            </p>
          </div>
          
          <div className="px-4 space-y-3">
            {eventsData.map((event, index) => (
              <PlaceCard
                key={`event-${index}`}
                title={event.title}
                category={event.category}
                image={event.image}
                price={event.price}
                distance={event.distance}
                openTime={event.openTime}
                rating={event.rating}
                tags={event.tags}
                lat={event.lat}
                lng={event.lng}
                address={event.address}
                mapUrl={event.mapUrl}
                referenceUrl={event.referenceUrl}
                onClick={() => handleMapClick(event)}
              />
            ))}
          </div>
        </div>

        {/* 이벤트 팁 */}
        <div className="px-4">
          <Card className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
            <div className="space-y-2">
              <h3 className="font-semibold text-indigo-800 flex items-center gap-2">
                <span className="text-lg">💡</span>
                이벤트 참여 팁
              </h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• 무료 이벤트도 사전 예약이 필요한 경우가 많음</li>
                <li>• 아트 나이트는 저녁 시간대가 가장 활기참</li>
                <li>• 게임 쇼는 평일이 주말보다 한산함</li>
                <li>• 계절 이벤트는 날씨에 따라 일정이 변경될 수 있음</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
