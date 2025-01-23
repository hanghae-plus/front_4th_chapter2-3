import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Textarea } from "@shared/ui";
import { Comment, updateComment } from "@entities/comment/model";
import { useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "@features/post";
import { commentQueryKey, useCommentStore } from "@features/comment";

const CommentEditDialog = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } = useCommentStore();

  const { selectedPost } = usePostStore();

  const queryClient = useQueryClient();

  const editCommentAndUpdate = async () => {
    if (!selectedComment) return;
    const data = await updateComment(selectedComment);

    if (!selectedPost) return;
    queryClient.setQueryData<Comment[]>(commentQueryKey.list(selectedPost.id), (prev) => [...(prev || []), data]);

    setShowEditCommentDialog(false);
  };

  return (
    <Dialog open={showEditCommentDialog && !!selectedComment} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
          />
          <Button onClick={editCommentAndUpdate}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentEditDialog;
