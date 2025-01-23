import { useQuery } from "@tanstack/react-query"

import { fetchTag } from "../../../tag/api/fetchTag"
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
  tag?: string
}

export const getPostsQueryKeys = {
  all: ["posts"],
  detail: (limit: number, skip: number, tag?: string) => ["posts", { limit, skip, tag }],
}

export const useQueryGetPosts = ({ limit, skip, tag = "all" }: UseQueryGetPostsParams) => {
  return useQuery({
    queryKey: getPostsQueryKeys.detail(limit, skip, tag),
    queryFn: async () => fetcher(limit, skip, tag),
  })
}

const fetcher = async (limit: number, skip: number, tag: string = "all"): Promise<PostsResponse | undefined> => {
  try {
    const fetchPostsFunc = tag === "all" ? fetchPosts : () => fetchTag(tag)

    const [postsData, usersData] = await Promise.all([fetchPostsFunc(limit, skip), fetchUsernameAndImageOnly()])

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
