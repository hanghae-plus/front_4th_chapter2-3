import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Button, Input, Textarea } from "../../../shared/ui/common"

export const UpdatePostDialog = ({ showEditDialog, setShowEditDialog, selectedPost, setSelectedPost, updatePost }) => {
  return (
    <DialogContainer open={showEditDialog} onOpenChange={setShowEditDialog}>
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
    </DialogContainer>
  )
}
