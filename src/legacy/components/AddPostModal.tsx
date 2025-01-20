import { DialogHeader, Input, Textarea, Button, Dialog, DialogContent, DialogTitle } from '../../shared/ui'
import { Dispatch, SetStateAction } from 'react'
import { NewPost } from '../models/types'

type AddPostModalProps = {
  showAddDialog: boolean
  setShowAddDialog: Dispatch<SetStateAction<boolean>>
  newPost: NewPost
  setNewPost: Dispatch<SetStateAction<NewPost>>
  addPost: (post: NewPost, callback: () => void) => void
}
export const AddPostModal = ({ showAddDialog, setShowAddDialog, newPost, setNewPost, addPost }: AddPostModalProps) => {
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button
            onClick={() =>
              addPost(newPost, () => {
                setShowAddDialog(false)
                setNewPost({ title: '', body: '', userId: 1 })
              })
            }
          >
            게시물 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
