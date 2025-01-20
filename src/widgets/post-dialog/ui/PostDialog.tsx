// 게시물 수정 대화상자

import { Button, Dialog, Input, Textarea } from "../../../shared/ui"
import { usePostEditDialog } from "../model/hooks/usePostEditDialog"

interface PostEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: any
  posts: any[]
  onChangeEditPosts: (posts: any[]) => void
  onShowEditDialog: (open: boolean) => void
  onChangeSelectedPost: (...args: any) => void
}

export const PostEditDialog = ({
  onChangeSelectedPost,
  selectedPost,
  posts,
  onShowEditDialog,
  onChangeEditPosts,
  ...props
}: PostEditDialogProps) => {
  const { onUpdatePost } = usePostEditDialog(selectedPost, posts, onShowEditDialog, onChangeEditPosts)

  return (
    <Dialog {...props}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => onChangeSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => onChangeSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={onUpdatePost}>게시물 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
