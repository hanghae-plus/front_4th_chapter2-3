import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "@shared/ui";
import { usePostQuery, usePostStore } from "../model";
import { highlightText } from "@shared/lib";
import CommentList from "@features/comment/ui/CommentList";
import { Post } from "@entities/post";

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
