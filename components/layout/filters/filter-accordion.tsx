import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Combobox } from "@/components/ui/combobox";
import { useFilter } from "@/hooks/use-filter";
import { filters } from "./constants/filter-constants";

export const FilterAccordion = ({ isCategoriesPage, categories }) => {
  const { handleFilterChange, getFilterCount, isFilterSelected } = useFilter();

  return (
    <>
      {!isCategoriesPage && (
        <Accordion type="single" collapsible>
          <AccordionItem value="category_id">
            <AccordionTrigger>
              Categorías
              {getFilterCount("category_id") > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getFilterCount("category_id")}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <Combobox
                options={categories.map((category) => ({
                  label: category.name,
                  value: String(category.id),
                }))}
                onValueChange={(value) =>
                  handleFilterChange("category_id", value)
                }
                value={categories
                  .filter((category) =>
                    isFilterSelected("category_id", String(category.id))
                  )
                  .map((category) => String(category.id))}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {filters.map((section) => (
        <Accordion type="single" collapsible key={section.name}>
          <AccordionItem value={section.id}>
            <AccordionTrigger>
              {section.name}
              {getFilterCount(section.id) > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getFilterCount(section.id)}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <Combobox
                options={section.options}
                onValueChange={(value) => handleFilterChange(section.id, value)}
                value={section.options
                  .filter((option) =>
                    isFilterSelected(section.id, option.value)
                  )
                  .map((option) => option.value)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};
