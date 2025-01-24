import { useQuery } from "@tanstack/react-query";
import { usePosts } from "./usePosts";
import {
  limitAtom,
  selectedTagAtom,
  sortByAtom,
  sortOrderAtom,
  skipAtom,
} from "../../../app/store/atom";
import { useAtomValue } from "jotai";

export function usePostsQuery() {
  const selectedTag = useAtomValue(selectedTagAtom);
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);

  const { handleFetchPost, handleFetchPostsByTag } = usePosts();

  return useQuery({
    queryKey: ["posts", { selectedTag, skip, limit, sortBy, sortOrder }],
    queryFn: async () => {
      if (selectedTag) {
        return handleFetchPostsByTag(selectedTag);
      } else {
        return handleFetchPost();
      }
    },
    keepPreviousData: true,
  });
}
