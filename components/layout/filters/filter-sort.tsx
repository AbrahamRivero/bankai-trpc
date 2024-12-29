"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sortOptions } from "./constants/filter-constants";

export function FilterSort() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Si ya existe un sort, lo reemplazamos
    if (currentSort?.length) {
      params.delete("sort");
    }

    // Añadir el nuevo valor de ordenamiento
    params.append("sort", value);

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentSort
            ? sortOptions.find((option) => option.value === currentSort)?.name
            : "Ordenar por..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Ordenar por..." />
          <CommandList>
            <CommandEmpty>
              No se ha encontrado ese criterio de ordenamiento.
            </CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSort(option.value)}
                >
                  <option.icon className="mr-2 w-4 h-4" />
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentSort === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
