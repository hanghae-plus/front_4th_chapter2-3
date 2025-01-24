import { instance } from "@/shared/api";

export interface AddCommentProps {
  postId: number;
  body: string;
  userId: number;
}

export const addComment = async ({ postId, body, userId }: AddCommentProps) => {
  const response = await instance.post("/api/comments/add", {
    postId,
    body,
    userId,
  });

  return response.data;
};
