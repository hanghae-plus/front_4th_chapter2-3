import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { PostAddForm } from "@/features/post/ui/PostAddForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export function PostAddDialog() {
  const { showAddDialog, setShowAddDialog } = usePostDialog()

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <PostAddForm />
      </DialogContent>
    </Dialog>
  )
}
