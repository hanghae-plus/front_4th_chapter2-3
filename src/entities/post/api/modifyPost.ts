import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";
import { IPost } from "./types";

export interface ModifyPostData {
  id: number;
  title: string;
  body: string;
}

export const modifyPost = async ({ id, ...data }: ModifyPostData) => {
  const result = await client.patch<IPost>(`/api/posts/${id}`, data);
  return result.data;
};

export const useModifyPostMutation = (
  options: UseMutationOptions<IPost, AxiosError, ModifyPostData> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: modifyPost,
  });
};
