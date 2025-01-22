import { api } from "../../../shared/api/api";

export const fetchTag = async () => {
  const response = await api.get("/api/posts/tags");
  return response.data;
};
