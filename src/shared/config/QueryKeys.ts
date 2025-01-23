import { Post } from "../../entities/post/model/types"

export const QUERY_KEYS = {
  USER: {
    all: ["users"],
    getUser: (userId: string) => [...QUERY_KEYS.USER.all, "get", userId],
  },
  TAG: ["tags"],
  POST: {
    all: ["posts"],
    getPostList: (limit: string, skip: string) => ["posts", { limit, skip }],
    postPost: (newPost: Partial<Post>) => ["post", JSON.stringify(newPost)],
  },
}
