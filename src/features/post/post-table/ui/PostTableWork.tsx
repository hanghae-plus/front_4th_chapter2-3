import { Post } from "@/entities/post/model/types"
import { TableCell, Button } from "@/shared/ui"
import { MessageSquare, Edit2, Trash2 } from "lucide-react"
import { usePostStore } from "../../model"
import { useCommentStore } from "@/features/comment/model"

interface PostTableWorkProps {
  post: Post
}

export const PostTableWork = ({ post }: PostTableWorkProps) => {
  const { setSelectedPost, setShowEditDialog, deletePost, setShowPostDetailDialog } = usePostStore()
  const { fetchComments } = useCommentStore()

  const handlePostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const handleEditPost = () => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => handlePostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleEditPost}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
