import { atom } from "jotai"
import { PostWithUsers } from "./postsWithUsers.type.ts"
import { PostsResponse } from "../../../entities/post/model"

export const postsWithUsersAtom = atom<PostWithUsers[]>([])

export const postsTotalAtom = atom<PostsResponse["total"]>(0)
