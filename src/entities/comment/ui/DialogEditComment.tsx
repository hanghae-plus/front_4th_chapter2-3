import { useAtom } from "jotai";
import {
  editCommentDialogAtom,
  selectedCommentAtom,
} from "../../../app/store/atom";
import { Button } from "../../../shared/ui";
import { Textarea } from "../../../shared/ui";
import { DialogWrapper } from "../../../shared/ui/dialog/DialogWrapper";
import { useComment } from "../lib/useComment";

export const DialogEditComment = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    editCommentDialogAtom
  );
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);

  const { handleUpdateComments } = useComment();

  return (
    <DialogWrapper
      open={showEditCommentDialog}
      onOpenChange={setShowEditCommentDialog}
      title="댓글 수정"
    >
      <Textarea
        placeholder="댓글 내용"
        value={selectedComment?.body || ""}
        onChange={(e) =>
          setSelectedComment({ ...selectedComment, body: e.target.value })
        }
      />
      <Button onClick={handleUpdateComments}>댓글 업데이트</Button>
    </DialogWrapper>
  );
};
