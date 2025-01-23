import { postsAtom, totalAtom } from "../../posts/model/postsStore.ts"
import { isLoadingAtom } from "../../../shared/model/store.ts"
import { useAtom, useSetAtom } from "jotai"
import { searchQueryAtom } from "./searchQueryStore.ts"
import usePosts from "../../posts/model/usePostsQuery.ts"
import { useURLParams } from "../../../shared/hooks/useURLParams.ts"

export default function useSearchActions() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  
  return {
    searchQuery,
    setSearchQuery,
  }
}