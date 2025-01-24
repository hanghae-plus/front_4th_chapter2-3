import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AddCommentRequest, Comment, CommentResponse } from "@/types/comment.ts";

// 댓글 목록 가져오기
export const useFetchPostCommentsQuery = (postId: number) => {
  return useQuery<CommentResponse>({
    queryKey: ["comments", postId],
    queryFn: () => axios.get(`/api/comments/post/${postId}`).then((res) => res.data),
    enabled: !!postId,
  });
};

// 댓글 추가하기
export const useAddCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddCommentRequest) => axios.post("/api/comments/add", request).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });
};

// 댓글 업데이트하기
export const useUpdateCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: Comment) => axios.put(`/api/comments/${comment.id}`, comment).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
  });
};

const deleteComment = async (id: Comment["id"]) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

// 댓글 삭제하기
export const useDeleteCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (commentId: number) => axios.delete(`/api/comments/${commentId}`).then((res) => res.data),
    mutationFn: (commentId: number) => deleteComment(commentId),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
  });
};

// 댓글 좋아요 선택하기
export const useLikeCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => axios.patch(`/api/comments/${commentId}`).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
  });
};
