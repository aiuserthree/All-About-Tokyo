import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Clock, DollarSign, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PlaceCardProps {
  title: string;
  category?: string;
  image?: string;
  price?: string;
  distance?: string;
  openTime?: string;
  rating?: number;
  tags?: string[];
  lat?: number;
  lng?: number;
  address?: string;
  mapUrl?: string;
  referenceUrl?: string;
  onClick?: () => void;
}

export function PlaceCard({
  title,
  category,
  image,
  price,
  distance,
  openTime,
  rating,
  tags = [],
  lat,
  lng,
  address,
  mapUrl,
  referenceUrl,
  onClick
}: PlaceCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-32 bg-muted">
        {image && (
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {rating && (
          <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded-full text-xs">
            ★ {rating}
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium line-clamp-1">{title}</h3>
            {category && (
              <p className="text-sm text-muted-foreground">{category}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {distance && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {distance}
            </div>
          )}
          {openTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {openTime}
            </div>
          )}
          {price && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {price}
            </div>
          )}
        </div>
        
        {address && (
          <div className="text-xs text-muted-foreground">
            📍 {address}
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* 링크 버튼들 */}
        <div className="flex gap-2 pt-2">
          {mapUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.open(mapUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <MapPin className="w-3 h-3 mr-1" />
              지도보기
            </Button>
          )}
          {referenceUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.open(referenceUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              자세히보기
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}