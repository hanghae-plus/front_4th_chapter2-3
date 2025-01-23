import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui";
import { CommentRow } from "./CommentRow";
import { Comment } from "../model/types";
import { commentsAtom } from "../../../app/store/atom";
import { useAtom } from "jotai";

interface CommentItemProps {
  postId: number;
  onAdd: () => void;
  onEditComment: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  onAdd,
  onEditComment,
}) => {
  const [comments] = useAtom(commentsAtom);

  const flattenedComments = Object.values(comments).flat();

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
            onEditComment={() => onEditComment(comment)}
          />
        ))}
      </div>
    </div>
  );
};
