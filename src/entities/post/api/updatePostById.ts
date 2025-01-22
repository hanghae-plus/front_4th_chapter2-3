import { Post } from "../../../types/post.ts";

export const updatePostById = async (id: string, selectedPost: Partial<Post>) => {
  const response = await fetch(`/api/posts/${id}`, {
    // * 특정 함수 타입을 다른 함수로 취급해도 괜찮은가를 판단하는 기준

    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  });
  const updatedPost: Post = await response.json();
  return updatedPost;
};
