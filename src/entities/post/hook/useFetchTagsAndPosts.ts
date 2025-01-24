import { useEffect } from "react";
import { useAtomValue } from "jotai";
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  selectedTagAtom,
  sortByAtom,
  sortOrderAtom,
} from "../../../app/store/atom";
import { useTags } from "../../../entities/tag/hook/useTags";
import { usePosts } from "../../../entities/post/hook/usePosts";
import { useParams } from "../../../shared/hook/useParams";

export const useFetchTagsAndPosts = () => {
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedTag = useAtomValue(selectedTagAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);

  // 태그, 게시물 fetch 로직
  const { handleFetchTags } = useTags();
  const { handleFetchPost, handleFetchPostsByTag } = usePosts();

  // URL 업데이트 로직
  const { updateURL } = useParams();

  useEffect(() => {
    async function fetchAll() {
      // 태그 불러오기
      await handleFetchTags();

      // 게시물 불러오기 (태그 유무에 따라 분기)
      if (selectedTag) {
        await handleFetchPostsByTag(selectedTag);
      } else {
        await handleFetchPost();
      }

      updateURL();
    }

    fetchAll();
  }, [
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    handleFetchTags,
    handleFetchPost,
    handleFetchPostsByTag,
    updateURL,
  ]);
};
