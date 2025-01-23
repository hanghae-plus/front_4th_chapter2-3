import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchPostsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";

/**
 * 게시물 상태 초기화 훅
 */
export function useInitializePostStore() {
  const [searchParams] = useSearchParams();
  const { data: postResponse, isLoading: isLoadingPosts, isFetching } = useFetchPostsQuery();
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();
  const [isLoading, setIsLoading] = useState(isLoadingPosts || isLoadingUsers);
  const { setPosts, setFilters } = usePostStore();

  console.log("loading", isFetching, postResponse);

  useEffect(() => {
    if (!postResponse || !userResponse) return;

    // 1. 게시물에 유저 정보 추가
    const enrichedPosts = postResponse.posts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    // 2. URL 파라미터에서 필터 가져오기
    const urlFilters = {
      searchQuery: searchParams.get("search") || "",
      selectedTag: searchParams.get("tag") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: (searchParams.get("sortOrder") || "asc") as "asc" | "desc",
      skip: Number(searchParams.get("skip")) || 0,
      limit: Number(searchParams.get("limit")) || 10,
    };

    // 3. 필터 적용 후 게시물 저장
    setFilters(urlFilters);
    setPosts(enrichedPosts);
    setIsLoading(false);
  }, [postResponse, userResponse, searchParams]);

  return {
    isLoading: isLoading,
  };
}
