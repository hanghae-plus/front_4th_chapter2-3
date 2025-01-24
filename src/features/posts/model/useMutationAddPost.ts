import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addPost, AddPostProps } from "@/entities/posts";

import { postsKeys } from "../lib";

export const useMutationAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: AddPostProps) => addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKeys._def,
      });
    },
  });
};
