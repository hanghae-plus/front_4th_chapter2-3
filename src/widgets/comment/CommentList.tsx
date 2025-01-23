import { Button } from "@shared/ui";
import { Plus } from "lucide-react";
import { useCommentQuery, useCommentStore } from "@features/comment";
import { usePostStore } from "@features/post";
import CommentRow from "./CommentRow";

const CommentList = () => {
  const { selectedPost } = usePostStore();
  const postId = selectedPost?.id ?? -1;

  const { data: comments } = useCommentQuery(postId);
  const { newComment, setNewComment, setShowAddCommentDialog } = useCommentStore();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment({ ...newComment, postId });
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">{comments?.map((comment) => <CommentRow {...comment} />)}</div>
    </div>
  );
};

export default CommentList;
