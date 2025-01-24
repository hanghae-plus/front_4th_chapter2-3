import { Post } from "../../../post/model/types"

export const commentsQueryKeys = {
  all: "comments",
  lists: (postId: Post["id"]) => [commentsQueryKeys.all, postId] as const,
}
