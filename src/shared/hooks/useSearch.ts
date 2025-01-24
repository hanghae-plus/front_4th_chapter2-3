import { useState, useMemo } from "react";

export function useSearch<T>(items: T[], filterKey: keyof T) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      String(item[filterKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm, filterKey]);

  return { searchTerm, setSearchTerm, filteredPosts: filteredItems };
}