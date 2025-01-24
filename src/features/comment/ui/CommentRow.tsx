import { useAtomValue } from "jotai";
import { searchQueryAtom } from "../../../app/store/atom";
import { highlightText } from "../../../shared/lib/handleHighlightText";
import { Comment } from "../../../entities/comment/model/types";
import { CommentIcons } from "./CommentIcons";

interface CommentRowProps {
  comment: Comment;
}

export const CommentRow: React.FC<CommentRowProps> = ({ comment }) => {
  const searchQuery = useAtomValue(searchQueryAtom);

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
          {highlightText(comment.body, searchQuery)}
        </span>
      </div>
      <CommentIcons comment={comment} />
    </div>
  );
};
