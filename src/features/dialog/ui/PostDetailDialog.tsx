import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { useDialog } from "@shared/dialog/model/useDialog.ts";
import { HighlightMatch } from "@shared/hightlight/ui/HighlightMatch.tsx";
import { Post } from "@/types/post.ts";
import { usePostStore } from "@core/store/usePostStore.ts";
import CommentList from "@features/comment/ui/CommentList.tsx";

interface PostDetailDialogProps {
  selectedPost: Post;
}

function PostDetailDialog({ selectedPost }: PostDetailDialogProps) {
  const { filters } = usePostStore();

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{HighlightMatch(selectedPost?.title, filters.searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{HighlightMatch(selectedPost?.body, filters.searchQuery)}</p>
        <CommentList postId={String(selectedPost.id)} />
      </div>
    </DialogContent>
  );
}

export default PostDetailDialog;
