import { atom } from "jotai"
import { CommentType } from "@entities/comment/model"

export const selectedCommentIdAtom = atom<number | null>(null)

export const updateCommentAtom = atom<CommentType | Partial<CommentType> | undefined>()
