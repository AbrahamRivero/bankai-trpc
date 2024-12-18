import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { useFilter } from "@/hooks/use-filter";

export const FilterPopover = ({ section }) => {
  const { handleFilterChange, getFilterCount, isFilterSelected } = useFilter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-base font-medium pl-4 pr-2">
          {section.name}
          <ChevronDown className="ml-1 h-4 w-4" />
          {getFilterCount(section.id) > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getFilterCount(section.id)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4" align="start">
        <Combobox
          options={section.options}
          onValueChange={(value) => handleFilterChange(section.id, value)}
          value={section.options
            .filter((option) => isFilterSelected(section.id, option.value))
            .map((option) => option.value)}
        />
      </PopoverContent>
    </Popover>
  );
};
