import { queryOptions } from "@tanstack/react-query"

import { userApi } from "."

export const userQueries = {
  all: () => ["users"] as const,
  list: () => [...userQueries.all(), "list"] as const,
  listQuery: () =>
    queryOptions({
      queryKey: userQueries.list(),
      queryFn: () => userApi.fetchUsers(),
    }),

  detail: () => [...userQueries.all(), "detail"] as const,
  detailQuery: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.detail(), id],
      queryFn: () => userApi.fetchUserById(id),
      enabled: !!id,
    }),
}
