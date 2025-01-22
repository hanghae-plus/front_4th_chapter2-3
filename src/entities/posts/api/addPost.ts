import { Post } from "../model";

export type AddPostProps = Pick<Post, "title" | "body" | "userId">;

export const addPost = async (newPost: AddPostProps) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
