import { atom } from "jotai"
import { UserResponse, UserType } from "./types.ts"

export const selectedUserIdAtom = atom<UserType["id"]>(0)

export const selectedUserAtom = atom<UserResponse | undefined>()
