import { usePostStore } from "@core/store/usePostStore.ts";
import { useSearchParams } from "react-router-dom";

export const usePostSearch = () => {
  const { filters, setFilters } = usePostStore();
  const [, setSearchParams] = useSearchParams();

  const _handleSearchPost = async (newSearchQuery: string) => {
    setSearchParams((params) => {
      params.set("search", newSearchQuery);
      return params;
    });
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchQuery: e.currentTarget.value });
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      await _handleSearchPost(e.currentTarget.value);
    }
  };

  return {
    handleSearchQueryChange,
    handleKeyPress,
  };
};
