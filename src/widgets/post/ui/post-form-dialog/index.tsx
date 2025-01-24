import { Dialog, Button } from "@shared/ui"
import { PostForm } from "@features/post/ui"
import { usePostStore } from "@features/post/model/stores"

interface PostFormDialogProps {
  mode: "add" | "edit"
}

export const PostFormDialog = ({ mode }: PostFormDialogProps) => {
  const {
    showAddDialog,
    showEditDialog,
    newPost,
    selectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setNewPostTitle,
    setNewPostBody,
    setSelectedPost,
    handleSubmitAdd,
    handleSubmitEdit,
  } = usePostStore()

  const isEdit = mode === "edit"
  const isOpen = isEdit ? showEditDialog : showAddDialog
  const post = isEdit ? selectedPost : { ...newPost, id: 0 }

  const handleOpenChange = (open: boolean) => {
    if (isEdit) {
      setShowEditDialog(open)
    } else {
      setShowAddDialog(open)
    }
  }

  const handleTitleChange = (title: string) => {
    if (isEdit && selectedPost) {
      setSelectedPost({ ...selectedPost, title })
    } else {
      setNewPostTitle(title)
    }
  }

  const handleBodyChange = (body: string) => {
    if (isEdit && selectedPost) {
      setSelectedPost({ ...selectedPost, body })
    } else {
      setNewPostBody(body)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{isEdit ? "게시물 수정" : "새 게시물 추가"}</Dialog.Title>
          <p id="dialog-description">
            {isEdit
              ? "게시물을 수정하려면 아래 양식을 작성해주세요."
              : "새 게시물을 작성하려면 아래 양식을 작성해주세요."}
          </p>
        </Dialog.Header>
        <PostForm
          title={post?.title || ""}
          body={post?.body || ""}
          onTitleChange={handleTitleChange}
          onBodyChange={handleBodyChange}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={isEdit ? handleSubmitEdit : handleSubmitAdd}>
            {isEdit ? "게시물 수정" : "게시물 추가"}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
