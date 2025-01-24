import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader, Textarea, Button, useModal } from "../../shared";
import { Comment, createComment } from "../../entities";

export function CommentAddDialog({
  newComment,
  setNewComment,
  setComments,
}: {
  newComment: Comment;
  setNewComment: React.Dispatch<React.SetStateAction<Comment>>;
  setComments: React.Dispatch<React.SetStateAction<Record<number, Comment[]>>>;
}) {
  const { handleModalToggle, isOpenModal } = useModal("addCommentModal");

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await createComment({ newComment: newComment });
      setComments((prev) => ({
        ...prev,
        [data.postId!]: [...(prev[data.postId!] || []), data],
      }));

      handleModalToggle();

      setNewComment({
        id: 0,
        body: "",
        postId: null,
        likes: 0,
        user: null,
      });
    } catch (error) {
      console.error("댓글 추가 오류:", error);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleModalToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
