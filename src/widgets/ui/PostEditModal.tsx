import { Post } from "../../entities/post/model/types"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../shared/ui"

interface PostEditModalProps {
  showEditDialog: boolean
  setShowEditDialog: (value: boolean) => void
  selectedPost: Post
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  updatePost: (post: Post) => void
}

const PostEditModal: React.FC<PostEditModalProps> = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  updatePost,
}) => {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, title: e.target.value })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, body: e.target.value })
            }
          />
          <Button onClick={() => updatePost(selectedPost)}>
            게시물 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditModal
