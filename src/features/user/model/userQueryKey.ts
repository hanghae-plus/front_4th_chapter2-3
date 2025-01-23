import { QUERY_KEY } from "@features/shared";

export const userQueryKey = {
  base: [QUERY_KEY.USER] as const,
  list: () => [userQueryKey.base, "list"],
  byId: (id: number) => [userQueryKey.base, "byId", id],
};
