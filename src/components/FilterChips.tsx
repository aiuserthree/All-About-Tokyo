import { Badge } from "./ui/badge";

interface FilterChipsProps {
  filters: string[];
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
}

export function FilterChips({ filters, selectedFilters, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {filters.map((filter) => {
        const isSelected = selectedFilters.includes(filter);
        return (
          <Badge
            key={filter}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              isSelected 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-secondary/20"
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Badge>
        );
      })}
    </div>
  );
}