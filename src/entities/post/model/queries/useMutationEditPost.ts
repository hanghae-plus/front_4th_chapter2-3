import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updatePost } from "../../../../entities/post/api/updatePost"
import { getPostsQueryKeys } from "../../../../entities/post/model/queries/useQueryGetPosts"

export const useMutationUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(getPostsQueryKeys["all"])
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}
