import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { GoogleMap } from "./GoogleMap";
import { Button } from "./ui/button";
import { X, Navigation, ExternalLink } from "lucide-react";

interface Place {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: string;
  price?: string;
  rating: number;
  openTime?: string;
  tags: string[];
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: Place | null;
}

export function MapModal({ isOpen, onClose, place }: MapModalProps) {
  if (!place) return null;

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const handleGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{place.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {place.category} • 지도에서 위치를 확인하고 길찾기를 이용하세요
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDirections}
                className="flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                길찾기
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoogleMaps}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                구글맵
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6">
          <div className="h-full rounded-lg overflow-hidden">
            <GoogleMap
              restaurants={[{
                id: place.id,
                title: place.title,
                lat: place.lat,
                lng: place.lng,
                category: place.category,
                price: place.price || '',
                rating: place.rating,
                openTime: place.openTime || '',
                tags: place.tags
              }]}
              onRestaurantSelect={(selectedPlace) => {
                console.log('Selected place:', selectedPlace);
              }}
              className="h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
