import { useQuery } from "@tanstack/react-query";
import { Comment, getComments } from "@entities/comment/model";
import { commentQueryKey } from "./commentQueryKey";

export const useCommentQuery = (postId?: number) => {
  return useQuery<Comment[]>({
    queryKey: commentQueryKey.list(postId!),
    queryFn: async () => getComments(postId!).then((res) => res.comments),
    placeholderData: [],
    enabled: !postId,
  });
};
