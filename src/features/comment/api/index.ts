import { useMutation, useQuery } from "@tanstack/react-query"
import {
  deleteComments,
  getComments,
  patchCommentsLike,
  postComments,
  putComments,
} from "../../../entities/comment/api"
import { postCommentsRequest, putCommentsRequest, patchCommentsLikeRequest } from "../../../entities/comment/model/type"

const queryKeys = {
  all: ["comments"] as const,
}

//댓글 조회
export const useGetComments = (postId: number) => {
  return useQuery({
    queryKey: [...queryKeys.all, postId],
    queryFn: () => getComments(postId),
  })
}

//댓글 추가
export const usePostComments = () => {
  return useMutation({
    mutationFn: (params: postCommentsRequest) => postComments(params),
  })
}

//댓글 업데이트
export const usePutComments = () => {
  return useMutation({
    mutationFn: ({ params, id }: { params: putCommentsRequest; id: number }) => putComments(params, id),
  })
}

//댓글 삭제
export const useDeleteComments = () => {
  return useMutation({
    mutationFn: (id: number) => deleteComments(id),
  })
}

//댓글 좋아요
export const usePatchCommentsLike = () => {
  return useMutation({
    mutationFn: ({ params, id }: { params: patchCommentsLikeRequest; id: number }) => patchCommentsLike(params, id),
  })
}
