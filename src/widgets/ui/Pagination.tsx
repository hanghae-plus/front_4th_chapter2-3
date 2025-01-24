import { Button, Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@shared/ui"
import { useSearchParams } from "react-router-dom"
import { usePostsQuery } from "@features/post/model"

export function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams()
  const skip = Number(searchParams.get("skip") ?? "0")
  const limit = Number(searchParams.get("limit") ?? "10")
  const { total } = usePostsQuery().data

  const handleLimitChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("limit", value)
      return prev
    })
  }
  const handleClickPrevButton = () => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(0, skip - limit).toString())
      return prev
    })
  }
  const handleClickNextButton = () => {
    setSearchParams((prev) => {
      prev.set("skip", (skip + limit).toString())
      return prev
    })
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handleClickPrevButton}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleClickNextButton}>
          다음
        </Button>
      </div>
    </div>
  )
}
