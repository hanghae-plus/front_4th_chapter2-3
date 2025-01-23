import { useEffect } from "react";
import { useAtom } from "jotai";
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

  const [, setSkip] = useAtom(skipAtom);
  const [, setLimit] = useAtom(limitAtom);
  const [, setSearchQuery] = useAtom(searchQueryAtom);
  const [, setSortBy] = useAtom(sortByAtom);
  const [, setSortOrder] = useAtom(sortOrderAtom);
  const [, setSelectedTag] = useAtom(selectedTagAtom);

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
