import { useMutation } from "@tanstack/react-query"
import { NewComment } from "../../../entities/comment/model/types"
import axios, { AxiosResponse } from "axios"
import { useCallback, useState } from "react"
import { Comment } from "../../../entities/comment/model/types"

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
  const addComment = (comment: NewComment) =>
    axios
      .post<NewComment, AxiosResponse<Comment>>("/api/comments/add", {
        ...comment,
      })
      .then((response) => {
        return response.data
      })

  const mutation = useMutation({
    mutationFn: addComment,
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
