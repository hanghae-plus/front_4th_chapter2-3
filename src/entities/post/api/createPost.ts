import { request } from "../../../shared";
import { Post } from "../model/types";

export const createPost = async ({ newPost }: { newPost: { title: string; body: string; userId: number } }) => {
  return request.post<Post>(`/api/posts/add`, {
    json: newPost,
  });
};
