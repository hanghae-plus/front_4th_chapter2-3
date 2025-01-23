import { Comment } from "@/entities/comments"
import { Button, Textarea } from "@/shared"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useMutationUpdateComment } from "../model/use-mutation-update-comment"

interface CommentEditFormProps {
  comment: Comment
}

function CommentEditForm(props: CommentEditFormProps) {
  const { comment } = props

  const [selectedComment, setSelectedComment] = useState<Comment>(comment)
  const { updateComment, isPending } = useMutationUpdateComment({ selectedComment })

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={selectedComment?.body || ""}
        onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
      />
      <DialogClose asChild>
        <Button onClick={() => updateComment()} disabled={isPending}>
          댓글 업데이트
        </Button>
      </DialogClose>
    </div>
  )
}

export { CommentEditForm }
