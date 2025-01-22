import { request } from "../../../shared/lib/request";
import { PostResponse } from "./types";

export const fetchPostsByTag = (tag: string) => {
  return request.get<PostResponse>(`/api/posts/tag/${tag}`);
};
