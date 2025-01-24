import { usePostDialog } from "@/features/post/model/usePostDialog.ts"
import { PostEditForm } from "@/features/post/ui/PostEditForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"

export function PostEditDialog() {
  const { showEditDialog, setShowEditDialog } = usePostDialog()
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <PostEditForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
