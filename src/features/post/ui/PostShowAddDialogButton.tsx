import { usePostDialog } from "@/features/post/model/usePostDialog"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

export function PostShowAddDialogButton() {
  const { setShowAddDialog } = usePostDialog()

  function handleShowAddDialog() {
    setShowAddDialog(true)
  }

  return (
    <Button onClick={handleShowAddDialog}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
