import { useSetAtom } from "jotai";
import { selectedTagAtom, tagsAtom } from "../../../app/store/atom";
import { fetchTag } from "../api/tagApi";
import { useParams } from "../../../shared/hook/useParams";
import { usePosts } from "../../post/hook/usePosts";
import { useCallback } from "react";

export const useTags = () => {
  const setTags = useSetAtom(tagsAtom);
  const setSelectedTag = useSetAtom(selectedTagAtom);

  const { handleFetchPostsByTag } = usePosts();
  const { updateURL } = useParams();

  // 태그 가져오기
  const handleFetchTags = useCallback(async () => {
    try {
      const data = await fetchTag();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  }, [setTags]);

  // 검색 및 필터 컨트롤
  const handleControlFilter = (value: string) => {
    setSelectedTag(value);
    handleFetchPostsByTag(value);
    updateURL();
  };

  return { handleFetchTags, handleControlFilter };
};
