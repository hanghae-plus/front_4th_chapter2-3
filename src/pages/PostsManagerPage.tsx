import { Suspense, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Pagination } from '../shared/ui';
import { PostItemType } from '../entities/post/model/types';
import { usePostStore } from '../features/post/model/store';
import {
  selectTotal,
  selectPagination,
  selectSearchQuery,
} from '../features/post/model/store/selectors';
import { useTagStore } from '../features/tag/model/store';
import { useCommentStore } from '../features/comment/model/store';
import { PostList } from '../features/post/ui/PostList';
import { PostFilter } from '../features/post/ui/PostFilter';
import { CommentForm } from '../features/comment/ui/CommentForm';
import { UserDetailDialog } from '../features/user/ui/UserDetailDialog';
import { PostDetailDialog } from '../features/post/ui/PostDetailDialog';
import { useQueryParams } from '../app/hooks/useQueryParams';
import { LoadingSpinner } from '../shared/ui/loading/LoadingSpinner';
import { ErrorBoundary } from '../shared/ui/error/ErrorBoundary';
import { PostFormDialog } from '../features/post/ui/PostFormDialog';

export const PostsManagerPage = () => {
  useQueryParams();

  const total = usePostStore(selectTotal);
  const { skip, limit } = usePostStore(selectPagination);
  const searchQuery = usePostStore(selectSearchQuery);
  const { setSelectedPost, setSkip, setLimit } = usePostStore();
  const { setSelectedTag } = useTagStore();
  const { setIsCommentFormOpen } = useCommentStore();

  // 다이얼로그 상태 관리
  const [dialogs, setDialogs] = useState({
    detail: false,
    form: false,
  });

  // 다이얼로그 상태 변경
  const handleDialogChange = (type: keyof typeof dialogs, isOpen: boolean) => {
    setDialogs((prev) => ({
      ...prev,
      [type]: isOpen,
    }));
  };

  const handleAddPost = () => {
    setSelectedPost({ userId: 1 } as PostItemType);
    setIsCommentFormOpen(true);
  };

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>게시물 관리자</span>
          <Button onClick={handleAddPost}>
            <Plus className='w-4 h-4 mr-2' />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <PostFilter onTagSelect={setSelectedTag} />

          <ErrorBoundary fallback={<div>게시물을 불러오는 중 오류가 발생했습니다.</div>}>
            <Suspense fallback={<LoadingSpinner />}>
              <PostList />
            </Suspense>
          </ErrorBoundary>

          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={setSkip}
            onLimitChange={setLimit}
          />
        </div>
      </CardContent>

      {/* 게시물 상세 다이얼로그 */}
      <PostDetailDialog
        searchQuery={searchQuery}
        isOpen={dialogs.detail}
        onOpenChange={(open: boolean) => handleDialogChange('detail', open)}
      />

      {/* 게시물 폼 다이얼로그 */}
      {dialogs.form && <PostFormDialog />}

      {/* 댓글 폼 */}
      <CommentForm />

      {/* 유저 상세 다이얼로그 */}
      <UserDetailDialog />
    </Card>
  );
};

export default PostsManagerPage;
