import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getPostsQueryKeys } from "../../../../entities/post/model/queries/useQueryGetPosts"
import { deletePost } from "../../api/deletePost"

export const useMutationDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(getPostsQueryKeys["all"])
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
