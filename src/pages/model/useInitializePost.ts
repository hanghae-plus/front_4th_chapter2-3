import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchPostsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { usePaginationStore } from "@core/store/usePaginationStore.ts";
import { filterPostByTag, sortPost } from "@features/postFilter/lib";

/**
 * 게시물 상태 초기화 훅
 */
export function useInitializePostStore() {
  const [searchParams] = useSearchParams();
  const { setPosts, setFilters } = usePostStore();
  const { pagination, setPagination } = usePaginationStore();
  const { data: postResponse, isLoading: isLoadingPosts } = useFetchPostsQuery(pagination.limit, pagination.skip);
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();
  const [isLoading, setIsLoading] = useState(isLoadingPosts || isLoadingUsers);

  useEffect(() => {
    if (!postResponse || !userResponse) return;

    // 1. URL 파라미터에서 필터 가져오기
    const urlFilters = {
      searchQuery: searchParams.get("search") || "",
      selectedTag: searchParams.get("tag") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: (searchParams.get("sortOrder") || "asc") as "asc" | "desc",
    };

    const pagination = {
      total: postResponse.total,
      skip: Number(searchParams.get("skip")) || 0,
      limit: Number(searchParams.get("limit")) || 10,
    };

    // 2. 게시물 정렬 및 필터링
    let enrichedPosts = sortPost(postResponse.posts, urlFilters.sortBy, urlFilters.sortOrder);

    if (urlFilters.selectedTag) {
      enrichedPosts = filterPostByTag(enrichedPosts, urlFilters.selectedTag);
    }

    // 3. 게시물에 유저 정보 추가
    enrichedPosts = enrichedPosts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    // 4. 필터, 페이지네이션, 게시물 등 상태 저장
    setFilters(urlFilters);
    setPagination(pagination);
    setPosts(enrichedPosts);
    setIsLoading(false);
  }, [postResponse, userResponse, searchParams]);

  return {
    isLoading: isLoading,
  };
}
