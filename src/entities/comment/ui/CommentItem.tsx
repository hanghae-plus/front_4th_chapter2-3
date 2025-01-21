import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui";
import { CommentRow } from "./CommentRow";
import { Comment } from "../model/types";

interface CommentItemProps {
  comments: Record<number, Comment[]>;
  postId: number;
  onAdd: () => void;
  onLikeComment: (comment: Comment) => void;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comments,
  onAdd,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  const flattenedComments = Object.values(comments).flat(); // ✅ 배열로 변환

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={onAdd}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {flattenedComments.map((comment: Comment) => (
          <CommentRow
            comment={comment}
            onLikeComment={() => {
              if (comment?.id && comment.postId) onLikeComment(comment);
            }}
            onEditComment={() => onEditComment(comment)}
            onDeleteComment={() => {
              if (comment?.id && comment.postId) onDeleteComment(comment);
            }}
          />
        ))}
      </div>
    </div>
  );
};
