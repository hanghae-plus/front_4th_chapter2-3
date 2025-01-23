import { atom } from "jotai"
import type { TagType } from "./tag.type.ts"

export const tagsAtom = atom<TagType[]>([])
