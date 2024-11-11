"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, PackagePlus, ArrowUp01, ArrowDown10 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/lib/trpc";
import SortDropdown from "./sort-dropdown";

const sortOptions = [
  { name: "Nuevo", value: "newest", icon: PackagePlus },
  { name: "Precio: Menor a Mayor", value: "price_asc", icon: ArrowUp01 },
  { name: "Precio: Mayor a Menor", value: "price_desc", icon: ArrowDown10 },
];

const filters = [
  {
    id: "colors",
    name: "Color",
    options: [
      { value: "#ffffff", label: "White" },
      { value: "#000000", label: "Black" },
    ],
  },
  {
    id: "sizes",
    name: "Tallas",
    options: [
      {
        value: "XS",
        label: "XS",
      },
      {
        value: "S",
        label: "S",
      },
      {
        value: "M",
        label: "M",
      },
      {
        value: "L",
        label: "L",
      },
      {
        value: "XL",
        label: "XL",
      },
      {
        value: "XXL",
        label: "XXL",
      },
    ],
  },
];

const FilterHeading = () => {
  const { data } = trpc.getCategories.useQuery();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    filterId: string,
    value: string,
    checked: boolean | string
  ) => {
    const params = new URLSearchParams(searchParams);
    const currentFilters = params.getAll(filterId);

    if (checked) {
      params.append(filterId, value);
    } else {
      const newFilters = currentFilters.filter((filter) => filter !== value);
      params.delete(filterId);
      newFilters.forEach((filter) => params.append(filterId, filter));
    }

    router.push(`?${params.toString()}`);
  };

  const getFilterCount = (filterId: string) => {
    return searchParams.getAll(filterId).length;
  };

  return (
    <section aria-labelledby="filter-heading" className="border-t py-6">
      <h2 id="filter-heading" className="sr-only">
        Filtros
      </h2>

      <div className="flex items-center justify-between">
        <SortDropdown sortOptions={sortOptions} />

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
                    <div className="space-y-4">
                      {data?.map((option) => (
                        <div key={option.id} className="flex items-center">
                          <Checkbox
                            id={`filter-mobile-${option.id}-${option.name}`}
                            checked={searchParams
                              .getAll("category_id")
                              .includes(String(option.id))}
                            onCheckedChange={(checked: string | boolean) =>
                              handleFilterChange(
                                "category_id",
                                String(option.id),
                                checked
                              )
                            }
                          />
                          <label
                            htmlFor={`filter-mobile-${option.id}-${option.name}`}
                            className="ml-3 text-sm text-muted-foreground"
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                      <div className="space-y-4">
                        {section.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <Checkbox
                              id={`filter-mobile-${section.id}-${option.value}`}
                              checked={searchParams
                                .getAll(section.id)
                                .includes(option.value)}
                              onCheckedChange={(checked: string | boolean) =>
                                handleFilterChange(
                                  section.id,
                                  option.value,
                                  checked
                                )
                              }
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${option.value}`}
                              className="ml-3 text-sm text-muted-foreground"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden sm:block">
          <div className="flow-root">
            <div className="flex items-center divide-x divide-muted">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-base font-medium pl-4 pr-2"
                  >
                    Categorías
                    <ChevronDown className="ml-1 h-4 w-4" />
                    {getFilterCount("category_id") > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {getFilterCount("category_id")}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-4" align="start">
                  <div className="space-y-4">
                    {data?.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <Checkbox
                          id={`filter-${option.id}-${option.name}`}
                          checked={searchParams
                            .getAll("category_id")
                            .includes(String(option.id))}
                          onCheckedChange={(checked: string | boolean) =>
                            handleFilterChange(
                              "category_id",
                              String(option.id),
                              checked
                            )
                          }
                        />
                        <label
                          htmlFor={`filter-${option.id}-${option.name}`}
                          className="ml-3 text-sm font-medium"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              {filters.map((section) => (
                <Popover key={section.name}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-base font-medium pl-4 pr-2"
                    >
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
                    <div className="space-y-4">
                      {section.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <Checkbox
                            id={`filter-${section.id}-${option.value}`}
                            checked={searchParams
                              .getAll(section.id)
                              .includes(option.value)}
                            onCheckedChange={(checked: string | boolean) =>
                              handleFilterChange(
                                section.id,
                                option.value,
                                checked
                              )
                            }
                          />
                          <label
                            htmlFor={`filter-${section.id}-${option.value}`}
                            className="ml-3 text-sm font-medium"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterHeading;
