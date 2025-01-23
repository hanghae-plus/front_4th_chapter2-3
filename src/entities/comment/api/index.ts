import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// 댓글 목록 가져오기
export const useFetchPostCommentsQuery = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => axios.get(`/api/comments/post/${postId}`).then((res) => res.data),
    enabled: !!postId,
  });
};

// 댓글 추가하기
export const useAddCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: Partial<Comment>) => axios.post("/api/comments/add", newComment).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
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

// 댓글 삭제하기
export const useDeleteCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => axios.delete(`/api/comments/${commentId}`).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
  });
};

// 댓글 좋아요 선택하기
export const useLikeCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => axios.patch(`/api/comments/${commentId}`).then((res) => res.data),
    meta: {
      invalidates: queryClient.invalidateQueries({ queryKey: ["comments"] }),
    },
  });
};
