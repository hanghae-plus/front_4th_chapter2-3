import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getCommentsQueryKeys } from "./useQueryGetComments"
import { addComment } from "../../api/addComment"

export const useMutationAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsQueryKeys["all"])
    },
    onError: (error) => {
      console.error("댓글 추가 오류:", error)
    },
  })
}
