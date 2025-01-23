import { useAtom } from "jotai";
import { selectedTagAtom, tagsAtom } from "../../../app/store/atom";
import { fetchTag } from "../api/tagApi";
import { useQuery } from "../../../shared/hook/useQueryParams";
import { usePosts } from "../../post/lib/usePosts";

export const useTags = () => {
  const [, setTags] = useAtom(tagsAtom);
  const [, setSelectedTag] = useAtom(selectedTagAtom);

  const { handleFetchPostsByTag } = usePosts();
  const { updateURL } = useQuery();

  // 태그 가져오기
  const handleFetchTags = async () => {
    try {
      const data = await fetchTag();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  // 정확히는 검색 쪽...이라서 공통으로 빼야하나..훔..
  // 검색 및 필터 컨트롤
  const handleControlFilter = (value: string) => {
    setSelectedTag(value);
    handleFetchPostsByTag(value);
    updateURL();
  };

  return { handleFetchTags, handleControlFilter };
};
