import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost, Post } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useMutationDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: Post["id"]) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys._def });
    },
  });
};
