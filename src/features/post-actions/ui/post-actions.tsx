import { Button } from "@/shared"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"

function PostActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => openPostDetail(post)}
      >
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => {
        //   setSelectedPost(post)
        //   setShowEditDialog(true)
        // }}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => deletePost(post.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

export { PostActions }
