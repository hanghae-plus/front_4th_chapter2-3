import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "../../../shared/ui";
import { Comment } from "../../../entities/comment/model/types";
import { useComment } from "../../../entities/comment/lib/useComment";

interface CommentIconsProps {
  comment: Comment;
}

export const CommentIcons: React.FC<CommentIconsProps> = ({ comment }) => {
  const {
    handleDeleteComments,
    handleLikeComments,
    handleShowUpdateCommentModal,
  } = useComment();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (comment?.id && comment.postId)
            handleLikeComments(comment?.id, comment.postId);
        }}
      >
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShowUpdateCommentModal(comment)}
      >
        <Edit2 className="w-3 h-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (comment?.id && comment.postId)
            handleDeleteComments(comment.id, comment.postId);
        }}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};
