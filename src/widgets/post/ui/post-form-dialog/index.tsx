import { Dialog } from "@shared/ui"
import { Post } from "@entities/post/model"
import { PostFormContainer } from "@features/post/ui"

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
      <Dialog.Content aria-describedby="dialog-description">
        <Dialog.Header>
          <Dialog.Title>{isEdit ? "게시물 수정" : "새 게시물 추가"}</Dialog.Title>
          <p id="dialog-description">
            {isEdit
              ? "게시물을 수정하려면 아래 양식을 작성해주세요."
              : "새 게시물을 작성하려면 아래 양식을 작성해주세요."}
          </p>
        </Dialog.Header>
        <PostFormContainer
          isEdit={isEdit}
          title={post?.title ?? ""}
          body={post?.body ?? ""}
          onTitleChange={onTitleChange ?? (() => {})}
          onBodyChange={onBodyChange ?? (() => {})}
          onSubmit={onSubmit}
        />
      </Dialog.Content>
    </Dialog>
  )
}
