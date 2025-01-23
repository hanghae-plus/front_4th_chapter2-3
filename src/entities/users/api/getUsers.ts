import { AxiosResponse } from "axios";

import { instance } from "@/shared/api";
import { ListResponse } from "@/shared/model";

import { User } from "../model";

export const getUsers = async () => {
  const response: AxiosResponse<ListResponse<{ users: User[] }>> = await instance.get("/api/users", {
    params: {
      limit: 0,
      select: "username,image",
    },
  });

  return response.data;
};
