import { atom } from "jotai"
import { InfSortBy, InfSortOrder } from "../type/types.ts"
const queryParams = new URLSearchParams(location.search)

export const sortByAtom = atom<InfSortBy[keyof InfSortBy] | string>(queryParams.get("sortBy") || "")
export const sortOrderAtom = atom<InfSortOrder[keyof InfSortOrder] | string>(queryParams.get("sortOrder") || "asc");