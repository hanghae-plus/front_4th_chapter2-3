import { useEffect, useState } from "react";
import { useFetchPostsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { useInitializeSearchParams } from "@entities/search/model/useInitializeSearchParams.ts";
import { sortPost } from "@features/posts/lib/sortPost.ts";

/**
 * 게시물 상태 초기화 훅
 */
export function useInitializePostStore() {
  const { searchParams } = useInitializeSearchParams();
  const { setPosts, filters } = usePostStore();

  const queryParams = {
    searchQuery: searchParams.get("search"),
    tag: searchParams.get("tag"),
    skip: Number(searchParams.get("skip")),
    limit: Number(searchParams.get("limit")),
  };

  const { data: postResponse, isLoading: isLoadingPosts } = useFetchPostsQuery(queryParams);
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();

  const [isLoading, setIsLoading] = useState(isLoadingPosts || isLoadingUsers);

  useEffect(() => {
    console.log(postResponse, userResponse);
    if (!postResponse || !userResponse) return;

    const postFilters = {
      searchQuery: searchParams.get("search") || filters.searchQuery,
      selectedTag: searchParams.get("tag") || filters.selectedTag,
      sortBy: searchParams.get("sortBy") || filters.sortBy,
      sortOrder: (searchParams.get("sortOrder") || filters.sortOrder) as "asc" | "desc",
    };

    let enrichedPosts = sortPost(postResponse.posts, postFilters.sortBy, postFilters.sortOrder);

    enrichedPosts = enrichedPosts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    setPosts(enrichedPosts);
    setIsLoading(false);
  }, [searchParams, postResponse, userResponse]);

  return {
    isLoading: isLoading,
  };
}
