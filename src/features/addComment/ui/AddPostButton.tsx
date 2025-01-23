import { useSetAtom } from "jotai"
import { Plus } from "lucide-react"
import { dialogAtomFamily } from "@shared/model"
import { Button } from "@shared/ui/common"

export const AddPostButton = () => {
  const setShowAddDialog = useSetAtom(dialogAtomFamily("add-post"))

  return (
    <Button onClick={() => setShowAddDialog(true)}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}
