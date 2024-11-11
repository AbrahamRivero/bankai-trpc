"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({
  sortOptions,
}: {
  sortOptions: {
    name: string;
    value: string;
    icon: any;
  }[];
}) => {
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
  };

  const currentSortOption = sortOptions.find(
    (option) => option.value === currentSort
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-base font-medium">
          {currentSortOption ? (
            <p>{currentSortOption.name}</p>
          ) : (
            <>
              Ordenar
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onSelect={() => handleSort(option.value)}
            className={option.value === currentSort ? "bg-gray-200" : ""}
          >
            <option.icon className="w-4 h-4" />
            <p className="block px-4 py-2 text-sm">{option.name}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
