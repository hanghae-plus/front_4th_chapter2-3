import { useAtom, useSetAtom } from "jotai"
import { useAddPostMutation } from "@features/addPost/api"
import { newPostAtom } from "@features/addPost/model"
import { postsWithUsersAtom } from "@features/postsWithUsers/model"
import { dialogAtomFamily } from "@shared/model"
import { Button, Input, Textarea } from "@shared/ui/common"
import { DialogContainer, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"

export const AddPostDialog = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(dialogAtomFamily("add-post"))
  const setPosts = useSetAtom(postsWithUsersAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const addPostMutation = useAddPostMutation({
    onSuccess: () => {
      setPosts((prev) => [newPost, ...prev])
      setShowAddDialog(false)
    },
  })

  const addPost = () => {
    addPostMutation.mutate(newPost)
  }

  return (
    <DialogContainer open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost?.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost?.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost?.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </DialogContainer>
  )
}
