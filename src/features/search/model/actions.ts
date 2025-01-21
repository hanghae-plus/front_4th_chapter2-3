import { postsAtom, totalAtom } from "../../posts/model/store.ts"
import { isLoadingAtom } from "../../../shared/model/store.ts"
import { useAtom, useSetAtom } from "jotai"
import { searchQueryAtom } from "./store.ts"
import usePosts from "../../posts/model/actions.ts"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"

export default function useSearchActions() {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(isLoadingAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  
  const {fetchPosts} = usePosts();
  const { params, updateParams } = useURLParams();
  const searchPosts = async () => {
    if (!searchQuery) {
      await fetchPosts();
      return;
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }
  
  return {
    searchQuery,
    setSearchQuery,
    searchPosts
  }
}