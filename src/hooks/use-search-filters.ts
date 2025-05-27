import { useEffect, useState } from "react";

export function useSearchFilters<T extends object>({
  initialFilters,
  onBeforeFiltersChange,
}: {
  initialFilters: T;
  onBeforeFiltersChange?: (filters: T) => Record<string, any> | null;
}) {
  const [filters, setFilters] = useState<T>(initialFilters);

  useEffect(() => {
    onBeforeFiltersChange?.(filters);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  return { filters, setFilters, handlePageChange, handleLimitChange };
}
