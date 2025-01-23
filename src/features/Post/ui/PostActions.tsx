import { Edit2, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/';
import { Post } from '@/entities/Post';

interface PostActionsProps {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

export const PostActions = ({ post, onView, onEdit, onDelete }: PostActionsProps) => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="sm" onClick={() => onView(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
      <Edit2 className="w-4 h-4" />
    </Button>
    <Button variant="ghost" size="sm" onClick={() => onDelete(post.id.toString())}>
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);
