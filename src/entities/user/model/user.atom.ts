import { atom } from "jotai"
import type { UserResponse, UserType } from "./user.types.ts"

export const selectedUserIdAtom = atom<UserType["id"] | undefined>(0)

export const selectedUserAtom = atom<UserResponse | undefined>()
