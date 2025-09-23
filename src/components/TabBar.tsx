import { Home, UtensilsCrossed, Camera, ShoppingBag, Coffee, Cake, MessageCircle } from "lucide-react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: "home", icon: Home, label: "홈" },
    { id: "eat", icon: UtensilsCrossed, label: "먹기" },
    { id: "see", icon: Camera, label: "보기" },
    { id: "shop", icon: ShoppingBag, label: "쇼핑" },
    { id: "cafe", icon: Coffee, label: "카페" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}