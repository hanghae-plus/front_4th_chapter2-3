import { Edit2, MessageSquare, Trash2 } from "lucide-react";
import { Button, TableCell } from "../../../shared/ui";
import { Post } from "../model/types";

interface PostIconsProps {
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

export const PostIcons: React.FC<PostIconsProps> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView}
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  );
};
