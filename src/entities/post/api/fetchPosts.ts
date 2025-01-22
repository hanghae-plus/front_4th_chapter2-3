import { request } from "../../../shared/lib/request";
import { PostResponse } from "./types";

export const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }) => {
  return request.get<PostResponse>(`/api/posts`, {
    params: { limit, skip },
  });
};
