const userDetailKeys = {
  all: ["user"] as const,
  detail: (userId?: number) => [...userDetailKeys.all, userId] as const,
} as const

export { userDetailKeys }
