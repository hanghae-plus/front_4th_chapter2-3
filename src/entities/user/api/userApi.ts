import { api } from "../../../shared/api/api";

export const getUser = async () => {
  const response = await api.get("/api/users?limit=0&select=username,image");
  return response.data;
};
