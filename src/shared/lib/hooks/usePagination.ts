import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  total?: number;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  total = 0
}: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(total / pageSize);

  const nextPage = useCallback(() => {
    setPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(prev - 1, 1));
  }, []);

  const setPageSizeWithReset = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  return {
    page,
    setPage,
    pageSize,
    setPageSize: setPageSizeWithReset,
    nextPage,
    prevPage,
    totalPages,
    isFirstPage: page === 1,
    isLastPage: page === totalPages,
  };
};