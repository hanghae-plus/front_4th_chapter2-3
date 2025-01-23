import { Comment } from "@/entities/comments"
import { Button, Textarea } from "@/shared"
import { useState } from "react"
import { useMutationAddComment } from "../model/use-mutation-add-comment"

interface CommentAddFormProps {
  postId?: number
}

function CommentAddForm(props: CommentAddFormProps) {
  const { postId } = props

  const [newComment, setNewComment] = useState<Comment>({
    body: "",
    postId: postId || 0,
    user: {
      id: 1,
      username: "",
      fullName: "",
    },
    likes: 0,
    id: 0,
  })

  const { addCommentMutation, isPending } = useMutationAddComment({ newComment })

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button disabled={isPending} onClick={() => addCommentMutation()}>
        댓글 추가
      </Button>
    </div>
  )
}

export { CommentAddForm }
