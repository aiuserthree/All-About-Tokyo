import { useState, useRef, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Send, Star, MapPin, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { aiChatService, AIResponse } from "../services/aiChatService";

interface Message {
  id: string;
  type: "user" | "ai" | "loading" | "error";
  content: string;
  recommendations?: Array<{
    title: string;
    category: string;
    description?: string;
    image?: string;
    rating?: number;
    distance?: string;
  }>;
  timestamp: Date;
}

export function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "안녕하세요! 도쿄 여행 가이드 AI입니다. 🗼\n\n어떤 도쿄 여행 정보가 필요하신가요?\n\n• 맛집 추천\n• 관광지 정보\n• 쇼핑 가이드\n• 교통 정보\n• 기타 여행 팁",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // 로딩 메시지 추가
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "loading",
      content: "AI가 답변을 준비하고 있습니다...",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // 실제 AI API 호출
      const aiResponse: AIResponse = await aiChatService.sendMessage(inputValue);

      // 로딩 메시지 제거
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      // AI 응답 메시지 추가
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: aiResponse.content,
        recommendations: aiResponse.recommendations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
      console.error('AI 응답 오류:', error);
      
      // 로딩 메시지 제거
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      // 오류 메시지 (이제는 거의 발생하지 않을 것)
      const errorContent = "죄송합니다. 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

      // 오류 메시지 추가
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "error",
        content: errorContent,
        timestamp: new Date(),
        lastUserMessage: newUserMessage.content
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.type === "user");
      if (lastUserMessage) {
        setInputValue(lastUserMessage.content);
        handleSendMessage();
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      
      <div className="pb-24 h-screen flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <Card className={`p-4 ${
                  message.type === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : message.type === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-muted"
                }`}>
                  <div className="flex items-start gap-3">
                    {message.type === "ai" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        AI
                      </div>
                    )}
                    {message.type === "error" && (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    {message.type === "loading" && (
                      <RefreshCw className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="whitespace-pre-line text-sm">{message.content}</div>

                      {message.recommendations && (
                        <div className="mt-4 space-y-3">
                          {message.recommendations.map((rec, index) => (
                            <Card key={index} className="p-3 bg-background">
                              <div className="flex gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <ImageWithFallback
                                    src={rec.image || ""}
                                    alt={rec.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{rec.title}</h4>
                                  <p className="text-xs text-muted-foreground">{rec.category}</p>
                                  {rec.description && (
                                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                                  )}
                                  <div className="flex items-center gap-2 mt-1">
                                    {rec.rating && (
                                      <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500" />
                                        <span className="text-xs">{rec.rating}</span>
                                      </div>
                                    )}
                                    {rec.distance && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">{rec.distance}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.type === "error" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRetry}
                            className="h-6 px-2 text-xs"
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            다시 시도
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="도쿄 여행에 대해 무엇이든 물어보세요..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Enter로 전송, Shift+Enter로 줄바꿈
          </p>
        </div>
      </div>
    </div>
  );
}