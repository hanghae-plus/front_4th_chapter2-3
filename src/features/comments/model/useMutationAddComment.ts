import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addComment, AddCommentProps } from "@/entities/comments";

import { commentsKeys } from "../lib";

export const useMutationAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, body, userId }: AddCommentProps) => addComment({ postId, body, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys._def,
      });
    },
  });
};
