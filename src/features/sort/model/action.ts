import { useAtom } from "jotai"
import { sortByAtom } from "./store.ts"

export default function useSorting() {
  const [sortBy, setSortBy] = useAtom(sortByAtom);
}