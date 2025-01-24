import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentsApi } from "../commentsApi"
import { Comment } from "../../model/types"
import { commentsQueryKeys } from "./postQueryKeys"
import { Post } from "../../../post/model/types"

export const useLikeCommentMutation = (postId: Post["id"]) => {
  const queryClient = useQueryClient()
  const queryKey = commentsQueryKeys.lists(postId)

  return useMutation({
    mutationFn: (comment: Comment) => commentsApi.likeComment(comment),
    onMutate: async (prevComment) => {
      return { prevComment }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.prevComment)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
