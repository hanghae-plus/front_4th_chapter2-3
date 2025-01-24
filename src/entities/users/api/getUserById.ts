import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";

import { User } from "../model";

export const getUserById = async (userId: User["id"]) => {
  const response: AxiosResponse<User> = await instance.get(`/api/users/${userId}`);

  return response.data;
};
