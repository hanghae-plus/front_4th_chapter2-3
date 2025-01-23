import { useMutation, useQueryClient } from "@tanstack/react-query"

import { getCommentsQueryKeys } from "./useQueryGetComments"
import { updateComment } from "../../api/updateComment"

export const useMutationUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCommentsQueryKeys["all"])
    },
    onError: (error) => {
      console.error("댓글 업데이트 오류:", error)
    },
  })
}
