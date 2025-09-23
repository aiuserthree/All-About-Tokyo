import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { LocationSelector } from "../components/LocationSelector";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { AlertCircle, Gift, CreditCard, Search } from "lucide-react";
import { placesByLocation } from "../data/tokyoLocations";

export function ShopScreen() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 지역별 쇼핑 데이터 가져오기
  const getShoppingByLocation = () => {
    const locationPlaces = placesByLocation[selectedLocation] || [];
    return locationPlaces.filter(place => 
      ['백화점', '상점가', '패션·액세서리', '시장', '면세점', '쇼핑몰', '쇼핑', '서점'].includes(place.category)
    );
  };

  const shoppingAreas = getShoppingByLocation();

  // 검색 기능 추가
  const filteredShoppingAreas = shoppingAreas.filter(area => {
    const matchesSearch = area.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         area.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         area.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const recommendations = [
    {
      category: "🍫 인기 과자·간식",
      items: ["킷캣 말차맛", "로이스 초콜릿", "히요코 과자", "도쿄 바나나"]
    },
    {
      category: "🍵 차·음료",
      items: ["말차", "우지차", "사케", "일본 맥주"]
    },
    {
      category: "🍜 식품·조미료",
      items: ["라멘", "와사비", "간장", "미소"]
    },
    {
      category: "👘 전통·문화",
      items: ["유카타", "일본 화장품", "액세서리", "캐릭터 용품"]
    }
  ];

  const handleCardClick = (place: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />

      <div className="pb-24 space-y-6">
        {/* Header */}
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">쇼핑</h1>
          <p className="text-muted-foreground">도쿄 최고의 쇼핑 스팟을 만나보세요</p>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="쇼핑 장소나 카테고리로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location Selector */}
        <div className="px-4 pb-4">
          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            placesByLocation={placesByLocation}
            categoryFilter={(place) => ['백화점', '상점가', '패션·액세서리', '시장', '면세점', '쇼핑몰', '쇼핑', '서점'].includes(place.category)}
          />
        </div>

        {/* Quick Stats */}
        <div className="px-4 pb-4">
          <Card className="p-4 bg-secondary/10 border-secondary">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedLocation === "all" ? "전체" : 
                 selectedLocation === "shinjuku" ? "신주쿠" :
                 selectedLocation === "shibuya" ? "시부야" :
                 selectedLocation === "ginza" ? "긴자" :
                 selectedLocation === "asakusa" ? "아사쿠사" :
                 selectedLocation === "harajuku" ? "하라주쿠" : "선택된 지역"} 쇼핑
              </p>
              <p className="text-xl font-semibold">{filteredShoppingAreas.length}곳</p>
            </div>
          </Card>
        </div>

        {/* Tax Free Banner */}
        <div className="px-4">
          <Card className="p-4 bg-secondary/20 border-secondary">
            <div className="flex items-start gap-3">
              <Gift className="w-5 h-5 text-secondary mt-1" />
              <div>
                <h3 className="font-medium text-secondary">Tax Free 쇼핑 안내</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  5,000엔 이상 구매 시 소비세 10% 환급 가능
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Shopping Areas */}
        <div className="space-y-4">
          <div className="px-4">
            <h2 className="text-xl font-semibold">
              {selectedLocation === "all" ? "추천 쇼핑 지역" : 
               selectedLocation === "shinjuku" ? "신주쿠 쇼핑" :
               selectedLocation === "shibuya" ? "시부야 쇼핑" :
               selectedLocation === "ginza" ? "긴자 쇼핑" :
               selectedLocation === "asakusa" ? "아사쿠사 쇼핑" :
               selectedLocation === "harajuku" ? "하라주쿠 쇼핑" : "선택된 지역 쇼핑"}
            </h2>
          </div>

          <div className="px-4 space-y-4">
            {filteredShoppingAreas.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "검색 결과가 없습니다. 다른 검색어를 시도해보세요."
                    : selectedLocation === "all" 
                      ? "등록된 쇼핑 지역이 없습니다."
                      : "해당 지역에 등록된 쇼핑 장소가 없습니다. 다른 지역을 선택해보세요."
                  }
                </p>
              </Card>
            ) : (
              filteredShoppingAreas.map((area, index) => (
                <PlaceCard
                  key={index}
                  title={area.title}
                  category={area.category}
                  image={area.image}
                  distance={area.distance}
                  openTime={area.openTime}
                  rating={area.rating}
                  tags={area.tags}
                  lat={area.lat}
                  lng={area.lng}
                  address={area.address}
                  onClick={() => handleCardClick(area)}
                />
              ))
            )}
          </div>
        </div>

        {/* Shopping Recommendations */}
        <div className="space-y-4">
          <div className="px-4">
            <h2 className="text-xl font-semibold">카테고리별 추천</h2>
          </div>

          <div className="px-4 space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-medium mb-3">{rec.category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {rec.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-2 bg-muted/50 rounded-lg">
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment & Tips */}
        <div className="px-4 space-y-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900">💳 결제 및 환전 팁</h3>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• 대부분의 상점에서 신용카드 사용 가능</li>
                  <li>• 현금은 소액권으로 준비하는 것이 좋아요</li>
                  <li>• 편의점에서 ATM 이용 가능</li>
                  <li>• 환전은 공항이나 은행에서 할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h3 className="font-medium text-orange-900">🛍️ 쇼핑 팁</h3>
                <ul className="text-sm text-orange-700 mt-2 space-y-1">
                  <li>• 백화점은 보통 오전 10시에 오픈</li>
                  <li>• 일요일에는 일부 매장이 휴무일 수 있어요</li>
                  <li>• 포장 서비스가 매우 정성스러워요</li>
                  <li>• 가격 흥정은 일반적이지 않습니다</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}