import { atom } from "jotai/index"
import { InfUser } from "../../../entities/user/model/userTypes.ts"

export const selectedUserAtom = atom<InfUser | null>(null);
