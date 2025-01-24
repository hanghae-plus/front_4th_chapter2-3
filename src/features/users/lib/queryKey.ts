import { createQueryKeys } from "@lukemorales/query-key-factory";

import { User } from "@/entities/users";

export const usersKeys = createQueryKeys("users", {
  getUsers: () => ["all"],
  getUserById: (userId: User["id"]) => [userId],
});
