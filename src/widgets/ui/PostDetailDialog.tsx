import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useModal, Button, DialogHeader, highlightText } from "../../shared";
import { Comment, deleteComment, Post } from "../../entities";
import { Plus, ThumbsUp, Edit2, Trash2 } from "lucide-react";
import { likeComment } from "../../features";

export function PostDetailDialog({
  post,
  searchQuery,
  comments,
  setComments,
  setNewComment,
  setSelectedComment,
}: {
  post: Post;
  searchQuery: string;
  comments: Record<Post["id"], Comment[]>;
  setComments: React.Dispatch<React.SetStateAction<Record<number, Comment[]>>>;
  setNewComment: React.Dispatch<React.SetStateAction<Comment>>;
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>;
}) {
  const { handleModalToggle, isOpenModal } = useModal("postDetailModal");
  const { handleModalToggle: toggleCommentModal } = useModal("addCommentModal");

  // 댓글 삭제
  const removeComment = async (id: Comment["id"], postId: Post["id"]) => {
    try {
      await deleteComment({ commentId: id });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  // 댓글 좋아요
  const increaseLikeComment = async (id: Comment["id"], postId: Post["id"]) => {
    try {
      const data = await likeComment({
        commentId: id,
        likes: (comments?.[postId]?.find?.((c) => c.id === id)?.likes ?? 0) + 1,
      });

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  // 댓글 렌더링
  const renderComments = (postId: Post["id"], comments: Comment[]) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }) as Comment);
            toggleCommentModal();
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => increaseLikeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment);
                  toggleCommentModal();
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => removeComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpenModal} onOpenChange={handleModalToggle}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title ?? "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body ?? "", searchQuery)}</p>
          {renderComments(post.id ?? 0, comments?.[post.id] ?? [])}
        </div>
      </DialogContent>
    </Dialog>
  );
}
