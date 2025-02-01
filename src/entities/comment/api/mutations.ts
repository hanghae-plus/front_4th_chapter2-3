import { commentsApi } from "./api"
import { AddCommentRequest } from "../model"
import { commentQueries } from "./queries"

export const commentMutations = {
  addMutation: () => ({
    mutationKey: [...commentQueries.all(), "add"] as const,
    mutationFn: (comment: AddCommentRequest) => commentsApi.addComment(comment),
  }),

  updateMutation: () => ({
    mutationKey: [...commentQueries.all(), "update"] as const,
    mutationFn: ({ id, body }: { id: number; body: string }) => commentsApi.updateComment(id, body),
  }),

  deleteMutation: () => ({
    mutationKey: [...commentQueries.all(), "delete"] as const,
    mutationFn: (id: number) => commentsApi.deleteComment(id),
  }),

  likeMutation: () => ({
    mutationKey: [...commentQueries.all(), "like"] as const,
    mutationFn: ({ id, likes }: { id: number; likes: number }) => commentsApi.likeComment(id, likes),
  }),
}
