import { useEffect } from "react";
import { filterPostByTag, sortPost } from "@features/postFilter/lib";
import { usePostStore } from "@core/store/usePostStore.ts";

export const usePostFilter = () => {
  const { posts, setPosts, filters, setFilters } = usePostStore();

  useEffect(() => {
    let filteredList = [...posts];

    filteredList = sortPost(filteredList, filters.sortBy, filters.sortOrder);

    if (filters.selectedTag) {
      filteredList = filterPostByTag(filteredList, filters.selectedTag);
    }

    setPosts(filteredList);
  }, [filters.selectedTag, filters.sortBy, filters.sortOrder]);

  // 태그를 기준으로 필터링
  const handleTagSelect = (tag: string) => {
    setFilters({ ...filters, selectedTag: tag });
  };

  // 정렬 기준 변경
  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    console.log("new", sortBy, sortOrder);
    setFilters({ ...filters, sortBy, sortOrder });
  };

  return {
    handleTagSelect,
    handleSortChange,
  };
};
