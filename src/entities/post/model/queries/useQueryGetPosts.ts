import { useQuery } from "@tanstack/react-query"

import { fetchUsernameAndImageOnly } from "../../../user/api/fetchUsernameAndImageOnly"
import { fetchPosts } from "../../api/fetchPosts"

import type { PostWithUser } from "../types/post"

export interface PostsResponse {
  posts: PostWithUser[]
  total: number
}

interface UseQueryGetPostsParams {
  limit: number
  skip: number
}

export const getPostsQueryKeys = {
  all: ["posts"],
  detail: (limit: number, skip: number) => ["posts", { limit, skip }],
}

export const useQueryGetPosts = ({ limit, skip }: UseQueryGetPostsParams) => {
  return useQuery({
    ...{ enabled: !!limit && !!skip },
    queryKey: getPostsQueryKeys.detail(limit, skip),
    queryFn: async () => fetcher(limit, skip),
  })
}

const fetcher = async (limit: number, skip: number): Promise<PostsResponse | undefined> => {
  try {
    const [postsData, usersData] = await Promise.all([fetchPosts(limit, skip), fetchUsernameAndImageOnly()])

    if (!postsData || !usersData) return

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    return {
      posts: postsWithUsers,
      total: postsData.total,
    }
  } catch (error) {
    console.error("게시물 가져오기 오류:", error)
  }
}
