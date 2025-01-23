import type { PostType } from "../../../entities/post/model"

export type NewPostType = Pick<PostType, "title" | "body" | "userId">
