import { Plus } from 'lucide-react';

import { CommentList } from '@/features/comments/ui/CommentList';
import { useDialog, useUserDialog } from '@/features/dialog/model';
import { PostPagination } from '@/features/posts/ui/PostPagination';
import { PostSearchFilter } from '@/features/posts/ui/PostSearchFilter';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { CommentAddDialog, PostAddDialog, PostEditDialog, PostsTable } from '@/widgets/post/ui';
import { CommentEditDialog } from '@/widgets/post/ui/CommentEditDialog';
import { PostDetailDialog } from '@/widgets/post/ui/PostDetailDialog';
import { UserDialog } from '@/widgets/user/ui';

export const PostsManagerPage = () => {
  const postAddDialogState = useDialog();
  const postEditDialogState = useDialog();
  const postDetailDialogState = useDialog();
  const userDialogState = useUserDialog();
  const commentAddDialogState = useDialog();
  const commentEditDialogState = useDialog();

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
            onPostEditDialogOpen={postEditDialogState.open}
            onPostDetailDialogOpen={postDetailDialogState.open}
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
      <PostDetailDialog
        dialogState={postDetailDialogState}
        renderComments={(postId: number) => (
          <CommentList
            postId={postId}
            commentAddDialogState={commentAddDialogState}
            commentEditDialogState={commentEditDialogState}
          />
        )}
      />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog dialogState={commentAddDialogState} />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog dialogState={commentEditDialogState} />

      {/* 사용자 모달 */}
      <UserDialog dialogState={userDialogState} />
    </Card>
  );
};
