import { useSuspenseQuery } from "@tanstack/react-query";

import { Comment, getComments } from "@/entities/comments";

import { commentsKeys } from "../lib";

export const useSuspenseQueryGetComments = (postId: Comment["postId"]) => {
  return useSuspenseQuery({
    queryKey: commentsKeys.getComments(postId).queryKey,
    queryFn: () => getComments(postId),
  });
};
