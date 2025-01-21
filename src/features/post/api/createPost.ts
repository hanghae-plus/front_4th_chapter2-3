import { NewPost, Post } from "../../../types/post.ts";

export const createPost = async (newPost: NewPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  const createdPost: Post = await response.json();
  return createdPost;
};
