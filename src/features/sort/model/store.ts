import { atom } from "jotai"
const queryParams = new URLSearchParams(location.search)

export const sortByAtom = atom<any>(queryParams.get("sortBy") || "")
export const sortOrderAtom = atom<any>(queryParams.get("sortOrder") || "asc");