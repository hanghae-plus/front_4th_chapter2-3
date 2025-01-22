import { useMutation } from "@tanstack/react-query";

import { Comment, deleteComment } from "@/entities/comments";

export const useMutationDeleteComment = () => {
  return useMutation({
    mutationFn: (id: Comment["id"]) => deleteComment(id),
  });
};
