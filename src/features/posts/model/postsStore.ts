import { atom } from "jotai"
import { InfPost } from "../../../entities/posts/types/types.ts"

export const postsAtom = atom<InfPost[]>([]);
export const totalAtom = atom<number>(0);
export const newPostsAtom = atom<InfPost>({ title: "", body: "", userId: 1 })
export const selectedPostsAtom = atom<InfPost | null>(null);