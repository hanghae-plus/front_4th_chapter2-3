import { useMutation } from "@tanstack/react-query"
import { NewComment } from "../../../entities/comment/model/types"
import { useCallback, useState } from "react"
import { Comment } from "../../../entities/comment/model/types"
import { addCommentApi } from "../../../entities/comment/api/addComment.api"

interface Props {
  onSuccess?: (responseComment: Comment) => void
  fallback?: () => void
}

const useAddComment = ({ onSuccess, fallback }: Props) => {
  const [newComment, setNewComment] = useState<NewComment>({
    postId: null,
    body: "",
    userId: 1,
  })

  const mutation = useMutation({
    mutationFn: addCommentApi,
    onSuccess: (responseComment) => {
      if (onSuccess) onSuccess(responseComment)
    },
    onSettled: () => {
      setNewComment({ postId: null, body: "", userId: 1 })
      if (fallback) fallback()
    },
  })

  const handleAddComment = useCallback(() => {
    mutation.mutate(newComment)
  }, [newComment, mutation])

  return {
    newComment,
    setNewComment,
    handleAddComment,
  }
}

export { useAddComment }
