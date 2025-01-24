import { useSuspenseQuery } from "@tanstack/react-query";

import { getUserById, User } from "@/entities/users";

import { usersKeys } from "../lib";

export const useSuspenseQueryGetUserbyId = (userId: User["id"]) => {
  return useSuspenseQuery({
    queryKey: usersKeys.getUserById(userId).queryKey,
    queryFn: () => getUserById(userId),
  });
};
