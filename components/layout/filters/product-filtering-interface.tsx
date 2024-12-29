"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronDown, Filter, LayoutGrid } from "lucide-react";
import { FilterSort } from "./filter-sort";
import { trpc } from "@/lib/trpc";
import { useRouter, useSearchParams } from "next/navigation";
import { filters } from "./constants/filter-constants";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

export default function ProductFilteringInterface({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data } = trpc.getCategoriesByType.useQuery({ type: "product" });

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    filterId: string,
    value: string,
    checked: boolean | string
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentFilters = params.getAll(filterId);

    if (checked) {
      params.append(filterId, value);
    } else {
      params.delete(filterId);
      currentFilters
        .filter((v) => v !== value)
        .forEach((v) => params.append(filterId, v));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-background">
      <div>
        {/* Mobile filter dialog */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md flex flex-col"
          >
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Aplica filtros para refinar la búsqueda de los productos.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="category_id">
                    <AccordionTrigger>Categorías</AccordionTrigger>
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
                              className="ml-3 text-sm font-medium"
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
                  <Accordion type="single" collapsible key={section.id}>
                    <AccordionItem value={section.id}>
                      <AccordionTrigger>{section.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`filter-mobile-${section.id}-${optionIdx}`}
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
                              <Label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm font-medium"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 items-baseline justify-between border-b border-border pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Productos
            </h1>

            <div className="flex flex-row items-center sm:w-auto w-full justify-end">
              <FilterSort />

              <Button
                variant="ghost"
                size="icon"
                className="ml-4 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filtros</span>
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-16 pt-6">
            <h2 id="products-heading" className="sr-only">
              Productos
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <Accordion type="single" collapsible>
                  <AccordionItem value="category_id">
                    <AccordionTrigger>Categorías</AccordionTrigger>
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
                              className="ml-3 text-sm font-medium"
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
                  <Accordion type="single" collapsible key={section.id}>
                    <AccordionItem value={section.id}>
                      <AccordionTrigger>{section.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`filter-${section.id}-${optionIdx}`}
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
                              <Label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm font-medium"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
