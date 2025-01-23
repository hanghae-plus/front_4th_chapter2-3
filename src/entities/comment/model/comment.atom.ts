import { atom } from "jotai"

import type { CommentType } from "@entities/comment/model/comment.type.ts"

export const commentsAtom = atom<CommentType[]>([])
