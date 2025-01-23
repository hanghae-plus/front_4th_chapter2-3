import { atom } from "jotai"
import { SEARCH_PARAMS } from "./searchParams.type.ts"

const queryParams = new URLSearchParams(window.location.search)

export const skipAtom = atom(parseInt(queryParams.get(SEARCH_PARAMS.SKIP) || "0"))
export const limitAtom = atom(parseInt(queryParams.get(SEARCH_PARAMS.LIMIT) || "10"))
export const searchQueryAtom = atom(queryParams.get(SEARCH_PARAMS.SEARCH_QUERY) || "")
export const sortByAtom = atom(queryParams.get(SEARCH_PARAMS.SORT_BY) || "")
export const sortOrderAtom = atom(queryParams.get(SEARCH_PARAMS.SORT_ORDER) || "asc")
export const selectedTagAtom = atom(queryParams.get(SEARCH_PARAMS.SELECTED_TAG) || "")
