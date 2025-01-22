import { MessageSquare } from "lucide-react"

import { Button } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostDetailOpenButtonProps {
  openPostDetail: (post: PostWithUser) => void
  post: PostWithUser
}

export const PostDetailOpenButton = ({ openPostDetail, post }: PostDetailOpenButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
