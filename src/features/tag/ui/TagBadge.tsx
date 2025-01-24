import { Key } from "react"
import { useTag } from "@/features/tag/model/useTag.ts"

export function TagBadge({ tag }: { key: Key; tag: string }) {
  const { selectedTag, setSelectedTag } = useTag()

  function handleTagSelect() {
    setSelectedTag(tag)
  }

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={handleTagSelect}
    >
      {tag}
    </span>
  )
}
