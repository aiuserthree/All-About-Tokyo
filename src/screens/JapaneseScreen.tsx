import { useState } from "react";
import { ArrowLeft, Volume2, Star, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  japanesePhrases, 
  phrasesByCategory, 
  essentialPhrases, 
  categories,
  JapanesePhrase 
} from "../data/japanesePhrases";

interface JapaneseScreenProps {
  onBack: () => void;
}

export function JapaneseScreen({ onBack }: JapaneseScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showEssentialOnly, setShowEssentialOnly] = useState(false);

  // 음성 재생 함수 (Web Speech API 사용)
  const speakJapanese = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8; // 조금 느리게
      speechSynthesis.speak(utterance);
    }
  };

  // 현재 표시할 표현들 필터링
  const getFilteredPhrases = (): JapanesePhrase[] => {
    let phrases = showEssentialOnly ? essentialPhrases : japanesePhrases;
    
    if (selectedCategory !== "all") {
      phrases = phrases.filter(phrase => phrase.category === selectedCategory);
    }
    
    return phrases;
  };

  const filteredPhrases = getFilteredPhrases();

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">생활 일본어</h1>
          <div className="h-8 w-8" /> {/* 공간 확보 */}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 필터 섹션 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="h-8"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
            
            <Button
              variant={showEssentialOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEssentialOnly(!showEssentialOnly)}
              className="w-full"
            >
              <Star className="h-4 w-4 mr-2" />
              {showEssentialOnly ? "필수 표현만 보기" : "모든 표현 보기"}
            </Button>
          </CardContent>
        </Card>

        {/* 통계 정보 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{filteredPhrases.length}</div>
                <div className="text-xs text-muted-foreground">표현</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{essentialPhrases.length}</div>
                <div className="text-xs text-muted-foreground">필수</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
                <div className="text-xs text-muted-foreground">카테고리</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 일본어 표현 목록 */}
        <div className="space-y-3">
          {filteredPhrases.map((phrase) => (
            <Card key={phrase.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* 상황과 카테고리 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.id === phrase.category)?.icon} {phrase.category}
                    </Badge>
                    {phrase.isEssential && (
                      <Badge variant="default" className="text-xs bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        필수
                      </Badge>
                    )}
                  </div>
                </div>

                {/* 상황 설명 */}
                <p className="text-sm text-muted-foreground mb-3">
                  💡 {phrase.situation}
                </p>

                {/* 일본어와 발음 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{phrase.japanese}</div>
                      <div className="text-sm text-blue-600 font-medium">{phrase.pronunciation}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => speakJapanese(phrase.japanese)}
                      className="h-8 w-8 text-blue-600 hover:text-blue-700"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 의미와 사용법 */}
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      뜻: {phrase.meaning}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      사용법: {phrase.usage}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredPhrases.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-muted-foreground">
                선택한 조건에 맞는 일본어 표현이 없습니다.
              </p>
            </CardContent>
          </Card>
        )}

        {/* 하단 여백 */}
        <div className="h-20" />
      </div>
    </div>
  );
}
