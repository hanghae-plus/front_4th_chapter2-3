import { request } from "../../../shared";
import { TagResponse } from "./types";

export const fetchTags = async () => {
  return request.get<TagResponse>("/api/posts/tags");
};
