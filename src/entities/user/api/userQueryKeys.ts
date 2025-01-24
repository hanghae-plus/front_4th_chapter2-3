export const userQueryKeys = {
  all: "users",
  lists: () => [userQueryKeys.all, "list"] as const,
}
