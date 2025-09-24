import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { FilterChips } from "../components/FilterChips";
import { LocationSelector } from "../components/LocationSelector";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { placesByLocation, placesByType } from "../data/tokyoLocations";

export function EatScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filters = ["로컬맛집", "가성비", "혼밥OK", "아이동반", "24시간", "한국어", "할랄"];

  // 지역별 맛집 데이터 가져오기
  const getRestaurantsByLocation = () => {
    const locationPlaces = placesByLocation[selectedLocation] || [];
    return locationPlaces.filter(place => 
      ['라멘 전문점', '일식', '햄버거', '스시 전문점', '돈카츠', '우동', '소바', '야키니쿠', '이자카야', '양식', '이탈리안', '야키토리', '라멘', '스시', '함바그 전문점', '우동 전문점', '카이센동 전문점', '카이센동'].includes(place.category)
    );
  };

  const restaurants = getRestaurantsByLocation();

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => restaurant.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  const handleCardClick = (restaurant: any) => {
    // PlaceCard에서 이미 맵 링크를 처리하므로 여기서는 추가 동작이 필요하면 구현
    console.log('맛집 선택됨:', restaurant.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24">
        {/* Header */}
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">🍜 맛집 & 음식</h1>
          <p className="text-muted-foreground">도쿄의 맛있는 음식을 만나보세요</p>
        </div>

        {/* Search and Location */}
        <div className="px-4 pt-4 pb-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="맛집, 음식 종류 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <LocationSelector
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            placesByLocation={placesByLocation}
            categoryFilter={(place) => ['라멘 전문점', '일식', '햄버거', '스시 전문점', '돈카츠', '야키니쿠', '이자카야', '카페', '우동'].includes(place.category)}
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
                 selectedLocation === "harajuku" ? "하라주쿠" : "선택된 지역"} 맛집
              </p>
              <p className="text-xl font-semibold">{filteredRestaurants.length}곳</p>
            </div>
          </Card>
        </div>

        {/* Restaurant List */}
        <div className="px-4 space-y-4">
          {filteredRestaurants.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                {selectedLocation === "all" 
                  ? "검색 결과가 없습니다. 다른 검색어를 시도해보세요."
                  : "해당 지역에 등록된 맛집이 없습니다. 다른 지역을 선택해보세요."
                }
              </p>
            </Card>
          ) : (
            filteredRestaurants.map((restaurant, index) => (
              <PlaceCard
                key={index}
                title={restaurant.title}
                category={restaurant.category}
                image={restaurant.image}
                distance={restaurant.distance}
                price={restaurant.price}
                rating={restaurant.rating}
                openTime={restaurant.openTime}
                tags={restaurant.tags}
                lat={restaurant.lat}
                lng={restaurant.lng}
                address={restaurant.address}
                mapUrl={restaurant.mapUrl}
                referenceUrl={restaurant.referenceUrl}
                onClick={() => handleCardClick(restaurant)}
              />
            ))
          )}
        </div>

        {/* Food Culture Tips */}
        <div className="p-4 mt-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium mb-2">🍽️ 일본 식사 에티켓</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 젓가락을 그릇에 세워두지 마세요</li>
              <li>• 라멘은 소리내서 먹어도 괜찮아요</li>
              <li>• 팁은 주지 않는 것이 일반적입니다</li>
              <li>• "고치소사마"로 식사를 마무리하세요</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}