import { useMutation } from "@tanstack/react-query";

import { Post, updatePost } from "@/entities/posts";

export const useMutationUpdatePost = () => {
  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
  });
};
