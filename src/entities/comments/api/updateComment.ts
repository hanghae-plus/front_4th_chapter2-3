import { PartialPick } from "@/shared/lib";

import { Comment } from "../model";

export type UpdateCommentProps = PartialPick<Comment, "id">;

export const updateComment = async ({ id, ...props }: PartialPick<Comment, "id">) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...props }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
