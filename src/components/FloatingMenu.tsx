import { useState } from "react";
import { Plus, Plane, X, Home, MessageCircle, Hotel, Radio, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface FloatingMenuProps {
  onFlightInfoClick: () => void;
  onHotelInfoClick: () => void;
  onHomeClick: () => void;
  onAIChatClick: () => void;
  onLiveInfoClick?: () => void;
  onJapaneseClick: () => void;
}

export function FloatingMenu({ onFlightInfoClick, onHotelInfoClick, onHomeClick, onAIChatClick, onLiveInfoClick, onJapaneseClick }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (callback: (() => void) | undefined) => {
    if (callback && typeof callback === 'function') {
      callback();
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3">
          <Card className="shadow-lg border border-border/50">
            <CardContent className="p-2 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuClick(onFlightInfoClick)}
                className="w-full justify-start gap-3 text-sm font-medium"
              >
                <Plane className="w-4 h-4 text-blue-600" />
                항공권 정보
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuClick(onHotelInfoClick)}
                className="w-full justify-start gap-3 text-sm font-medium"
              >
                <Hotel className="w-4 h-4 text-orange-600" />
                숙소 정보
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuClick(onJapaneseClick)}
                className="w-full justify-start gap-3 text-sm font-medium"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                생활 일본어
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuClick(onAIChatClick)}
                className="w-full justify-start gap-3 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 text-purple-600" />
                AI 채팅
              </Button>
              
              {onLiveInfoClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMenuClick(onLiveInfoClick)}
                  className="w-full justify-start gap-3 text-sm font-medium"
                >
                  <Radio className="w-4 h-4 text-red-600" />
                  정보 대시보드
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMenuClick(onHomeClick)}
                className="w-full justify-start gap-3 text-sm font-medium"
              >
                <Home className="w-4 h-4 text-green-600" />
                홈으로
              </Button>
              
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main FAB Button */}
      <Button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
          isOpen 
            ? "bg-destructive hover:bg-destructive/90 rotate-45" 
            : "bg-primary hover:bg-primary/90"
        }`}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Plus className="w-6 h-6 text-primary-foreground" />
        )}
      </Button>
    </div>
  );
}
