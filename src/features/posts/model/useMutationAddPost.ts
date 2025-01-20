import { useMutation } from "@tanstack/react-query";

import { addPost, Post } from "@/entities/posts";

export const useMutationAddPost = () => {
  return useMutation({
    mutationFn: (newPost: Post) => addPost(newPost),
  });
};
