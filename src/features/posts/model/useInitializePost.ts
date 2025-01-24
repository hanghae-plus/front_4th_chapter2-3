import { useEffect } from "react";
import { useFetchPostsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { useInitializeSearchParams } from "@entities/search/model/useInitializeSearchParams.ts";
import { sortPost } from "@features/posts/lib/sortPost.ts";

/**
 *  SearchParams 따라 동적으로 post fetching 훅
 */
export function useQueryPost() {
  const { searchParams, queryParams } = useInitializeSearchParams();
  const { setPosts } = usePostStore();

  const { data: postResponse, isLoading: isLoadingPosts } = useFetchPostsQuery(queryParams);
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();

  useEffect(() => {
    if (!postResponse || !userResponse) return;

    let enrichedPosts = sortPost(
      postResponse.posts,
      searchParams.get("sortBy") || "none",
      (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
    );

    enrichedPosts = enrichedPosts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    setPosts(enrichedPosts);
  }, [searchParams, postResponse, userResponse]);

  return {
    isLoading: isLoadingPosts || isLoadingUsers,
  };
}
