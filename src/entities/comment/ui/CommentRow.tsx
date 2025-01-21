import { Comment } from "../model/types";
import { CommentIcons } from "./CommentIcons";

interface CommentRowProps {
  comment: Comment;
  onLikeComment: (commentId: number, postId: number) => void;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number, postId: number) => void;
}

export const CommentRow: React.FC<CommentRowProps> = ({
  comment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  return (
    <div
      key={comment.id}
      className="flex items-center justify-between text-sm border-b pb-1"
    >
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">
          {comment.user?.username || ""}:
        </span>
        <span className="truncate">
          룰루랄라 have to fix
          {/* {highlightText(comment.body, searchQuery)} */}
        </span>
      </div>
      <CommentIcons
        comment={comment}
        onLikeComment={() => {
          if (comment?.id && comment.postId)
            onLikeComment(comment.id, comment.postId);
        }}
        onEditComment={() => onEditComment(comment)}
        onDeleteComment={() => {
          if (comment?.id && comment.postId)
            onDeleteComment(comment.id, comment.postId);
        }}
      />
    </div>
  );
};
