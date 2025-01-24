import { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { Button } from "@shared/button/ui";
import { Textarea } from "@shared/textarea/ui";
import { Comment } from "@/types/comment.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";

interface CommentModifyDialogProps {
  selectedComment: Comment;
  updateComment: (comment: Comment, onComplete: () => void) => void;
}
function CommentModifyDialog({ selectedComment, updateComment }: CommentModifyDialogProps) {
  const [editingComment, setEditingComment] = useState<Comment>({ ...selectedComment });
  const { close } = useDialog();

  const handleUpdateComment = () => {
    updateComment(editingComment, close);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>댓글 수정</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={editingComment?.body || ""}
          onChange={(e) => setEditingComment({ ...selectedComment, body: e.target.value })}
        />
        <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
      </div>
    </DialogContent>
  );
}

export default CommentModifyDialog;
