import { atom } from "jotai"
const queryParams = new URLSearchParams(location.search)
export const searchQueryAtom = atom<string | undefined>(queryParams.get("search") || "");