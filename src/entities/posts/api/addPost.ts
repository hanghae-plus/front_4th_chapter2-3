import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";

import { Post } from "../model";

export type AddPostProps = Pick<Post, "title" | "body" | "userId">;

export const addPost = async (newPost: AddPostProps) => {
  const response: AxiosResponse<Post> = await instance.post("/api/posts/add", newPost);
  return response.data;
};
