import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { day3Itinerary, updateItineraryWithPlaces } from "../data/tokyoItinerary";
import { allTokyoPlaces } from "../data/tokyoLocations";
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, MapPin, ExternalLink, Info } from "lucide-react";

interface Day3ScreenProps {
  onBack?: () => void;
}

export function Day3Screen({ onBack }: Day3ScreenProps) {
  const [itinerary, setItinerary] = useState(day3Itinerary);

  useEffect(() => {
    // 장소 정보와 연결된 일정 데이터로 업데이트
    const updatedItinerary = updateItineraryWithPlaces(day3Itinerary, allTokyoPlaces);
    setItinerary(updatedItinerary);
  }, []);

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
        {/* 헤더 */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-purple-800">🗼 Day 3</h1>
              <p className="text-sm text-muted-foreground">{itinerary.title}</p>
            </div>
          </div>
          
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
            <div className="space-y-2">
              <h2 className="font-semibold text-purple-900">📝 일정 개요</h2>
              <p className="text-sm text-purple-700">{itinerary.description}</p>
            </div>
          </Card>
        </div>

        {/* 일정 타임라인 */}
        <div className="px-4 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            일정 타임라인
          </h2>
          
          <div className="space-y-3">
            {itinerary.items.map((item, index) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-800">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.time}
                      </Badge>
                      {item.travelTime && (
                        <Badge variant="secondary" className="text-xs">
                          이동: {item.travelTime}
                        </Badge>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.place}</h3>
                      <p className="text-sm text-gray-600">{item.activity}</p>
                      {item.notes && (
                        <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                      )}
                    </div>

                    {/* 장소 정보가 있는 경우 PlaceCard 표시 */}
                    {item.placeInfo && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">장소 정보</span>
                        </div>
                        <PlaceCard
                          title={item.placeInfo.title}
                          category={item.placeInfo.category}
                          image={item.placeInfo.image}
                          distance={item.placeInfo.distance}
                          price={item.placeInfo.price}
                          rating={item.placeInfo.rating}
                          openTime={item.placeInfo.openTime}
                          tags={item.placeInfo.tags}
                          lat={item.placeInfo.lat}
                          lng={item.placeInfo.lng}
                          address={item.placeInfo.address}
                          mapUrl={item.placeInfo.mapUrl}
                          referenceUrl={item.placeInfo.referenceUrl}
                          onClick={() => handleMapClick(item.placeInfo)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 여행 팁 */}
        {itinerary.tips && itinerary.tips.length > 0 && (
          <div className="px-4 space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Info className="w-5 h-5" />
              여행 팁
            </h2>
            
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <div className="space-y-2">
                {itinerary.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600">💡</span>
                    <p className="text-sm text-yellow-800">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 관련 장소 추천 */}
        <div className="px-4 space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            관련 장소 추천
          </h2>
          
          <div className="space-y-3">
            {itinerary.items
              .filter(item => item.placeInfo)
              .reduce((unique, item) => {
                // 중복 제거: 같은 title을 가진 장소는 하나만 유지
                const exists = unique.find(existing => existing.placeInfo?.title === item.placeInfo?.title);
                if (!exists) {
                  unique.push(item);
                }
                return unique;
              }, [] as typeof itinerary.items)
              .slice(0, 3) // 상위 3개만 표시
              .map((item, index) => (
                <PlaceCard
                  key={`recommendation-${item.id}`}
                  title={item.placeInfo!.title}
                  category={item.placeInfo!.category}
                  image={item.placeInfo!.image}
                  distance={item.placeInfo!.distance}
                  price={item.placeInfo!.price}
                  rating={item.placeInfo!.rating}
                  openTime={item.placeInfo!.openTime}
                  tags={item.placeInfo!.tags}
                  lat={item.placeInfo!.lat}
                  lng={item.placeInfo!.lng}
                  address={item.placeInfo!.address}
                  mapUrl={item.placeInfo!.mapUrl}
                  referenceUrl={item.placeInfo!.referenceUrl}
                  onClick={() => handleMapClick(item.placeInfo)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
