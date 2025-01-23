import { Post } from "../../entities/post/model/types"

export const QUERY_KEYS = {
  USER: {
    all: ["users"],
    getUser: (userId: string) => [...QUERY_KEYS.USER.all, "get", userId],
  },
  TAG: ["tags"],
  POST: {
    all: ["posts"],
    getPostList: (limit: string, skip: string) => [...QUERY_KEYS.POST.all, { limit, skip }],
    getPostDetail: (postId: string | undefined) => [...QUERY_KEYS.POST.all, postId],
    postPost: (newPost: Partial<Post>) => [...QUERY_KEYS.POST.all, JSON.stringify(newPost)],
  },
  COMMENT: {
    all: ["comment"],
    getCommentList: (postId: Post["id"]) => [...QUERY_KEYS.COMMENT.all, postId.toLocaleString()],
  },
}
