import { usePostStore } from "@core/store/usePostStore.ts";
import { useSearchParams } from "react-router-dom";

export const usePostFilter = () => {
  const { filters, setFilters } = usePostStore();
  const [, setSearchParams] = useSearchParams();

  // 태그를 기준으로 필터링
  const handleTagSelect = (tag: string) => {
    setFilters({ ...filters, selectedTag: tag });
    setSearchParams((params) => {
      params.set("tag", tag);
      return params;
    });
  };

  // 정렬 기준 변경
  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    console.log("new", sortBy, sortOrder);
    setFilters({ ...filters, sortBy, sortOrder });
    setSearchParams((params) => {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
      return params;
    });
  };

  return {
    handleTagSelect,
    handleSortChange,
  };
};
