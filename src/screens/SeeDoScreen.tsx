import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { FilterChips } from "../components/FilterChips";
import { LocationSelector } from "../components/LocationSelector";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { placesByLocation } from "../data/tokyoLocations";

export function SeeDoScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["무료", "실내", "야외", "역사", "현대", "가족", "사진", "체험"];

  // 지역별 명소 데이터 가져오기
  const getAttractionsByLocation = () => {
    const locationPlaces = placesByLocation[selectedLocation] || [];
    return locationPlaces.filter(place => 
      ['랜드마크', '사찰', '전망대', '전시관', '공원', '산책로'].includes(place.category)
    );
  };

  const attractions = getAttractionsByLocation();

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => attraction.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  const handleCardClick = (attraction: any) => {
    // PlaceCard에서 이미 맵 링크를 처리하므로 여기서는 추가 동작이 필요하면 구현
    console.log('명소 선택됨:', attraction.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />

      <div className="pb-24">
        {/* Header */}
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">명소 & 활동</h1>
          <p className="text-muted-foreground">도쿄의 필수 관광지를 둘러보세요</p>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="명소 이름이나 카테고리로 검색..."
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
            categoryFilter={(place) => ['전망대', '랜드마크', '불교 사찰', '신사', '사찰', '정원', '동물원', '박물관', '공원', '미술관', '명소', '산책로', '교통'].includes(place.category)}
          />
        </div>

        {/* Filter Chips */}
        <FilterChips
          filters={filters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />

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
                 selectedLocation === "harajuku" ? "하라주쿠" : "선택된 지역"} 명소
              </p>
              <p className="text-xl font-semibold">{filteredAttractions.length}곳</p>
            </div>
          </Card>
        </div>

        {/* Attractions Grid */}
        <div className="p-4 space-y-4">
          {filteredAttractions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {selectedLocation === "all" 
                  ? "검색 결과가 없습니다. 다른 필터를 시도해보세요."
                  : "해당 지역에 등록된 명소가 없습니다. 다른 지역을 선택해보세요."
                }
              </p>
            </Card>
          ) : (
            filteredAttractions.map((attraction, index) => (
              <PlaceCard
                key={index}
                title={attraction.title}
                category={attraction.category}
                image={attraction.image}
                distance={attraction.distance}
                price={attraction.price}
                rating={attraction.rating}
                openTime={attraction.openTime}
                tags={attraction.tags}
                lat={attraction.lat}
                lng={attraction.lng}
                address={attraction.address}
                mapUrl={attraction.mapUrl}
                referenceUrl={attraction.referenceUrl}
                onClick={() => handleCardClick(attraction)}
              />
            ))
          )}
        </div>

        {/* Travel Tips */}
        <div className="p-4 mt-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium mb-2">🗼 관광 팁</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 대중교통 이용이 편리합니다</li>
              <li>• 많은 신사와 절이 무료로 입장 가능합니다</li>
              <li>• 사진 촬영 금지 구역을 확인하세요</li>
              <li>• 대부분의 관광지에서 영어 안내를 제공합니다</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}