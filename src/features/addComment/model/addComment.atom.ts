import { atom } from "jotai"
import { NewCommentType } from "./addComment.type.ts"

export const newCommentAtom = atom<NewCommentType>({
  body: "",
  postId: 0,
  userId: 1,
})
