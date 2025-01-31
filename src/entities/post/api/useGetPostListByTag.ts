import { useQuery } from "@tanstack/react-query"
import { PostResponse, UserResponse } from "./useGetPostList"
import { QUERY_KEYS } from "@shared/config/QueryKeys"

export const useGetPostListByTag = (tag: string) => {
  return useQuery<Omit<PostResponse, "skip" | "limit">>({
    queryKey: QUERY_KEYS.POST.getPostList(tag),
    queryFn: async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      const postsData: PostResponse = await postsResponse.json()
      const usersData: UserResponse = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    enabled: !!tag && tag !== "all",
  })
}
