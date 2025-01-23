import { useSetSearchParam } from "../lib"
import { SearchInput } from "./SearchInput.tsx"
import { TagSelect } from "./TagSelect.tsx"
import { SortSelect } from "./SortSelect.tsx"
import { SortOrderSelect } from "./SortOrderSelect.tsx"

export const SearchPostBar = () => {
  useSetSearchParam()

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <SearchInput />
      </div>
      <TagSelect />
      <SortSelect />
      <SortOrderSelect />
    </div>
  )
}
