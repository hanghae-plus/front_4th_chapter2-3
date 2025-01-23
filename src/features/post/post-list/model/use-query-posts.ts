import { fetchPostsWithUsers, Post, postKeys } from "@/entities/posts"
import { useSearchParams } from "@/shared/hooks/use-search-params"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface PostsResponse {
  posts: Post[]
  total: number
}

function useQueryPosts() {
  const { getParam } = useSearchParams()
  const limit = Number(getParam("limit") || "10")
  const skip = Number(getParam("skip") || "0")
  const searchQuery = getParam("search") || ""
  const sortBy = getParam("sortBy") || ""
  const sortOrder = getParam("sortOrder") || "asc"
  const tag = getParam("tag") || ""

  const { data, isLoading, refetch } = useQuery<PostsResponse>({
    queryKey: postKeys.all,
    queryFn: () => fetchPostsWithUsers({ limit, skip, searchQuery, sortBy, sortOrder, tag }),
  })

  useEffect(() => {
    refetch()
  }, [tag, searchQuery, sortBy, sortOrder, refetch, limit, skip])

  return { data, isLoading, refetch, searchQuery }
}

export { useQueryPosts }
