import { useAtom, useSetAtom } from "jotai"

import { selectedPostAtom } from "../../postDetail/model"
import { dialogAtomFamily } from "../../../shared/model"
import { Button, Input, Textarea } from "../../../shared/ui/common"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { useUpdatePostMutation } from "../api"
import { postsWithUsersAtom } from "../../postsWithUsers/model"

export const UpdatePostDialog = () => {
  const [showEditDialog, setShowEditDialog] = useAtom(dialogAtomFamily("edit-post"))
  const setPosts = useSetAtom(postsWithUsersAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  const updatePostMutation = useUpdatePostMutation({
    onSuccess: () => {
      setShowEditDialog(false)
      setPosts((prev) => {
        return prev?.map((post) => (post.id === selectedPost.id ? selectedPost : post))
      })
    },
  })

  const updatePost = () => {
    updatePostMutation.mutate(selectedPost)
  }

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
