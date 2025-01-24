import { DialogContent, DialogHeader, DialogTitle } from "@shared/dialog/ui";
import { HighlightMatch } from "@shared/hightlight/ui/HighlightMatch.tsx";
import { Post } from "@/types/post.ts";
import CommentList from "@features/comment/ui/CommentList.tsx";
import { useSearchStore } from "@core/store/useSearchStore.ts";

interface PostDetailDialogProps {
  selectedPost: Post;
}

function PostDetailDialog({ selectedPost }: PostDetailDialogProps) {
  const { searchQuery } = useSearchStore();

  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{HighlightMatch(selectedPost?.title, searchQuery)}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>{HighlightMatch(selectedPost?.body, searchQuery)}</p>
        <CommentList postId={selectedPost.id} />
      </div>
    </DialogContent>
  );
}

export default PostDetailDialog;
