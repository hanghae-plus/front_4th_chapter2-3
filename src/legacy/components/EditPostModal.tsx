import { Dispatch, SetStateAction } from 'react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from '../../shared/ui'
import { Post } from '../models/types'
import { useUpdatePost } from '../queries/post.query'

type EditPostModalProps = {
  showEditDialog: boolean
  setShowEditDialog: Dispatch<SetStateAction<boolean>>
  selectedPost: Post | null
  setSelectedPost: Dispatch<SetStateAction<Post | null>>
}
export const EditPostModal = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
}: EditPostModalProps) => {
  const { mutate: updatePostMutation } = useUpdatePost()

  const handleUpdatePost = () => {
    updatePostMutation(selectedPost as Post, {
      onSuccess: () => {
        setShowEditDialog(false)
        setSelectedPost(null)
      },
    })
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ''}
            onChange={(e) => setSelectedPost(selectedPost ? { ...selectedPost, title: e.target.value } : null)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ''}
            onChange={(e) => setSelectedPost(selectedPost ? { ...selectedPost, body: e.target.value } : null)}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
