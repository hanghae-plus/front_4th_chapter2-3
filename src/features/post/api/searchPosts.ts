import { PostResponse } from "../../../entities/post/api/types";
import { request } from "../../../shared";

export const searchPosts = async ({ searchQuery }: { searchQuery: string }) => {
  return request.get<PostResponse>(`/api/posts/search?q=${searchQuery}`);
};
