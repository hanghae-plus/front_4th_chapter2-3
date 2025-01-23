import { instance } from "@/shared/api";
import { PartialPick } from "@/shared/lib";

import { Comment } from "../model";

export type UpdateCommentProps = PartialPick<Comment, "id">;

export const updateComment = async ({ id, ...props }: PartialPick<Comment, "id">) => {
  const response = await instance.put(`/api/comments/${id}`, { ...props });

  return response.data;
};
