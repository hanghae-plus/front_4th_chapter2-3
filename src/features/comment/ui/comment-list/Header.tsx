import { NewComment } from "@/entities/comment/model/types"
import { Post } from "@/entities/post/model/types"
import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

interface HeaderProps {
  postId: Post["id"]
  setNewComment: (updater: (prev: NewComment) => NewComment) => void
  setShowAddCommentDialog: (show: boolean) => void
}

export const Header = ({ postId, setNewComment, setShowAddCommentDialog }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button
        size="sm"
        onClick={() => {
          setNewComment((prev) => ({ ...prev, postId }))
          setShowAddCommentDialog(true)
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  )
}
