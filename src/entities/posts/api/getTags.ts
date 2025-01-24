import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";

import { Tag } from "../model";

export const getTags = async () => {
  const response: AxiosResponse<Tag[]> = await instance.get("/api/posts/tags");

  return response.data;
};
