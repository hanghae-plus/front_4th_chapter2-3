import { atomWithLocation } from "jotai-location"

export const searchParamsAtom = atomWithLocation({
  skip: "0",
  limit: "10",
  search: '',
  sortBy: '',
  sortOrder: 'asc',
  tag: []
});