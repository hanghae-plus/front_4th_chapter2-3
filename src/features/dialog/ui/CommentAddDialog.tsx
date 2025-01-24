import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { Button } from "@shared/button/ui";
import { Textarea } from "@shared/textarea/ui";
import { AddCommentRequest } from "@/types/comment.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";

interface CommentAddDialogProps {
  postId: number;
  addComment: (request: AddCommentRequest, onComplete: () => void) => void;
}

function CommentAddDialog({ postId, addComment }: CommentAddDialogProps) {
  const [newComment, setNewComment] = useState<string>("");
  const { close } = useDialog();

  const handleAddComment = () => {
    addComment({ postId: postId, body: newComment }, close);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>새 댓글 추가</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea placeholder="댓글 내용" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button onClick={handleAddComment}>댓글 추가</Button>
      </div>
    </DialogContent>
  );
}

export default CommentAddDialog;
