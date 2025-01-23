import { useSearchParams } from "react-router-dom"

interface TagProps {
  tag: string
}

export function Tag(props: TagProps) {
  const { tag } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedTag = searchParams.get("tag") ?? ""

  const handleChangeTag = () => {
    setSearchParams((prev) => {
      prev.set("tag", tag)
      return prev
    })
  }
  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        selectedTag === tag ? "text-white bg-blue-500 hover:bg-blue-600" : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
      onClick={handleChangeTag}
    >
      {tag}
    </span>
  )
}
