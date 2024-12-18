"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Combobox } from "@/components/ui/combobox";
import { sortOptions } from "./constants/filter-constants";

const FilterSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");

  const handleSort = (value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      params.set("sort", value[0]);
    } else {
      params.set("sort", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Combobox
      options={sortOptions.map((option) => ({
        label: option.name,
        value: option.value,
        icon: option.icon,
      }))}
      onValueChange={handleSort}
      value={currentSort || ""}
      placeholder="Ordenar"
    />
  );
};

export default FilterSort;
