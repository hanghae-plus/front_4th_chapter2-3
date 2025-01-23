import { useAtom, useAtomValue } from "jotai"

import { limitAtom, skipAtom } from "../../serchPost/model"
import { postsTotalAtom } from "../../postsWithUsers/model"
import { Button } from "../../../shared/ui/common"
import { SelectContainer, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui/select"

export const Pagination = () => {
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const total = useAtomValue(postsTotalAtom)

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <SelectContainer value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </SelectContainer>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
