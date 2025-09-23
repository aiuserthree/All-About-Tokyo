import { CloudSun } from "lucide-react";

interface AppBarProps {
  city?: string;
  weather?: string;
  temperature?: string;
}

export function AppBar({ 
  city = "도쿄", 
  weather = "맑음", 
  temperature = "23°C" 
}: AppBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-secondary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{city}</span>
            <span className="text-xs text-muted-foreground">{weather} {temperature}</span>
          </div>
        </div>
      </div>
      

    </div>
  );
}