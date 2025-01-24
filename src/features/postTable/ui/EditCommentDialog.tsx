import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Edit2 } from "lucide-react"
import { Comment } from "../../../entities/comments/model/types"
import { useState } from "react"
import { useUpdateComment } from "../model/useUpdateComment"

export const EditCommentDialog = ({ comment }: { comment: Comment }) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const { onUpdateComment } = useUpdateComment(comment.postId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => {
              if (!selectedComment) return
              setSelectedComment({ ...selectedComment, body: e.target.value })
            }}
          />

          <Button onClick={() => onUpdateComment(selectedComment)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
