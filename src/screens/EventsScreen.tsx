import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";

interface EventsScreenProps {
  onBack?: () => void;
}

export function EventsScreen({ onBack }: EventsScreenProps) {
  // 이벤트 & 페스티벌 데이터 (실제 데이터는 tokyoLocations에서 가져올 수 있도록 확장 필요)
  const eventsData = [
    {
      id: "event-1",
      title: "문 아트 나이트 시모키타자와",
      category: "아트페스티벌",
      description: "달빛을 테마로 한 아트페스티벌, 공연",
      image: "/image/문 아트 나이트 시모키타자와.png",
      distance: "0m",
      price: "무료",
      rating: 4.5,
      openTime: "18:00-22:00",
      tags: ["무료", "아트", "야간", "공연"],
      lat: 35.6617,
      lng: 139.6667,
      address: "도쿄도 세타가야구 시모키타자와 2-12-1",
      location: "shimokitazawa",
      mapUrl: "https://maps.app.goo.gl/n1a9VSpSGs7DV6Jz7",
      referenceUrl: "https://tokyocheapo.com/events/moon-art-night-shimokitazawa/",
      eventDate: "2025년 3월",
      eventType: "아트페스티벌"
    },
    {
      id: "event-2", 
      title: "롯폰기 아트 나이트 2025",
      category: "아트페스티벌",
      description: "미술관, 전시(낮) + 거리 설치미술, 퍼포먼스(밤)",
      image: "/image/롯폰기 아트 나이트 2025.png",
      distance: "0m",
      price: "무료",
      rating: 4.6,
      openTime: "10:00-22:00",
      tags: ["무료", "미술관", "전시", "퍼포먼스"],
      lat: 35.6654,
      lng: 139.7296,
      address: "도쿄도 미나토구 롯폰기 6-10-1",
      location: "roppongi",
      mapUrl: "https://maps.app.goo.gl/jeFXGDorajDimhgH6",
      referenceUrl: "https://www.gotokyo.org/kr/spot/ev236/index.html",
      eventDate: "2025년 4월",
      eventType: "아트페스티벌"
    },
    {
      id: "event-3",
      title: "도쿄 게임 쇼 2025",
      category: "게임박람회",
      description: "아시아 최대 게임 박람회",
      image: "/image/도쿄 게임 쇼 2025.png",
      distance: "0m",
      price: "입장료 있음",
      rating: 4.7,
      openTime: "10:00-17:00",
      tags: ["게임", "박람회", "체험", "전시"],
      lat: 35.6762,
      lng: 139.6503,
      address: "도쿄도 지요다구 다이바 1-1-1",
      location: "other",
      mapUrl: "https://maps.app.goo.gl/ZcCGgdmVKDsgxt2TA",
      referenceUrl: "https://www.waug.com/ko/activities/149074",
      eventDate: "2025년 9월",
      eventType: "게임박람회"
    }
  ];

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
              <Card key={`event-${index}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {event.eventType}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>📅 {event.eventDate}</span>
                      <span>💰 {event.price}</span>
                      <span>⭐ {event.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMapClick(event)}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    지도보기
                  </Button>
                  {event.referenceUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReferenceClick(event)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
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
