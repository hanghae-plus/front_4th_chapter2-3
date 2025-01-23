import { Trash2 } from "lucide-react"

import { useMutationDeletePost } from "../../../entities/post/model/queries/useMutationDeletePost"
import { Button } from "../../../shared/ui"

interface PostDeleteButtonProps {
  postId: number
}

export const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
  const { mutate: deletePostMutation } = useMutationDeletePost()

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostMutation(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
