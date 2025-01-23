import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { client } from "../../../shared/api";
import { IPost } from "./types";

export interface CreatePostData {
  userId: number;
  title: string;
  body: string;
}

export const createPost = async (data: CreatePostData) => {
  const result = await client.post<IPost>("/api/posts/add", data);
  return result.data;
};

export const useCreatePostMutation = (
  options: UseMutationOptions<IPost, AxiosError, CreatePostData> = {},
) => {
  return useMutation({
    ...options,
    mutationFn: createPost,
  });
};
