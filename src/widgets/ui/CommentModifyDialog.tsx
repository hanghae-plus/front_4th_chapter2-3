import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, Textarea, Button, useModal } from "../../shared";
import { Comment, updateComment } from "../../entities";

export function CommentModifyDialog({
  comment,
  setSelectedComment,
  setComments,
}: {
  comment: Comment;
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  setComments: React.Dispatch<React.SetStateAction<Record<number, Comment[]>>>;
}) {
  const { handleModalToggle, isOpenModal } = useModal("modifyCommentModal");

  // 댓글 업데이트
  const modifyComment = async () => {
    try {
      const data = await updateComment({ comment });
      setComments((prev) => ({
        ...prev,
        [data.postId!]: prev[data.postId!].map((comment) => (comment.id === data.id ? data : comment)),
      }));
      handleModalToggle();
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleModalToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment?.body || ""}
            onChange={(e) => setSelectedComment({ ...comment!, body: e.target.value })}
          />
          <Button onClick={modifyComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
