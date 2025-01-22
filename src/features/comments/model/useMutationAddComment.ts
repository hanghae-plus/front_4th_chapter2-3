import { useMutation } from "@tanstack/react-query";

import { addComment, AddCommentProps } from "@/entities/comments";

export const useMutationAddComment = () => {
  return useMutation({
    mutationFn: ({ postId, body, userId }: AddCommentProps) => addComment({ postId, body, userId }),
  });
};
