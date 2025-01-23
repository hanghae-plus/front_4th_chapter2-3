import { Button, CardHeader, CardTitle } from "@shared/ui"
import { PostAdd } from "@features/post/ui"
import { Plus } from "lucide-react"
import { useModalStore } from "@shared/model"

export function PostManagerHeader() {
  const { openModal } = useModalStore()

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => openModal(<PostAdd />)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
