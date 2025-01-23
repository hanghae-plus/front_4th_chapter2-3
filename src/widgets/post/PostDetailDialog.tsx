import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@shared/ui";
import { usePostQuery, usePostStore } from "@features/post";
import { highlightText } from "@shared/lib";
import { Post } from "@entities/post";
import { CommentList } from "@widgets/comment";

const PostDetailDialog = () => {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostStore();
  const { searchQuery } = usePostQuery();

  return (
    <Dialog open={showPostDetailDialog && !!selectedPost} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText((selectedPost as Post)?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText((selectedPost as Post)?.body, searchQuery)}</p>
          {selectedPost?.id && <CommentList />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailDialog;
