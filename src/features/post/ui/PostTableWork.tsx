import { Post } from "@/entities/post/model/types"
import { TableCell, Button } from "@/shared/ui"
import { MessageSquare, Edit2, Trash2 } from "lucide-react"

interface PostTableWorkProps {
  post: Post
  openPostDetail: (post: Post) => void
  setSelectedPost: (post: Post) => void
  setShowEditDialog: (flag: boolean) => void
  deletePost: (id: number) => void
}

export const PostTableWork = ({
  post,
  openPostDetail,
  setSelectedPost,
  setShowEditDialog,
  deletePost,
}: PostTableWorkProps) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedPost(post)
            setShowEditDialog(true)
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
