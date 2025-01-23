import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchPostsByTagQuery, useFetchPostsQuery, useFetchTagsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { usePaginationStore } from "@core/store/usePaginationStore.ts";
import { filterPostByTag, sortPost } from "@features/postFilter/lib";
import { useTagStore } from "@core/store/useTagStore.ts";

/**
 * 게시물 상태 초기화 훅
 */
export function useInitializePostStore() {
  const [searchParams] = useSearchParams();
  const { setPosts, setFilters, filters } = usePostStore();
  const { pagination, setPagination } = usePaginationStore();
  const { setTags } = useTagStore();

  const postByTagQuery = useFetchPostsByTagQuery(filters.selectedTag, pagination.limit, pagination.skip);
  const postQuery = useFetchPostsQuery(pagination.limit, pagination.skip);
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();
  const { data: tagResponse, isLoading: isLoadingTags } = useFetchTagsQuery();

  const postResponse = filters.selectedTag ? postByTagQuery.data : postQuery.data;
  const isLoadingPosts = filters.selectedTag ? postByTagQuery.isLoading : postQuery.isLoading;
  const [isLoading, setIsLoading] = useState(isLoadingPosts || isLoadingUsers || isLoadingTags);

  useEffect(() => {
    if (!postResponse || !userResponse || !tagResponse) return;

    // 1. URL 파라미터에서 필터 가져오기
    const urlFilters = {
      searchQuery: searchParams.get("search") || filters.searchQuery,
      selectedTag: searchParams.get("tag") || filters.selectedTag,
      sortBy: searchParams.get("sortBy") || filters.sortBy,
      sortOrder: (searchParams.get("sortOrder") || filters.sortOrder) as "asc" | "desc",
    };

    const postPagination = {
      total: postResponse.total,
      skip: Number(searchParams.get("skip")) || pagination.skip,
      limit: Number(searchParams.get("limit")) || pagination.limit,
    };

    // 2. 게시물 정렬 및 필터링
    let enrichedPosts = sortPost(postResponse.posts, urlFilters.sortBy, urlFilters.sortOrder);

    // 3. 게시물에 유저 정보 추가
    enrichedPosts = enrichedPosts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    // 4. 필터, 페이지네이션, 게시물 등 상태 저장
    setTags(tagResponse);
    setFilters(urlFilters);
    setPagination(postPagination);
    setPosts(enrichedPosts);
    setIsLoading(false);
  }, [postResponse, userResponse, searchParams]);

  return {
    isLoading: isLoading,
  };
}
