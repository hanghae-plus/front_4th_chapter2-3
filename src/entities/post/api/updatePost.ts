import { request } from "../../../shared/lib/request";
import { Post } from "../model/types";

export const updatePost = async ({ post }: { post: Post }) => {
  return request.post<Post>(`/api/posts/${post.id}`, {
    json: post,
  });
};
