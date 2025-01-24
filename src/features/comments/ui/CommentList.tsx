import type { useDialog } from '@/features/dialog/model';
import { useSelectedPostStoreSelector } from '@/features/posts/model';
import { patch, remove } from '@/shared/api/fetch';

import {
  useCommentsStoreSelector,
  useNewCommentStoreSelector,
  useSelectedCommentStoreSelector,
} from '../model';
import { CommentAdd } from './CommentAdd';
import { CommentItem } from './CommentItem';

interface Props {
  postId: number;
  commentAddDialogState: ReturnType<typeof useDialog>;
  commentEditDialogState: ReturnType<typeof useDialog>;
}
// 댓글 렌더링
export const CommentList = ({ postId, commentAddDialogState, commentEditDialogState }: Props) => {
  const { comments, setComments } = useCommentsStoreSelector(['comments', 'setComments']);
  const { selectedPost } = useSelectedPostStoreSelector(['selectedPost']);
  const { setSelectedComment } = useSelectedCommentStoreSelector(['setSelectedComment']);
  const { newComment, updateNewComment } = useNewCommentStoreSelector([
    'newComment',
    'updateNewComment',
  ]);

  // 댓글 추가
  const onCommentAdd = async () => {
    commentAddDialogState.open();
    updateNewComment({ ...newComment, postId: selectedPost?.id });
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await remove(`/api/comments/${id}`);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id);
      if (!comment) return;

      const data = await patch(`/api/comments/${id}`, {
        likes: (comment.likes || 0) + 1,
      });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  return (
    <div className='mt-2'>
      <CommentAdd onCommentAdd={onCommentAdd} />
      <div className='space-y-1'>
        {comments[postId]?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onCommentEditDialogOpen={() => {
              setSelectedComment(comment);
              commentEditDialogState.open();
            }}
            onDelete={deleteComment}
            onLike={likeComment}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};
