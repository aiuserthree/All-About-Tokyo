import { ArrowLeft, MapPin, Star, Wifi, Car, Utensils, Users, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface HotelInfoScreenProps {
  onBack?: () => void;
}

export function HotelInfoScreen({ onBack }: HotelInfoScreenProps) {
  const hotelAddress = "Minato-ku, Roppongi 2-3-11, Tokyo, Japan";
  
  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(hotelAddress);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">숙소 정보</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 호텔 기본 정보 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              APA Hotel Roppongi SIX
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">3성급</Badge>
              <Badge variant="outline">미나토 구</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">8.4점</span>
              <span className="text-sm text-muted-foreground">(커플 여행객 선호)</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={openGoogleMaps}
              className="p-0 h-auto text-sm text-muted-foreground hover:text-primary justify-start gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Minato-ku, Roppongi 2-3-11</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </CardContent>
        </Card>

        {/* 숙박 일정 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              숙박 일정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">체크인</span>
              <span className="font-medium">2025년 9월 27일(토)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">체크아웃</span>
              <span className="font-medium">2025년 9월 29일(일)</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">숙박 기간</span>
                <Badge variant="secondary">2박 3일</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주변 명소 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              주변 명소
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Franciscan Chapel Center</span>
                <span className="text-xs text-muted-foreground">6분</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Kaishu Katsu & Ryoma Sakamoto Teacher and Student Monument</span>
                <span className="text-xs text-muted-foreground">500m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Site of the House of Kaishu Katsu</span>
                <span className="text-xs text-muted-foreground">7분</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">The Former Residence of Naoya Shiga</span>
                <span className="text-xs text-muted-foreground">7분</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">롯폰기역</span>
                <span className="text-xs text-muted-foreground">인근</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 공항 접근성 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              공항 접근성
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm">도쿄 하네다 공항</span>
              <span className="text-sm font-medium">14km</span>
            </div>
          </CardContent>
        </Card>

        {/* 객실 시설 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              객실 시설
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="text-sm">무료 Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-600" />
                <span className="text-sm">에어컨</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <span className="text-sm">평면 TV</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span className="text-sm">책상</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                전용 욕실 (욕조 및 샤워 시설 포함), 침대 린넨 및 수건 제공
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 호텔 편의시설 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" />
              호텔 편의시설
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">식사</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 뷔페, 미국식 또는 아시아식 조식 제공</li>
                <li>• 호텔 내 레스토랑</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">기타 편의시설</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">주차장</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">금연 객실</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">장애인 편의시설</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">다국어 지원</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 참고사항 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-4 h-4 text-primary" />
              참고사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                시내 중심부에서 1km 내 거리
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                영어, 일본어 구사 가능한 리셉션 직원
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                숙소 설명에 표시된 거리는 © OpenStreetMap을 통해 산출
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
