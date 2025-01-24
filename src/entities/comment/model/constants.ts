export const QUERY_KEYS = {
  comments: {
    all: ["comments"] as const,
    byPostId: (postId: number) => [...QUERY_KEYS.comments.all, postId] as const,
  },
} as const
