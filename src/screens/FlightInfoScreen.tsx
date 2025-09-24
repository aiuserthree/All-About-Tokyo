import { ArrowLeft, Plane, Clock, MapPin, CreditCard, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface FlightInfoScreenProps {
  onBack?: () => void;
}

export function FlightInfoScreen({ onBack }: FlightInfoScreenProps) {
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
        <h1 className="text-lg font-semibold">항공권 정보</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 항공사 정보 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plane className="w-5 h-5 text-primary" />
              에어서울 (Air Seoul)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">직항편</Badge>
              <Badge variant="outline">왕복</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              인천 ⇄ 도쿄(나리타) 항공편 정보
            </p>
          </CardContent>
        </Card>

        {/* 가는 편 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              가는 편
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">09:25</div>
                <div className="text-sm text-muted-foreground">인천국제공항</div>
                <div className="text-xs text-muted-foreground">ICN</div>
              </div>
              
              <div className="flex-1 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border"></div>
                  <Plane className="w-4 h-4 text-primary" />
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <div className="text-center mt-2">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    2시간 15분
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold">11:40</div>
                <div className="text-sm text-muted-foreground">나리타국제공항</div>
                <div className="text-xs text-muted-foreground">NRT</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 오는 편 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              오는 편
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">20:06</div>
                <div className="text-sm text-muted-foreground">나리타국제공항</div>
                <div className="text-xs text-muted-foreground">NRT</div>
              </div>
              
              <div className="flex-1 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border"></div>
                  <Plane className="w-4 h-4 text-primary" />
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <div className="text-center mt-2">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    2시간 45분
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">(시차 고려)</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold">22:50</div>
                <div className="text-sm text-muted-foreground">인천국제공항</div>
                <div className="text-xs text-muted-foreground">ICN</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 요금 정보 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              요금 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">총 요금</span>
              <span className="text-lg font-semibold">₩300,400</span>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">1인 기준 가격</span>
                <Badge variant="secondary">성인</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 참고사항 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-primary" />
              참고사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                인천 ⇄ 도쿄(나리타) 왕복 항공편
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                에어서울 운항
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                직항편
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
