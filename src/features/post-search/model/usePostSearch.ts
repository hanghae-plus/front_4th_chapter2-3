import { useCallback, useState } from "react";
import { searchPosts } from "@features/post-search/api/searchPosts.ts";
import { usePost } from "@entities/post/model/usePost.ts";

export const usePostSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { updatePosts } = usePost();

  const _handleSearchPost = useCallback(async () => {
    const { posts } = await searchPosts(searchQuery);
    console.log("posts", posts);
    updatePosts(() => [...posts]);
  }, [searchQuery, updatePosts]);

  const handleSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  const handleKeyPress = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await _handleSearchPost();
      }
    },
    [_handleSearchPost],
  );

  return {
    searchQuery,
    handleSearchQueryChange,
    handleKeyPress,
  };
};
