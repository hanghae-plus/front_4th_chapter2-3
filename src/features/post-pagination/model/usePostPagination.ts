import { usePaginationStore } from "@core/store/usePaginationStore.ts";
import { useSearchParams } from "react-router-dom";

export const usePostPagination = () => {
  const { setPagination } = usePaginationStore();
  const [, setSearchParams] = useSearchParams();

  const setLimit = (limit: number) => {
    setPagination({ limit });
    setSearchParams((params) => {
      params.set("limit", limit.toString());
      return params;
    });
  };

  const setSkip = (skip: number) => {
    setPagination({ skip });
    setSearchParams((params) => {
      params.set("skip", skip.toString());
      return params;
    });
  };

  const setTotal = (total: number) => {
    setPagination({ total });
  };

  return {
    setLimit,
    setSkip,
    setTotal,
  };
};
