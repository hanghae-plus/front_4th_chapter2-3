import { useAtom } from "jotai";
import { addCommentDialogAtom, newCommentAtom } from "../../../app/store/atom";
import { Textarea } from "../../../shared/ui";
import { Button } from "../../../shared/ui";
import { DialogWrapper } from "../../../shared/ui/dialog/DialogWrapper";
import { useComment } from "../hook/useComment";

export const DialogAddComment = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] =
    useAtom(addCommentDialogAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);

  const { handleAddComments } = useComment();

  return (
    <DialogWrapper
      open={showAddCommentDialog}
      onOpenChange={setShowAddCommentDialog}
      title="새 댓글 추가"
    >
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleAddComments}>댓글 추가</Button>
    </DialogWrapper>
  );
};
