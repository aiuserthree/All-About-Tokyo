import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { FilterChips } from "../components/FilterChips";
import { LocationSelector } from "../components/LocationSelector";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search, Coffee, Wine, Heart } from "lucide-react";
import { placesByLocation } from "../data/tokyoLocations";

export function CafeScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filters = ["데이트", "트렌디", "프리미엄", "24시간", "야간", "그룹", "인스타", "아이동반"];

  // 지역별 카페 데이터 가져오기
  const getCafesByLocation = () => {
    const locationPlaces = placesByLocation[selectedLocation] || [];
    return locationPlaces.filter(place => 
      ['카페', '디저트', '브런치', '테마카페', '바'].includes(place.category)
    );
  };

  const cafes = getCafesByLocation();

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredCafes = cafes.filter(cafe => {
    const matchesSearch = cafe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cafe.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => cafe.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  const handleCardClick = (cafe: any) => {
    // PlaceCard에서 이미 맵 링크를 처리하므로 여기서는 추가 동작이 필요하면 구현
    console.log('카페 선택됨:', cafe.title);
  };

  const cafeTypes = [
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "일반 카페",
      count: cafes.filter(c => ['카페', '디저트', '브런치'].includes(c.category)).length,
      description: "커피와 간단한 디저트"
    },
    {
      icon: <Wine className="w-5 h-5" />,
      title: "바",
      count: cafes.filter(c => c.category === '바').length,
      description: "술과 함께하는 분위기"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "테마카페",
      count: cafes.filter(c => c.category === '테마카페').length,
      description: "특별한 테마의 카페"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">☕ 카페 & 바</h1>
          <p className="text-muted-foreground">도쿄의 특별한 카페와 바를 찾아보세요</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="카페 이름이나 종류로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Location Selector */}
        <LocationSelector
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placesByLocation={placesByLocation}
          categoryFilter={(place) => ['카페', '디저트', '브런치', '테마카페', '바'].includes(place.category)}
        />

        {/* Cafe Types */}
        <div className="grid grid-cols-3 gap-4">
          {cafeTypes.map((type, index) => (
            <Card key={index} className="p-4 text-center">
              <div className="flex justify-center mb-2">
                {type.icon}
              </div>
              <div className="text-sm font-medium">{type.title}</div>
              <div className="text-lg font-bold text-primary">{type.count}</div>
              <div className="text-xs text-muted-foreground">{type.description}</div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <h3 className="font-medium">필터</h3>
          <FilterChips
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">검색 결과</h3>
            <span className="text-sm text-muted-foreground">
              {filteredCafes.length}개 카페
            </span>
          </div>

          {filteredCafes.length === 0 ? (
            <Card className="p-8 text-center">
              <Coffee className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">카페를 찾을 수 없습니다</h3>
              <p className="text-sm text-muted-foreground">
                다른 필터나 지역을 시도해보세요
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredCafes.map((cafe) => (
                <PlaceCard
                  key={cafe.id}
                  title={cafe.title}
                  category={cafe.category}
                  image={cafe.image}
                  distance={cafe.distance}
                  price={cafe.price}
                  rating={cafe.rating}
                  openTime={cafe.openTime}
                  tags={cafe.tags}
                  lat={cafe.lat}
                  lng={cafe.lng}
                  address={cafe.address}
                  mapUrl={cafe.mapUrl}
                  referenceUrl={cafe.referenceUrl}
                  onClick={() => handleCardClick(cafe)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">💡 카페 이용 팁</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 대부분의 카페에서 무료 WiFi 제공</li>
            <li>• 테마카페는 예약이 필요할 수 있음</li>
            <li>• 바는 18세 이상만 입장 가능</li>
            <li>• 일본 카페는 흡연 구역이 따로 있음</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
