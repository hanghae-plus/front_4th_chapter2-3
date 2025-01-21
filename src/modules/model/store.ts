import { atom } from "jotai"
const queryParams = new URLSearchParams(location.search)
export const skipAtom = atom<any>(parseInt(queryParams.get("skip") || "0"));
export const limitAtom = atom<any>(parseInt(queryParams.get("limit") || "10"));

