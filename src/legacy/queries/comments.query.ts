import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { Comment, NewComment } from '../models/types'
import * as CommentsService from '../service/comments.service'

export const commentKeys = {
  all: ['comments'],
  list: (postId?: number) => [...commentKeys.all, 'list', postId],
}

export const commentQuery = {
  list: (postId?: number) =>
    queryOptions({
      queryKey: commentKeys.list(postId),
      queryFn: () => CommentsService.getComments(postId as number),
      enabled: !!postId,
    }),
}

export const useGetComments = (postId?: number) => useQuery(commentQuery.list(postId))

export const useCreateComment = () =>
  useMutation({
    mutationFn: (comment: NewComment) => CommentsService.postComment(comment),
    meta: {
      invalidates: [commentKeys.all],
    },
  })

export const useUpdateComment = () =>
  useMutation({
    mutationFn: (comment: Comment) => CommentsService.putComment(comment),
    meta: {
      invalidates: [commentKeys.all],
    },
  })

export const useDeleteComment = () =>
  useMutation({
    mutationFn: (id: number) => CommentsService.deleteComment(id),
    meta: {
      invalidates: [commentKeys.all],
    },
  })

export const useUpdateCommentLikes = () =>
  useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => CommentsService.patchComment(id, likes),
    meta: {
      invalidates: [commentKeys.all],
    },
  })
