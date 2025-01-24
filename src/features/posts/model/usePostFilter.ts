import { useSearchParams } from "react-router-dom";

export const usePostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    selectedTag: searchParams.get("tag") || "",
    sortBy: searchParams.get("sortBy") || "date",
    sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
  };

  // 태그를 기준으로 필터링
  const handleTagSelect = (tag: string) => {
    setSearchParams((params) => {
      params.set("tag", tag);
      return params;
    });
  };

  // 정렬 기준 변경
  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    setSearchParams((params) => {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
      return params;
    });
  };

  return {
    filters,
    handleTagSelect,
    handleSortChange,
  };
};
