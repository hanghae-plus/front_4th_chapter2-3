import { useSetAtom } from "jotai"
import { isLoadingAtom } from "../../shared/model/store.ts"
import { postsAtom, totalAtom } from "./model/store.ts"
import { useURLParams } from "../../shared/hooks/useURLParams.ts"
import { usePostsWithUsers } from "./hooks/usePostsWithUsers.ts"

export default function usePosts() {
  const setLoading = useSetAtom(isLoadingAtom);
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  
  const {params
  } = useURLParams();
  
  const fetchPosts = async () => {
    const {limit, skip} = params;
    try {
      setLoading(true);
      const {posts, total} = usePostsWithUsers(limit, skip);
      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    fetchPosts
  }
}