import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";
import { IComment } from "./types";

export interface CreateCommentData {
  userId: number;
  postId: number;
  body: string;
}

export const createComment = async (data: CreateCommentData) => {
  const result = await client.post<IComment>("/api/comments/add", data);
  return result.data;
};

export const useCreateCommentMutation = (
  options: UseMutationOptions<IComment, AxiosError, CreateCommentData> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: createComment,
  });
};
