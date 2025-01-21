import { Button } from "@shared/ui/Button"
import { Post } from "@entities/post/model"
import { MessageSquare, Edit2, Trash2 } from "lucide-react"

interface PostActionButtonsProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onViewComments: (post: Post) => void
}

export const PostActionButtons = ({ post, onEdit, onDelete, onViewComments }: PostActionButtonsProps) => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="sm" onClick={() => onViewComments(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
      <Edit2 className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
)
