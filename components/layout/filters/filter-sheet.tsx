import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterAccordion } from "./filter-accordion";

export const FilterSheet = ({ isCategoriesPage, categories }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="sm:hidden">
        Filtros
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-full max-w-xs">
      <SheetHeader>
        <SheetTitle className="text-lg font-medium">Filters</SheetTitle>
      </SheetHeader>
      <div className="mt-4">
        <FilterAccordion
          isCategoriesPage={isCategoriesPage}
          categories={categories}
        />
      </div>
    </SheetContent>
  </Sheet>
);
