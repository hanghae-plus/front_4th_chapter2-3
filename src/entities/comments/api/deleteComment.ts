import { Comment } from "../model";

export const deleteComment = async (id: Comment["id"]) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
