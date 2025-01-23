import { Comment } from "@/entities/comments"
import { Button } from "@/shared"
import { Trash2 } from "lucide-react"
import { useMutationDeleteComment } from "../model/use-mutation-delete-mutation"

interface CommentDeleteButtonProps {
  comment: Comment
}

function CommentDeleteButton(props: CommentDeleteButtonProps) {
  const { comment } = props

  const { deleteCommentMutation, isPending } = useMutationDeleteComment({ comment })

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteCommentMutation()} disabled={isPending}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export { CommentDeleteButton }
