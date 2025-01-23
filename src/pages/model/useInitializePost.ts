import { useEffect, useState } from "react";
import { useFetchPostsQuery, useFetchTagsQuery } from "@entities/post/api";
import { useFetchUsersQuery } from "@entities/user/api";
import { usePostStore } from "@core/store/usePostStore.ts";
import { usePaginationStore } from "@core/store/usePaginationStore.ts";
import { sortPost } from "@features/postFilter/lib";
import { useTagStore } from "@core/store/useTagStore.ts";
import { useInitializeSearchParams } from "@entities/search/model/useInitializeSearchParams.ts";

/**
 * 게시물 상태 초기화 훅
 */
export function useInitializePostStore() {
  const { searchParams } = useInitializeSearchParams();
  const { setPosts, setFilters, filters } = usePostStore();
  const { pagination, setPagination } = usePaginationStore();
  const { setTags } = useTagStore();

  const queryParams = {
    searchQuery: searchParams.get("search"),
    tag: searchParams.get("tag"),
    skip: Number(searchParams.get("skip")),
    limit: Number(searchParams.get("limit")),
  };

  const { data: postResponse, isLoading: isLoadingPosts } = useFetchPostsQuery(queryParams);
  const { data: userResponse, isLoading: isLoadingUsers } = useFetchUsersQuery();
  const { data: tagResponse, isLoading: isLoadingTags } = useFetchTagsQuery();

  const [isLoading, setIsLoading] = useState(isLoadingPosts || isLoadingUsers || isLoadingTags);

  useEffect(() => {
    console.log(postResponse, userResponse, tagResponse);
    if (!postResponse || !userResponse || !tagResponse) return;

    const postFilters = {
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
    let enrichedPosts = sortPost(postResponse.posts, postFilters.sortBy, postFilters.sortOrder);

    // 3. 게시물에 유저 정보 추가
    enrichedPosts = enrichedPosts.map((post) => ({
      ...post,
      author: userResponse.users.find((user) => user.id === post.userId),
    }));

    // 4. 필터, 페이지네이션, 게시물 등 상태 저장
    setTags(tagResponse);
    setFilters(postFilters);
    setPagination(postPagination);
    setPosts(enrichedPosts);
    setIsLoading(false);
  }, [postResponse, userResponse, searchParams]);

  return {
    isLoading: isLoading,
  };
}
