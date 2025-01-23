import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const useInitializeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const defaultParams = {
      sortOrder: "desc",
      limit: "10",
      skip: "0",
    };

    setSearchParams((prev) => {
      Object.entries(defaultParams).forEach(([key, value]) => {
        if (!prev.has(key)) prev.set(key, value);
      });
      return prev;
    });
  }, []);

  return { searchParams, setSearchParams };
};
