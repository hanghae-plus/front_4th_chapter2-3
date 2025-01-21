import { useAtom } from "jotai"
import { selectedTagAtom, useTagsQuery } from "./store.ts"
import updateSearchParams from "../../../modules/model/updateSearchParams.ts"
import usePosts from "../../posts/model/actions.ts"

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