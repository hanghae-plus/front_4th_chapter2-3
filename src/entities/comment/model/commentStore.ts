import { atom } from "jotai"
import { InfComment, InfComments } from "../type/commentTypes.ts"

export const commentsAtom = atom<InfComments>([]);
export const selectedCommentAtom = atom<InfComment | null>(null);
export const newCommentAtom = atom<InfComment>({ body: "", postId: null, userId: 1 });
