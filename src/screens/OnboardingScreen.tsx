import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { MapPin, Wallet, Users, Bell, Navigation } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    airport: "",
    accommodation: "",
    budget: "",
    dietary: "",
    companions: "",
    locationPermission: false,
    notificationPermission: false
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🗼</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">ALL ABOUT TOKYO</h1>
            <p className="text-lg text-muted-foreground">한국인 초행자를 위한 도쿄 여행 올인원 가이드</p>
          </div>
          <Button onClick={nextStep} className="w-full">
            시작하기
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-background p-6 pt-12">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">기본 정보 입력</h2>
            <p className="text-muted-foreground">맞춤 추천을 위해 정보를 입력해주세요</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="airport">도착 공항</Label>
              <Select value={formData.airport} onValueChange={(value) => setFormData({...formData, airport: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="공항을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="narita">나리타 공항 (NRT)</SelectItem>
                  <SelectItem value="haneda">하네다 공항 (HND)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodation">숙소 지역</Label>
              <Input
                id="accommodation"
                placeholder="예: 신주쿠, 시부야, 아사쿠사"
                value={formData.accommodation}
                onChange={(e) => setFormData({...formData, accommodation: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">하루 예산</Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="예산을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">5만원 이하</SelectItem>
                  <SelectItem value="medium">5-10만원</SelectItem>
                  <SelectItem value="high">10만원 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietary">식성</Label>
              <Select value={formData.dietary} onValueChange={(value) => setFormData({...formData, dietary: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="식성을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">무엇이든 좋아요</SelectItem>
                  <SelectItem value="local">현지 음식 위주</SelectItem>
                  <SelectItem value="familiar">익숙한 음식 위주</SelectItem>
                  <SelectItem value="vegetarian">채식주의</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companions">동행 여부</Label>
              <Select value={formData.companions} onValueChange={(value) => setFormData({...formData, companions: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="동행을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">혼자</SelectItem>
                  <SelectItem value="couple">커플</SelectItem>
                  <SelectItem value="family">가족</SelectItem>
                  <SelectItem value="friends">친구들</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={nextStep} className="w-full">
            다음
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background p-6 pt-12">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">권한 설정</h2>
            <p className="text-muted-foreground">더 나은 서비스를 위해 권한을 허용해주세요</p>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <Navigation className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">위치 서비스</h3>
                      <p className="text-sm text-muted-foreground">근처 맛집과 명소를 추천해드려요</p>
                    </div>
                    <Checkbox
                      checked={formData.locationPermission}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, locationPermission: checked as boolean})
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <Bell className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">알림</h3>
                      <p className="text-sm text-muted-foreground">교통 정보와 긴급 상황을 알려드려요</p>
                    </div>
                    <Checkbox
                      checked={formData.notificationPermission}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, notificationPermission: checked as boolean})
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Button onClick={nextStep} className="w-full">
            시작하기
          </Button>
        </div>
      </div>
    );
  }

  return null;
}