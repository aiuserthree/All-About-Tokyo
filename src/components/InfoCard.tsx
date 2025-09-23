import { Card } from "./ui/card";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
}

export function InfoCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  className = "" 
}: InfoCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {subtitle && (
            <p className={`text-xs ${getTrendColor()}`}>{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-secondary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}