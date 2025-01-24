import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComment, UpdateCommentProps } from "@/entities/comments";

import { commentsKeys } from "../lib";

export const useMutationUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UpdateCommentProps) => updateComment(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKeys._def,
      });
    },
  });
};
