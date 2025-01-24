import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { useLocation } from "react-router-dom";
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from "../../app/store/atom";

export const useInitializePosts = () => {
  const location = useLocation();

  const setSkip = useSetAtom(skipAtom);
  const setLimit = useSetAtom(limitAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const setSortBy = useSetAtom(sortByAtom);
  const setSortOrder = useSetAtom(sortOrderAtom);
  const setSelectedTag = useSetAtom(selectedTagAtom);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [
    location.search,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  ]);
};
