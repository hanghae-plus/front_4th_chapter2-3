import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";
import { deleteComment } from "../../comment/api/deleteComment";

export const deletePost = async (id: number) => {
  const result = await client.delete(`/api/posts/${id}`);
  return result.data;
};

export const useDeletePostMutation = (
  options: UseMutationOptions<unknown, AxiosError, number> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: deleteComment,
  });
};
