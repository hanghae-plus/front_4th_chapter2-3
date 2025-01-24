import { useMutation } from "@tanstack/react-query"
import { updateCommentApi } from "../../../entities/comment/api/updateComment.api"
import { Comment } from "../../../entities/comment/model/types"

interface Props {
  onSuccess?: (responseComment: Comment) => void
  onError?: (error: Error) => void
  fallback?: () => void
}

const useUpdateComment = ({ onSuccess, onError, fallback }: Props) => {
  const { data, mutate } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (comment) => {
      if (onSuccess) onSuccess(comment)
    },
    onSettled: () => {
      if (fallback) fallback()
    },
    onError: (error) => {
      if (onError) onError(error)
    },
  })

  return { updateComment: mutate, data }
}

export { useUpdateComment }
