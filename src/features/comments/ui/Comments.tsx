import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import {
  CommentAddModal,
  CommentUpdateModal,
  useMutationDeleteComment,
  useMutationUpdateComment,
  useSuspenseQueryGetComments,
} from "@/features/comments";
import { useModalStore } from "@/features/modal";

import { Comment } from "@/entities/comments";
import { Post } from "@/entities/posts";

import { Button, HighlightText } from "@/shared/ui";

interface CommentsProps {
  postId: Post["id"];
}

export const Comments = ({ postId }: CommentsProps) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    data: { comments },
  } = useSuspenseQueryGetComments(postId);
  const { mutate: deleteComment } = useMutationDeleteComment();
  const { mutate: updateComment } = useMutationUpdateComment();

  const { open } = useModalStore();

  const handleOpenCommentAddModal = () => {
    open(<CommentAddModal postId={postId} />);
  };

  const handleOpenCommentUpdateModal = (comment: Comment) => {
    open(<CommentUpdateModal comment={comment} />);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleOpenCommentAddModal}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">
                <HighlightText text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => updateComment({ id: comment.id, postId })}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleOpenCommentUpdateModal(comment)}>
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
