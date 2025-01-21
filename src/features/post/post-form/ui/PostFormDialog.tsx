import { Dialog } from "@shared/ui"
import { Post } from "@entities/post/model"
import { DialogActions } from "@features/common/dialog/ui/DialogActions"
import { PostFormFields } from "./PostFormFields"

interface PostFormDialogProps {
  mode: "add" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  post?: Post | null
  onSubmit: () => void
  onTitleChange?: (title: string) => void
  onBodyChange?: (body: string) => void
}

export const PostFormDialog = ({
  mode,
  open,
  onOpenChange,
  post,
  onSubmit,
  onTitleChange,
  onBodyChange,
}: PostFormDialogProps) => {
  const isEdit = mode === "edit"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{isEdit ? "게시물 수정" : "새 게시물 추가"}</Dialog.Title>
        </Dialog.Header>
        <PostFormFields
          title={isEdit ? (post?.title ?? "") : ""}
          body={isEdit ? (post?.body ?? "") : ""}
          onTitleChange={onTitleChange ?? (() => {})}
          onBodyChange={onBodyChange ?? (() => {})}
        />
        <DialogActions onSubmit={onSubmit} submitText={isEdit ? "게시물 업데이트" : "게시물 추가"} />
      </Dialog.Content>
    </Dialog>
  )
}
