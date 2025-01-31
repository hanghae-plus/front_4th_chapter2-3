import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@shared/config/QueryKeys"
import { Post } from "../model/types"
import { User } from "../../user/model/types"

export interface PostResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export const useGetPostList = (limit: number, skip: number) => {
  return useQuery<Omit<PostResponse, "skip" | "limit">>({
    queryKey: QUERY_KEYS.POST.getPostList(limit.toString(), skip.toString()),
    queryFn: async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`),
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
  })
}
