import {
  limitAtom,
  sortByAtom,
  searchQueryAtom,
  selectedTagAtom,
  skipAtom,
  sortOrderAtom,
} from "../../app/store/atom";

import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useParams = () => {
  const navigate = useNavigate();

  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);

  // URL 업데이트 함수
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  }, []);

  return {
    updateURL,
  };
};
