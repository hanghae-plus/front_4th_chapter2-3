import { useSetAtom } from "jotai"
import { isLoadingAtom } from "../../../shared/model/store.ts"
import { postsAtom, totalAtom, usersQuery } from "./store.ts"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"
import { usePostsWithUsers } from "../hooks/usePostsWithUsers.ts"
import { usePostsWithTag } from "../hooks/usePostsWithTag.ts"

export default function usePosts() {
  const setLoading = useSetAtom(isLoadingAtom);
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  
  const {params
  } = useURLParams();
  
  const fetchPosts = async () => {
    const {limit, skip} = params;
    console.log("파람", params)
    try {
      setLoading(true);
      const {posts, total} = await usePostsWithUsers(limit, skip);
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