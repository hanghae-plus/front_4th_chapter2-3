import { PostAdd } from "@features/post/ui/PostAdd.tsx"
import { Plus } from "lucide-react"
import { useModalStore } from "@shared/model"
import { CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"

export function PostManagerHeader() {
  const { onOpen } = useModalStore()

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => onOpen(<PostAdd />)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}
