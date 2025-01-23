import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui"
import { useParamsStore } from "../store/params"
import { usePosts } from "../hooks/usePosts"

export const Pagination = () => {
  const { limit, skip, setParams } = useParamsStore()
  const { posts } = usePosts()
  const total = posts ? posts.total : 0 // ! 0이라...

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => setParams("limit", Number(value))}>
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
        <Button disabled={skip === 0} onClick={() => setParams("skip", Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setParams("skip", skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
