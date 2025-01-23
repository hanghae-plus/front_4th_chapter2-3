import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";

export const deleteComment = async (id: number) => {
  const result = await client.delete(`/api/comments/${id}`);
  return result.data;
};

export const useDeleteCommentMutation = (
  options: UseMutationOptions<unknown, AxiosError, number> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: deleteComment,
  });
};
