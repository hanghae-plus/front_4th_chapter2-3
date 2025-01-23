import { Button } from "@shared/ui";
import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { commentQueryKey, useCommentQuery } from "../model";
import { usePostQuery, usePostStore } from "@features/post";
import { useCommentStore } from "../model/useCommentStore";
import { highlightText } from "@shared/lib";
import { Comment, deleteComment, likeComment } from "@entities/comment/model";
import { useQueryClient } from "@tanstack/react-query";

const CommentRow = (comment: Comment) => {
  const { searchQuery } = usePostQuery();
  const { selectedPost } = usePostStore();
  const postId = selectedPost?.id ?? -1;

  const { data: comments } = useCommentQuery(postId);
  const { setSelectedComment, setShowEditCommentDialog } = useCommentStore();

  const queryClient = useQueryClient();

  // 댓글 삭제
  const deleteCommentAndUpdate = async (id: number, postId: number) => {
    await deleteComment(id);

    queryClient.setQueryData<Comment[]>(commentQueryKey.list(postId), (prev) =>
      prev?.filter((comment) => comment.id !== id),
    );
  };

  // 댓글 좋아요
  const likeCommentAndUpdate = async (id: number, postId: number) => {
    const updatedLikes = (comments?.find((c) => c.id === id)?.likes ?? 0) + 1;
    const data = await likeComment(id, updatedLikes);
    queryClient.setQueryData<Comment[]>(commentQueryKey.list(postId), (prev) =>
      prev?.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment)),
    );
  };

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => likeCommentAndUpdate(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment);
            setShowEditCommentDialog(true);
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteCommentAndUpdate(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CommentRow;
