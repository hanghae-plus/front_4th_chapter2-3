import { useEffect } from "react"
import { useUrlParams } from "@shared/lib/hooks"
import { usePostStore } from "@features/post/model/stores"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

export const usePostManager = () => {
  const store = usePostStore()
  const { handleUpdateUrl } = useUrlParams()

  // 태그 쿼리
  useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      await store.fetchTags()
      return store.tags
    },
    staleTime: 5 * 60 * 1000,
  })

  // 게시물 쿼리
  const { isFetching } = useQuery({
    queryKey: [
      "posts",
      {
        skip: store.skip,
        limit: store.limit,
        sortBy: store.sortBy,
        sortOrder: store.sortOrder,
        selectedTag: store.selectedTag,
      },
    ],
    queryFn: async () => {
      if (store.selectedTag) {
        await store.fetchPostsByTag(store.selectedTag)
      } else {
        await store.fetchPosts()
      }
      return store.posts
    },
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    handleUpdateUrl()
  }, [store.skip, store.limit, store.sortBy, store.sortOrder, store.selectedTag])

  return {
    ...store,
    isFetching,
    updateURL: handleUpdateUrl,
  }
}
