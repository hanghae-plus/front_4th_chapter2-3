import { queryOptions } from "@tanstack/react-query"
import { commentsApi } from "."
import { AddCommentRequest } from "../model/types"

export const commentQueries = {
  all: () => ["comments"] as const,
  byPost: (postId: number) => [...commentQueries.all(), "byPost", postId] as const,
  byPostQuery: (postId: number) =>
    queryOptions({
      queryKey: commentQueries.byPost(postId),
      queryFn: () => commentsApi.fetchComments(postId),
      enabled: !!postId,
    }),
}

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
