import { atom } from "jotai"
import { CommentType } from "./comment.type.ts"

export const commentsAtom = atom<CommentType[]>([])
