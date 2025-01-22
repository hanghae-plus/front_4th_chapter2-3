import { useMutation } from "@tanstack/react-query";

import { addPost, AddPostProps } from "@/entities/posts";

export const useMutationAddPost = () => {
  return useMutation({
    mutationFn: (newPost: AddPostProps) => addPost(newPost),
  });
};
