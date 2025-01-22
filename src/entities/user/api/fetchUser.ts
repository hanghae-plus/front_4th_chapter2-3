import { request } from "../../../shared/lib/request";
import { User, UserDetail } from "../model/types";

export const fetchUser = async ({ id }: { id: User["id"] }) => {
  return request.get<UserDetail>(`/api/users/${id}`);
};
