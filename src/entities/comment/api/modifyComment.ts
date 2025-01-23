import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";
import { IComment } from "./types";

export interface ModifyCommentData {
  id: number;
  body: string;
}

export const modifyComment = async ({ id, body }: ModifyCommentData) => {
  const result = await client.put<IComment>(`/api/comments/${id}`, { body });
  return result.data;
};

export const useModifyCommentMutation = (
  options: UseMutationOptions<IComment, AxiosError, ModifyCommentData> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: modifyComment,
  });
};
