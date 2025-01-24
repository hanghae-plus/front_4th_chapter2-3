import { ThumbsDown, ThumbsUp } from "lucide-react";
import { TableCell } from "../../../shared/ui";

interface PostReactionsProps {
  likes: number;
  dislikes: number;
}

export const PostReactions: React.FC<PostReactionsProps> = ({
  likes,
  dislikes,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{likes}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{dislikes}</span>
      </div>
    </TableCell>
  );
};
