import { fetchTag } from "../api/tagApi";
import { useParams } from "../../../shared/hook/useParams";
import { usePosts } from "../../post/hook/usePosts";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { selectedTagAtom } from "../../../app/store/atom";

export const useTags = () => {
  const setSelectedTag = useSetAtom(selectedTagAtom);

  const { handleFetchPostsByTag } = usePosts();
  const { updateURL } = useParams();

  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useQuery(["tags"], fetchTag, {});

  // 검색 및 필터 컨트롤
  const handleControlFilter = (value: string) => {
    setSelectedTag(value);
    handleFetchPostsByTag(value);
    updateURL();
  };

  return {
    tags,
    isLoading,
    isError,
    error,
    handleControlFilter,
  };
};
