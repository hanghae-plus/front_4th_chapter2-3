import { atom } from "jotai"
import { TComment } from "./types"

export const selectedCommentAtom = atom<TComment | null>(null)
