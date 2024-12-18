import { useRouter, useSearchParams } from "next/navigation";

export const useFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filterId: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentFilters = params.getAll(filterId);

    if (currentFilters.includes(value)) {
      params.delete(filterId);
      currentFilters
        .filter((v) => v !== value)
        .forEach((v) => params.append(filterId, v));
    } else {
      params.append(filterId, value);
    }

    router.push(`?${params.toString()}`);
  };

  const getFilterCount = (filterId: string) => {
    return searchParams.getAll(filterId).length;
  };

  const isFilterSelected = (filterId: string, value: string) => {
    return searchParams.getAll(filterId).includes(value);
  };

  return { handleFilterChange, getFilterCount, isFilterSelected };
};
