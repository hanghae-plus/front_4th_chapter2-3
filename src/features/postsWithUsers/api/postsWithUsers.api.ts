import { useMemo } from "react"
import { usePostsQuery } from "@entities/post/api"
import { useUsersQuery } from "@entities/user/api"

import type { PostsWithUsersQueryResponse } from "@features/postsWithUsers/model"

export const usePostsWithUsersQuery = ({
  limit,
  skip,
}: {
  limit: number
  skip: number
}): PostsWithUsersQueryResponse => {
  const { data: posts, isLoading: isPostsLoading, error: postsError } = usePostsQuery({ limit, skip })
  const { data: users, isLoading: isUsersLoading, error: usersError } = useUsersQuery()

  const isLoading = isPostsLoading || isUsersLoading
  const error = postsError || usersError

  const postsWithUsers = useMemo(() => {
    if (!posts || !users) return undefined

    return posts?.posts?.map((post) => ({
      ...post,
      author: users?.users.find((user) => user.id === post.userId),
    }))
  }, [posts, users])

  if (!posts || !users) return { postsResponse: undefined, isLoading, error }

  return {
    postsResponse: { posts: postsWithUsers, skip: posts.skip, total: posts.total, limit: posts.limit },
    isLoading,
    error,
  }
}
