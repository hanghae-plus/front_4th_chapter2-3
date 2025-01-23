import type { CommentType } from "@entities/comment/model"

export interface NewCommentType extends Pick<CommentType, "body" | "postId"> {
  userId: number
}
