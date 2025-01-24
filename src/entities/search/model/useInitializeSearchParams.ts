import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const useInitializeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = {
    searchQuery: searchParams.get("search"),
    tag: searchParams.get("tag"),
    skip: Number(searchParams.get("skip")),
    limit: Number(searchParams.get("limit")),
  };

  useEffect(() => {
    const defaultParams = {
      sortBy: "none",
      sortOrder: "desc",
      limit: "10",
      skip: "0",
    };

    setSearchParams((prev) => {
      prev.set("search", "");
      Object.entries(defaultParams).forEach(([key, value]) => {
        if (!prev.has(key)) prev.set(key, value);
      });
      return prev;
    });
  }, []);

  return { searchParams, queryParams, setSearchParams };
};
