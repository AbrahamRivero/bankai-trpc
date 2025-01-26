"use client";

import { useState } from "react";
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
import { useProductStore } from "@/store/useProductStore";

const sortOptions = [
  { value: "newest", name: "Más recientes", icon: ChevronsUpDown },
  { value: "price_asc", name: "Precio: Menor a Mayor", icon: ChevronsUpDown },
  { value: "price_desc", name: "Precio: Mayor a Menor", icon: ChevronsUpDown },
  { value: "name_asc", name: "Nombre: A-Z", icon: ChevronsUpDown },
  { value: "name_desc", name: "Nombre: Z-A", icon: ChevronsUpDown },
];

export function FilterSort() {
  const [open, setOpen] = useState(false);
  const { sort, setSort } = useProductStore();

  const handleSort = (value: string) => {
    setSort(
      value as
        | "price_asc"
        | "price_desc"
        | "name_asc"
        | "name_desc"
        | "newest"
        | null
    );
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
          {sort
            ? sortOptions.find((option) => option.value === sort)?.name
            : "Ordenar por..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar orden..." />
          <CommandList>
            <CommandEmpty>No se ha encontrado el criterio.</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSort(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      sort === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
