import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "@core/store/useSearchStore.ts";

export const usePostSearch = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [, setSearchParams] = useSearchParams();

  const _handleSearchPost = async (newSearchQuery: string) => {
    setSearchParams((params) => {
      params.set("search", newSearchQuery);
      return params;
    });
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      await _handleSearchPost(e.currentTarget.value);
    }
  };

  return {
    searchQuery,
    handleSearchQueryChange,
    handleKeyPress,
  };
};
