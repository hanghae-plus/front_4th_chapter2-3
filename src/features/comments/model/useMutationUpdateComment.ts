import { useMutation } from "@tanstack/react-query";

import { updateComment, UpdateCommentProps } from "@/entities/comments";

export const useMutationUpdateComment = () => {
  return useMutation({
    mutationFn: (props: UpdateCommentProps) => updateComment(props),
  });
};
