import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "../../../shared/ui";
import { Comment } from "../model/types";

interface CommentIconsProps {
  comment: Comment;
  onLikeComment: (commentId: number, postId: number) => void;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number, postId: number) => void;
}

export const CommentIcons: React.FC<CommentIconsProps> = ({
  comment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (comment?.id && comment.postId)
            onLikeComment(comment?.id, comment.postId);
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
            onDeleteComment(comment.id, comment.postId);
        }}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};
