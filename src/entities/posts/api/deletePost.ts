import { Post } from "../model";

export const deletePost = async (postId: Post["id"]) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
