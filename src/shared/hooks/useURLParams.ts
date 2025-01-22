import { useAtom } from "jotai"
import { searchParamsAtom } from "../../entities/search/model/stores.ts"
import { useCallback, useEffect } from "react"
import { buildUrlParams } from "../../features/posts/lib/buildUrlParams.ts"
import { useAtomValue } from "jotai/index"
import { sortByAtom, sortOrderAtom } from "../../features/sort/model/sortStores.ts"
import { searchQueryAtom } from "../../features/search/model/searchQueryStore.ts"
import { useQueryClient } from "@tanstack/react-query"
import { selectedTagAtom } from "../../features/tag/model/tagStores.ts"
import { limitAtom, skipAtom } from "../../modules/search/model/store.ts"

export const useURLParams = () => {
  const [params, setParams] = useAtom(searchParamsAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  
  const updateParams = (newParams: any) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  };
  
  const changeParameter = useCallback(() => {
    const paramString = buildUrlParams({  limit,
      skip,
      sortBy,
      sortOrder,
      searchQuery,
      selectedTag})
    console.log("태그 변경", paramString);
    setParams(paramString);
  }, [sortBy, sortOrder, searchQuery, selectedTag]);
  
  useEffect(() => {
    changeParameter();
  }, [ sortBy, sortOrder, searchQuery, selectedTag]);
  
  return {
    params,
    updateParams,
  };
};