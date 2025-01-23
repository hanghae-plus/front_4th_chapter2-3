import { useAtom } from "jotai"
import { selectedTagAtom, useTagsQuery } from "./tagStores.ts"
import updateSearchParams from "../../../modules/search/model/updateSearchParams.ts"
import usePosts from "../../posts/model/usePostsQuery.ts"

export default function useSelectTag() {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const {data : tags} = useTagsQuery();
  const {updateURL} = updateSearchParams();
  const {fetchPostsByTag} = usePosts();
  
  const handleValueChange = async (value) => {
    setSelectedTag(value);
    await fetchPostsByTag(value)
    updateURL();
  }
  
  return {
    tags,
    selectedTag,
    handleValueChange,
  }
}