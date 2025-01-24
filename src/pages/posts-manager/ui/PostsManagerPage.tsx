import { Plus } from 'lucide-react';
import { useState } from 'react';

import type { Comment } from '@/entities/comments/model';
import type { Post } from '@/entities/posts/model';
import { useCommentsStoreSelector } from '@/features/comments/model/useCommentsStore';
import { useNewCommentStoreSelector } from '@/features/comments/model/useNewCommentStore';
import { CommentAdd } from '@/features/comments/ui/CommentAdd';
import { CommentItem } from '@/features/comments/ui/CommentItem';
import { useDialog, useUserDialog } from '@/features/dialog/model';
import { CustomDialog } from '@/features/dialog/ui/CustomDialog';
import { useSelectedPostStore } from '@/features/posts/model';
import { PostPagination } from '@/features/posts/ui/PostPagination';
import { PostSearchFilter } from '@/features/posts/ui/PostSearchFilter';
import { get, patch, put, remove } from '@/shared/api/fetch';
import { Button, Card, CardContent, CardHeader, CardTitle, Textarea } from '@/shared/ui';
import { CommentAddDialog, PostAddDialog, PostEditDialog, PostsTable } from '@/widgets/post/ui';
import { PostDetailDialog } from '@/widgets/post/ui/PostDetailDialog';
import { UserDialog } from '@/widgets/user/ui';

export const PostsManagerPage = () => {
  // 상태 관리
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { selectedPost, setSelectedPost } = useSelectedPostStore();
  const { comments, setComments } = useCommentsStoreSelector(['comments', 'setComments']);
  const { newComment, updateNewComment } = useNewCommentStoreSelector([
    'newComment',
    'updateNewComment',
  ]);

  const postAddDialogState = useDialog();
  const postEditDialogState = useDialog();
  const postDetailDialogState = useDialog();
  const userDialogState = useUserDialog();
  const commentAddDialogState = useDialog();
  const commentEditDialogState = useDialog();

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await get(`/api/comments/post/${postId}`);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment || !selectedComment.id) return;
    try {
      const data = await put(`/api/comments/${selectedComment.id}`, { body: selectedComment.body });

      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }));
      commentEditDialogState.close();
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

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

  // 게시물 상세 보기
  const onPostDetailOpen = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    postDetailDialogState.open();
  };

  // 댓글 렌더링
  const renderComments = (postId: number) => (
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

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>게시물 관리자</span>
          <Button onClick={postAddDialogState.open}>
            <Plus className='w-4 h-4 mr-2' />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchFilter />
          {/* 게시물 테이블 */}
          <PostsTable
            onUserClick={userDialogState.onOpenUserDialog}
            onPostDetail={onPostDetailOpen}
            onPostEditDialogOpen={postEditDialogState.open}
          />
          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog dialogState={postAddDialogState} />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog dialogState={postEditDialogState} />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog dialogState={postDetailDialogState} renderComments={renderComments} />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog dialogState={commentAddDialogState} />

      {/* 댓글 수정 대화상자 */}
      <CustomDialog
        open={commentEditDialogState.isOpen}
        onOpenChange={commentEditDialogState.close}
        title='댓글 수정'
      >
        <Textarea
          placeholder='댓글 내용'
          value={selectedComment?.body || ''}
          onChange={(e) =>
            selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })
          }
        />
        <Button onClick={updateComment}>댓글 업데이트</Button>
      </CustomDialog>

      {/* 사용자 모달 */}
      <UserDialog dialogState={userDialogState} />
    </Card>
  );
};
