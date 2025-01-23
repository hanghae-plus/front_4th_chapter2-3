import { Dialog, DialogContent, DialogTitle, Button, DialogHeader, Textarea } from "@shared/ui";
import { addComment, Comment } from "@entities/comment/model";
import { useQueryClient } from "@tanstack/react-query";
import { usePostStore } from "@features/post";
import { commentQueryKey, useCommentQuery, useCommentStore } from "@features/comment";

const CommentAddDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useCommentStore();

  const { selectedPost } = usePostStore();
  const postId = selectedPost?.id ?? -1;

  const { data: comments } = useCommentQuery(postId);

  const queryClient = useQueryClient();

  const addCommentAndUpdate = async () => {
    const data = await addComment(newComment);

    if (!selectedPost) return;

    queryClient.setQueryData<Comment[]>(commentQueryKey.list(selectedPost.id), [...(comments || []), data]);

    setShowAddCommentDialog(false);
    setNewComment({ body: "", postId: null, userId: 1 });
  };

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
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
          <Button onClick={addCommentAndUpdate}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentAddDialog;
