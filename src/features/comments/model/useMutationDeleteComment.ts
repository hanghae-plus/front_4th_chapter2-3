import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Comment, deleteComment } from "@/entities/comments";

import { commentsKeys } from "../lib";

export const useMutationDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Comment["id"]) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys._def,
      });
    },
  });
};
