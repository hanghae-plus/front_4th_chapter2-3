import { Button } from "@shared/button/ui";
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import { HighlightMatch } from "@shared/hightlight/ui/HighlightMatch.tsx";
import { useComment } from "@features/comment/model/useComment.ts";
import { useDialog } from "@shared/dialog/model/useDialog.ts";
import CommentModifyDialog from "@features/dialog/ui/CommentModifyDialog.tsx";
import { Comment } from "@/types/comment.ts";
import CommentAddDialog from "@features/dialog/ui/CommentAddDialog.tsx";
import { useSearchStore } from "@core/store/useSearchStore.ts";

interface CommentListProps {
  postId: number;
}

function CommentList({ postId }: CommentListProps) {
  const { open } = useDialog();
  const { searchQuery } = useSearchStore();
  const { comments, isLoading, addComment, deleteComment, likeComment, updateComment } = useComment(postId);

  const handleCommentModifyDialog = (selectedComment: Comment) => {
    open(<CommentModifyDialog selectedComment={selectedComment} updateComment={updateComment} />);
  };

  const handleCommentAddDialog = () => {
    open(<CommentAddDialog postId={postId} addComment={addComment} />);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleCommentAddDialog}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {!isLoading &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">{HighlightMatch(comment.body, searchQuery)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCommentModifyDialog(comment)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentList;
