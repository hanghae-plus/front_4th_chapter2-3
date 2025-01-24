import { atom, useAtom } from "jotai"

const selectedTagAtom = atom("")

// @FIXME: useTag는 이제 Search목적으로 만 사용되고 있기에 Serach와 통합 필요
export const useTag = () => {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return new (class {
    selectedTag = selectedTag
    setSelectedTag = setSelectedTag
  })()
}
