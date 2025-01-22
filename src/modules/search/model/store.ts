import { atom } from "jotai"
import { TypeLimit, TypeSkip } from "../../../entities/posts/types/types.ts"
const queryParams = new URLSearchParams(location.search)
export const skipAtom = atom<TypeSkip>(parseInt(queryParams.get("skip") || "0"));
export const limitAtom = atom<TypeLimit>(parseInt(queryParams.get("limit") || "10"));

