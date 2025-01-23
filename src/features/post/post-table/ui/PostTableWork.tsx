import { Post } from "@/entities/post/model/types"
import { TableCell, Button } from "@/shared/ui"
import { MessageSquare, Edit2, Trash2 } from "lucide-react"
import { usePostStore } from "../../model"
import { useCommentStore } from "@/features/comment/model"
import { useCommentQuery } from "@/entities/comment/model/queries"
import { useEffect } from "react"

interface PostTableWorkProps {
  post: Post
}

export const PostTableWork = ({ post }: PostTableWorkProps) => {
  const { setSelectedPost, setShowEditDialog, deletePost, setShowPostDetailDialog } = usePostStore()

  const { data, refetch } = useCommentQuery(post.id)
  const { setComments } = useCommentStore()

  const handlePostDetail = async (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
    await refetch()
  }

  const handleEditPost = () => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  useEffect(() => {
    if (data?.[post.id]) {
      setComments(post.id, data[post.id])
    }
  }, [data, post.id, setComments])

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
