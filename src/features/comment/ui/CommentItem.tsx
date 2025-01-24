import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui";
import { CommentRow } from "./CommentRow";
import { Comment } from "../../../entities/comment/model/types";
import { commentsAtom } from "../../../app/store/atom";
import { useAtomValue } from "jotai";
import { useComment } from "../../../entities/comment/hook/useComment";

export const CommentItem: React.FC = () => {
  const comments = useAtomValue(commentsAtom);

  const { handleShowAddCommentModal } = useComment();

  const flattenedComments = Object.values(comments).flat();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={handleShowAddCommentModal}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {flattenedComments.map((comment: Comment) => (
          <CommentRow
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};
