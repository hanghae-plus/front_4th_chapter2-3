import { DialogHeader, Input, Textarea, Button, Dialog, DialogContent, DialogTitle } from '../../shared/ui'
import { Dispatch, SetStateAction, useState } from 'react'
import { NewPost } from '../models/types'
import { useCreatePost } from '../queries/post.query'

type AddPostModalProps = {
  showAddDialog: boolean
  setShowAddDialog: Dispatch<SetStateAction<boolean>>
}
export const AddPostModal = ({ showAddDialog, setShowAddDialog }: AddPostModalProps) => {
  const [newPost, setNewPost] = useState<NewPost>({ title: '', body: '', userId: 1 })
  const { mutate: addPostMutation } = useCreatePost()

  const handleAddPost = () => {
    addPostMutation(newPost, {
      onSuccess: () => {
        setShowAddDialog(false)
        setNewPost({ title: '', body: '', userId: 1 })
      },
    })
  }

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
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
