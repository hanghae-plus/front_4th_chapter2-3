import { useAtomValue, useSetAtom } from "jotai"
import { isLoadingAtom } from "../../../shared/model/store.ts"
import { postsAtom, totalAtom } from "./postsStore.ts"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"
import { getPostsWithUsers } from "../api/getPostsWithUsers.ts"
import { sortByAtom, sortOrderAtom } from "../../sort/model/sortStores.ts"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchQueryAtom } from "../../search/model/searchQueryStore.ts"
import { selectedTagAtom, useTagsQuery } from "../../tag/model/tagStores.ts"
import { limitAtom, skipAtom } from "../../../modules/search/model/store.ts"
import { buildUrlParams } from "../lib/buildUrlParams.ts"

export default function usePostsQuery() {
  const {params } = useURLParams();
  
  // tanStackQuery 초기값
  const DEFAULT_QUERY_RESULT = {
    total: 0,
    posts: [],
    limit: 10,
    skip: 0,
  }
  // 일반 게시물 쿼리
  const {
    data: { posts, total } = DEFAULT_QUERY_RESULT,
  } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => {
        return getPostsWithUsers(params);
    },
    refetchInterval: 60000,
  });
  
  return {
    posts,
    total,
  }
}