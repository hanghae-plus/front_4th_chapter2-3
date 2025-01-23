import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addPost } from "../../../../entities/post/api/addPost"
import { getPostsQueryKeys } from "../../../../entities/post/model/queries/useQueryGetPosts"

export const useMutationAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(getPostsQueryKeys["all"])
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}
