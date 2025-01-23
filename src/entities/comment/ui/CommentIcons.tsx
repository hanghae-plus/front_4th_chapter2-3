import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "../../../shared/ui";
import { Comment } from "../model/types";
import { useComment } from "../lib/useComment";

interface CommentIconsProps {
  comment: Comment;
  onEditComment: (comment: Comment) => void;
}

export const CommentIcons: React.FC<CommentIconsProps> = ({
  comment,
  onEditComment,
}) => {
  const { handleDeleteComments, handleLikeComments } = useComment();

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
        onClick={() => onEditComment(comment)}
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
