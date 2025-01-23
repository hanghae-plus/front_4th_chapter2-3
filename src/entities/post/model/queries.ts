import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../api/postApi"
import { userApi } from "@/entities/user/api/userApi"
import { mapPostsWithUsers } from "../lib"
import { CreatePost, Post } from "./types"
import { QUERY_KEYS } from "@/shared/model"



export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.posts, { limit, skip }],
    queryFn: async () => {
      const [postsData, usersData] = await Promise.all([
        postApi.getPosts({ limit, skip }),
        userApi.getUsers({ limit: 0, select: "username,image" }),
      ])

      const posts = mapPostsWithUsers(postsData, usersData)

      return {
        posts,
        total: postsData.total,
      }
    },
  })
}

export const usePostAddMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: CreatePost) => postApi.postAddPost(newPost),
    onSuccess: (addedPost) => {
      queryClient.setQueryData<{ posts: Post[]; total: number }>(QUERY_KEYS.posts, (old) =>
        old
          ? {
              posts: [addedPost, ...old.posts],
              total: old.total + 1,
            }
          : undefined,
      )
    },
  })
}
