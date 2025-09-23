import { AppBar } from "../components/AppBar";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertTriangle, Phone, BookOpen, MessageSquare, Heart } from "lucide-react";

export function EssentialsScreen() {
  const essentialSections = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "일본 매너",
      items: [
        "지하철에서는 조용히 하세요",
        "젓가락을 밥에 세워두지 마세요",
        "길에서 걸으면서 먹지 마세요",
        "입장할 때 신발을 벗는 곳이 있어요",
        "90도로 깊게 인사하세요"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-500" />,
      title: "긴급 연락처",
      items: [
        "긴급상황: 110 (경찰), 119 (소방서)",
        "관광 핫라인: 050-3816-2787",
        "한국영사관: 03-3452-7611",
        "JR 분실물센터: 050-2016-1601",
        "도쿄역 안내소: 03-3212-2489"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      title: "지진 행동 요령",
      items: [
        "머리를 보호하고 튼튼한 책상 아래로",
        "출입문을 열어 탈출로를 확보하세요",
        "엘리베이터 사용을 피하세요",
        "해안가에서는 높은 곳으로 대피",
        "일본어: '지신다!' (지진이다!)"
      ]
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-500" />,
      title: "기본 일본어 10문장",
      items: [
        "아리가토 고자이마스 (감사합니다)",
        "스미마센 (죄송합니다/실례합니다)",
        "고메녹을르 수야 (한국인입니다)",
        "에이고 데키마스카? (영어 가능한가요?)",
        "코레 오네가이시마스 (이거 주세요)",
        "이쿠라 데스카? (얼마예요?)",
        "도코 데스카? (어디예요?)",
        "오이시이! (맛있어요!)",
        "타스케테! (도와주세요!)",
        "다이조부 데스 (괜찮습니다)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24 space-y-6">
        {/* Header */}
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-bold">필수 정보</h1>
          <p className="text-muted-foreground">안전하고 즐거운 여행을 위한 필수 정보</p>
        </div>

        {/* Essential Sections */}
        <div className="px-4 space-y-4">
          {essentialSections.map((section, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{itemIndex + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                
                {section.title === "긴급 연락처" && (
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    연락처 저장하기
                  </Button>
                )}
                
                {section.title === "기본 일본어 10문장" && (
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    발음 듣기
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency App Download */}
        <div className="px-4">
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-2">🚨 추천 앱</h3>
                <div className="space-y-2 text-sm text-red-800">
                  <div className="flex justify-between items-center">
                    <span>Safety tips for Travelers</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      다운로드
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NHK World Japan</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Cultural Tips */}
        <div className="px-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium mb-3">🎌 문화 팁</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 일본은 현금 사회입니다. 항상 현금을 준비하세요</li>
              <li>• 대부분의 화장실이 매우 깨끗하고 첨단 기능이 있어요</li>
              <li>• 공공장소에서 코 풀기는 실례가 될 수 있어요</li>
              <li>• 문신이 있으면 온천 이용이 제한될 수 있어요</li>
              <li>• 일본인들은 개인 공간을 중요하게 생각해요</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}