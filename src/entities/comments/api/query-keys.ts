const commentKeys = {
  all: ["comments"] as const,
  detail: (postId?: number) => [...commentKeys.all, postId] as const,
} as const

export { commentKeys }
