import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Post, updatePost } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useMutationUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys._def,
      });
    },
  });
};
