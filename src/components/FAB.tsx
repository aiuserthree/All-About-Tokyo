import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
      size="icon"
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground" />
    </Button>
  );
}