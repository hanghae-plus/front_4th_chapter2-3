import React from "react"
import { Comment } from "../model/type"
import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"

interface CommentSectionProps {
  comments: Comment[]
}

export const CommentSection: React.FC<CommentSectionProps> = () => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm">
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
    </div>
  )
}
