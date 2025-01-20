import { Comment } from "../../types";
import { Button } from "../../../shared/ui";
import { ThumbsUp, Edit2, Trash2 } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
  onEdit?: (comment: Comment) => void;
  onDelete?: (id: number) => void;
  onLike?: (id: number) => void;
}

export const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  onLike,
}: CommentItemProps) => (
  <div className="flex items-center justify-between border-b pb-2">
    <div className="flex items-center space-x-2">
      <span className="font-medium">{comment.user.username}:</span>
      <span>{comment.body}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" onClick={() => onLike?.(comment.id)}>
        <ThumbsUp className="w-4 h-4" />
        <span className="ml-1">{comment.likes}</span>
      </Button>
      {onEdit && (
        <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  </div>
);