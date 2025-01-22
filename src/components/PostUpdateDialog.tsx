import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Input, Textarea } from "../shared/ui"
import { updatePost as updatePostFunction } from "../api/post"
import { DialogComponentProps } from "../hooks/useDialog"

type Props = DialogComponentProps

export const PostUpdateDialog = ({ open, onOpenChange }: Props) => {
  const updatePost = async () => {
    try {
      const data = await updatePostFunction(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
