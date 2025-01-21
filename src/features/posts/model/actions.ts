import { useAtomValue, useSetAtom } from "jotai"
import { isLoadingAtom } from "../../../shared/model/store.ts"
import { postsAtom, totalAtom } from "./store.ts"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"
import { usePostsWithUsers } from "../hooks/usePostsWithUsers.ts"
import { usePostsWithTag } from "../hooks/usePostsWithTag.ts"
import { sortByAtom, sortOrderAtom } from "../../sort/model/store.ts"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function usePosts() {
  const setLoading = useSetAtom(isLoadingAtom);
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const queryClient = useQueryClient();
  const {params
  } = useURLParams();
  
  // tanStackQuery
  // const DEFAULT_QUERY_RESULT = {
  //   total: 0,
  //   posts: [],
  //   limit: 10,
  //   skip: 0,
  // }
  // // 일반 게시물 쿼리
  // const {
  //   data: { posts, total } = DEFAULT_QUERY_RESULT,
  //   isLoading,
  //   error
  // } = useQuery({
  //   queryKey: ['posts', params.limit, params.skip, sortBy, sortOrder],
  //   queryFn: () => usePostsWithUsers(params.limit, params.skip, sortBy, sortOrder),
  //   refetchInterval: 1000 * 60,
  // });
  //
  // // 태그별 게시물 쿼리
  // const getPostsByTag = useQuery({
  //   queryKey: ['posts', 'tag'],
  //   queryFn: ({ queryKey }) => usePostsWithTag(queryKey[2]),
  //   enabled: false // 처음에는 실행하지 않음
  // });
  //
  // // 태그 변경시 사용할 함수
  // const fetchPostsByTag = async (tag: string) => {
  //   if (!tag || tag === "all") {
  //     // 전체 게시물 쿼리 갱신
  //     await queryClient.invalidateQueries({ queryKey: ['posts'] });
  //     return;
  //   }
  //   // 태그별 쿼리 실행
  //   await getPostsByTag.refetch({ queryKey: ['posts', 'tag', tag] });
  // };
  //
  // return {
  //   posts,
  //   total,
  //   fetchPostsByTag
  // }
  
  const fetchPosts = async () => {
    const {limit, skip} = params;
    try {
      setLoading(true);
      const {posts, total} = await usePostsWithUsers(limit, skip, sortBy, sortOrder);
      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchPostsByTag = async (tag : any) => {
    if (!tag || tag === "all") {
      await fetchPosts()
      return
    }
    setLoading(true)
    try {
      const {posts, total} = await usePostsWithTag(tag);
      setPosts(posts)
      setTotal(total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }
  return {
    fetchPosts,
    fetchPostsByTag,
  }
}