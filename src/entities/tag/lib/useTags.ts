import { useAtom } from "jotai";
import { tagsAtom } from "../../../app/store/atom";
import { fetchTag } from "../api/tagApi";

export const useTags = () => {
  const [, setTags] = useAtom(tagsAtom);

  // 태그 가져오기
  const handleFetchTags = async () => {
    try {
      const data = await fetchTag();
      setTags(data);
    } catch (error) {
      console.error("태그 가져오기 오류:", error);
    }
  };

  return { handleFetchTags };
};
