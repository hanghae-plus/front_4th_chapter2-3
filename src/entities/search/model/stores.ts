import { atom } from "jotai"

// export interface SearchParamsProps {
//   skip : string;
//   limit : string;
//   search : string;
//   sortBy : string;
//   sortOrder : string;
//   tag : any[];
// }

export const searchParamsAtom  = atom<string>("");