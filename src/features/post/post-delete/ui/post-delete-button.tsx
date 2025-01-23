import { Button } from "@/shared"
import { Trash2 } from "lucide-react"
import { useMutationDeletePost } from "../model/use-mutation-delete-post"

interface PostDeleteButtonProps {
  postId?: number
}

function PostDeleteButton(props: PostDeleteButtonProps) {
  const { postId } = props

  const { deletePostMutation, isPending } = useMutationDeletePost({ postId })

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostMutation()} disabled={isPending}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export { PostDeleteButton }
