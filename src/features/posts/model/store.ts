import { atom } from "jotai"
import { useQuery } from "@tanstack/react-query"
import { fetchPostsWithTag } from "../../../entities/posts/api/fetchPosts.ts"
import { fetchUsers } from "../../../entities/posts/api/fetchUsers.ts"
import { fetchTags } from "../../tag/api/tagsApi.ts"
import { tagsQueryKey } from "../../tag/model/store.ts"

export const postsAtom = atom([]);
export const totalAtom = atom<number>(0);
export const newPostsAtom = atom({ title: "", body: "", userId: 1 })
export const selectedUserAtom = atom<any>(null);
export const selectedPostsAtom = atom<any>(null);