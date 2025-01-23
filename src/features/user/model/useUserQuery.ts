import { useQuery } from "@tanstack/react-query";
import { userQueryKey } from "./userQueryKey";
import { getUsers, UsersResponseDto } from "@entities/user";

export const useUserQuery = () => {
  return useQuery<UsersResponseDto>({
    queryKey: userQueryKey.list(),
    queryFn: async () => getUsers(),
    placeholderData: { users: [], total: 0, limit: 0, skip: 0 },
  });
};
