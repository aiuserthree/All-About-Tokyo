import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  className?: string;
  placesByLocation?: any;
  categoryFilter?: (place: any) => boolean;
}

const tokyoLocations = [
  { value: "all", label: "전체 지역", emoji: "🗾" },
  { value: "shinjuku", label: "신주쿠", emoji: "🏢" },
  { value: "shibuya", label: "시부야", emoji: "🚦" },
  { value: "ginza", label: "긴자", emoji: "💎" },
  { value: "asakusa", label: "아사쿠사", emoji: "🏛️" },
  { value: "harajuku", label: "하라주쿠", emoji: "👗" },
  { value: "roppongi", label: "롯폰기", emoji: "🍸" },
  { value: "ueno", label: "우에노", emoji: "🌸" },
  { value: "other", label: "기타 지역", emoji: "🏙️" },
  { value: "cafe", label: "카페/기타", emoji: "☕" },
  { value: "akihabara", label: "아키하바라", emoji: "🎮" },
  { value: "tsukiji", label: "쓰키지", emoji: "🐟" },
  { value: "tokyo-station", label: "도쿄역", emoji: "🚉" },
  { value: "skytree", label: "스카이트리", emoji: "🗼" }
];

// 지역별 장소 개수를 확인하는 함수
const getLocationCount = (location: string, placesByLocation: any, categoryFilter?: (place: any) => boolean) => {
  if (location === "all") {
    const allPlaces = placesByLocation[location] || [];
    return categoryFilter ? allPlaces.filter(categoryFilter).length : allPlaces.length;
  }
  const locationPlaces = placesByLocation[location] || [];
  return categoryFilter ? locationPlaces.filter(categoryFilter).length : locationPlaces.length;
};

export function LocationSelector({ selectedLocation, onLocationChange, className = "", placesByLocation, categoryFilter }: LocationSelectorProps) {
  const selectedLocationData = tokyoLocations.find(loc => loc.value === selectedLocation);

  // 데이터가 있는 지역만 필터링
  const availableLocations = tokyoLocations.filter(location => {
    if (location.value === "all") return true; // 전체는 항상 표시
    if (!placesByLocation || !categoryFilter) return true; // 필터가 없으면 모두 표시
    
    const count = getLocationCount(location.value, placesByLocation, categoryFilter);
    return count > 0;
  });

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>지역 선택</span>
      </div>
      
      <Select value={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span>{selectedLocationData?.emoji}</span>
              <span>{selectedLocationData?.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableLocations.map((location) => {
            const count = placesByLocation && categoryFilter 
              ? getLocationCount(location.value, placesByLocation, categoryFilter)
              : 0;
            
            return (
              <SelectItem key={location.value} value={location.value}>
                <div className="flex items-center gap-2">
                  <span>{location.emoji}</span>
                  <span>{location.label}</span>
                  {count > 0 && (
                    <span className="text-xs text-muted-foreground">({count})</span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
