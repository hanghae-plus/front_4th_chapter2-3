import { atom } from "jotai"

export const commentsAtom = atom<any>({});
export const selectedCommentAtom = atom<any>(null);
export const newCommentAtom = atom<any>({ body: "", postId: null, userId: 1 });
