import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { PlaceCard } from "../components/PlaceCard";
import { FilterChips } from "../components/FilterChips";
import { LocationSelector } from "../components/LocationSelector";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search, Cake, Gift, Star } from "lucide-react";
import { placesByLocation } from "../data/tokyoLocations";

export function DessertScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // 화면 마운트 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filters = ["기념품", "디저트", "인스타", "전통", "현대", "한정판", "가성비"];

  // 지역별 디저트 데이터 가져오기
  const getDessertsByLocation = () => {
    const locationPlaces = placesByLocation[selectedLocation] || [];
    return locationPlaces.filter(place => 
      ['디저트', '카페', '브런치', '테마카페', '바'].includes(place.category)
    );
  };

  const desserts = getDessertsByLocation();

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredDesserts = desserts.filter(dessert => {
    const matchesSearch = dessert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dessert.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => dessert.tags.includes(filter));
    
    return matchesSearch && matchesFilters;
  });

  const handleCardClick = (dessert: any) => {
    // PlaceCard에서 이미 맵 링크를 처리하므로 여기서는 추가 동작이 필요하면 구현
    console.log('디저트 선택됨:', dessert.title);
  };

  const popularDesserts = [
    {
      name: "도쿄 바나나",
      description: "도쿄의 대표 기념품",
      price: "800-1,200엔",
      tags: ["기념품", "인스타"]
    },
    {
      name: "와라비모찌",
      description: "전통 일본 과자",
      price: "600-800엔",
      tags: ["전통", "디저트"]
    },
    {
      name: "로이스 초콜릿",
      description: "프리미엄 초콜릿",
      price: "1,500-3,000엔",
      tags: ["프리미엄", "기념품"]
    },
    {
      name: "킷캣 말차맛",
      description: "일본 한정판 킷캣",
      price: "200-400엔",
      tags: ["한정판", "가성비"]
    }
  ];

  const dessertTypes = [
    {
      icon: <Cake className="w-5 h-5" />,
      title: "전통 과자",
      count: desserts.filter(d => d.tags.includes('전통')).length,
      description: "일본 전통 과자"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: "기념품",
      count: desserts.filter(d => d.tags.includes('기념품')).length,
      description: "선물용 디저트"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "인스타",
      count: desserts.filter(d => d.tags.includes('인스타')).length,
      description: "SNS 인기 디저트"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24">
        {/* Header */}
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">🍰 디저트 & 과자</h1>
          <p className="text-muted-foreground">일본의 달콤한 디저트와 특별한 과자를 만나보세요</p>
        </div>

        <div className="p-4 space-y-6">

        {/* Search */}
        <div className="px-4 pt-4 pb-4">
          <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="디저트 이름이나 종류로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          </div>
        </div>

        {/* Location Selector */}
        <LocationSelector
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          placesByLocation={placesByLocation}
          categoryFilter={(place) => ['디저트'].includes(place.category)}
        />

        {/* Popular Desserts */}
        <div className="space-y-3">
          <h3 className="font-medium">🍯 인기 디저트</h3>
          <div className="grid grid-cols-2 gap-3">
            {popularDesserts.map((dessert, index) => (
              <Card key={index} className="p-3">
                <div className="font-medium text-sm">{dessert.name}</div>
                <div className="text-xs text-muted-foreground mb-1">{dessert.description}</div>
                <div className="text-xs font-medium text-primary">{dessert.price}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dessert.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-muted px-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dessert Types */}
        <div className="grid grid-cols-3 gap-4">
          {dessertTypes.map((type, index) => (
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
              {filteredDesserts.length}개 디저트
            </span>
          </div>

          {filteredDesserts.length === 0 ? (
            <Card className="p-8 text-center">
              <Cake className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">디저트를 찾을 수 없습니다</h3>
              <p className="text-sm text-muted-foreground">
                다른 필터나 지역을 시도해보세요
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredDesserts.map((dessert) => (
                <PlaceCard
                  key={dessert.id}
                  title={dessert.title}
                  category={dessert.category}
                  image={dessert.image}
                  distance={dessert.distance}
                  price={dessert.price}
                  rating={dessert.rating}
                  openTime={dessert.openTime}
                  tags={dessert.tags}
                  lat={dessert.lat}
                  lng={dessert.lng}
                  address={dessert.address}
                  mapUrl={dessert.mapUrl}
                  referenceUrl={dessert.referenceUrl}
                  onClick={() => handleCardClick(dessert)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <Card className="p-4 bg-pink-50 border-pink-200">
          <h3 className="font-medium text-pink-900 mb-2">💡 디저트 쇼핑 팁</h3>
          <ul className="text-sm text-pink-800 space-y-1">
            <li>• 기념품용은 공항에서 구매하는 것이 편리</li>
            <li>• 유통기한이 짧은 디저트는 여행 마지막에 구매</li>
            <li>• 한정판은 일찍 품절되니 미리 확인</li>
            <li>• 면세점에서 구매하면 추가 할인 혜택</li>
          </ul>
        </Card>
        </div>
      </div>
    </div>
  );
}
