import { Edit2 } from "lucide-react"

import { Button } from "../../../shared/ui"

import type { PostWithUser } from "../../../entities/post/model/types/post"

interface PostEditDialogOpenButtonProps {
  post: PostWithUser
  setSelectedPost: (post: PostWithUser) => void
  setShowEditDialog: (open: boolean) => void
}

export const PostEditDialogOpenButton = ({
  post,
  setSelectedPost,
  setShowEditDialog,
}: PostEditDialogOpenButtonProps) => {
  return (
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
  )
}
