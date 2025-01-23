const postKeys = {
  all: ["posts"] as const,
  detail: (postId?: number) => [...postKeys.all, postId] as const,
} as const

export { postKeys }
