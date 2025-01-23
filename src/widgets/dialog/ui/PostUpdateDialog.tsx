import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/post/model/type"
import { useDialogStore } from "../../../app/model/dialog-store"
import { usePosts } from "../../../features/posts/api/usePosts"

interface Props {
  selectedPost: Post
  onSelectPost: (post: Post | null) => void
}

export const PostUpdateDialog = ({ selectedPost, onSelectPost }: Props) => {
  const { dialogs, onOpenChange } = useDialogStore()
  const { updatePost } = usePosts()

  const handleUpdatePost = async () => {
    updatePost(selectedPost, {
      onSuccess: () => {
        onOpenChange("editPostDialog", false)
      },
    })
  }

  return (
    <Dialog open={dialogs["editPostDialog"]} onOpenChange={(open: boolean) => onOpenChange("editPostDialog", open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => {
              if (selectedPost) {
                onSelectPost({ ...selectedPost, title: e.target.value })
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => {
              if (selectedPost) {
                onSelectPost({ ...selectedPost, body: e.target.value })
              }
            }}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
