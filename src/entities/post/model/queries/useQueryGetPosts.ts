import { useQuery } from "@tanstack/react-query"

import type { User } from "../../../user/model/types/user"
import type { PostWithUser } from "../types/post"

export interface PostsResponse {
  posts: PostWithUser[]
  total: number
}

export interface UsersResponse {
  users: User[]
}

interface UseQueryGetPostsParams {
  limit: number
  skip: number
}

const getPostsQueryKeys = {
  all: ["posts"],
  detail: (limit: number, skip: number) => ["posts", { limit, skip }],
}

export const useQueryGetPosts = ({ limit, skip }: UseQueryGetPostsParams) => {
  return useQuery({
    queryKey: getPostsQueryKeys.detail(limit, skip),
    queryFn: async () => {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts?limit=${limit}&skip=${skip}`).then((res) => res.json() as Promise<PostsResponse>),
        fetch("/api/users?limit=0&select=username,image").then((res) => res.json() as Promise<UsersResponse>),
      ])

      const postsWithUsers = postsResponse.posts.map((post) => ({
        ...post,
        author: usersResponse.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsResponse.total,
      }
    },
  })
}
