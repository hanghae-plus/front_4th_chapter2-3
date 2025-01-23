import UserDialog from '@/features/user/ui/UserDialog.tsx';
import PostDetailDialog from '@/features/post/ui/PostDetailDialog.tsx';
import { AddCommentDialog, EditCommentDialog } from '@/features/comment/ui';
import EditPostDialog from '@/features/post/ui/EditPostDialog.tsx';
import AddPostDialog from '@/features/post/ui/AddPostDialog.tsx';
import PostTable from '@/features/post/ui/PostTable.tsx';
import Pagination from '@/features/search/ui/Pagination.tsx';
import SearchBar from '@/features/search/ui/SearchBar.tsx';
import PostHeader from '@/features/post/ui/PostHeader.tsx';
import { usePostStore } from '@/features/post/model';
import { Card, CardContent } from '@/shared/ui';

const PostsManager = () => {
  const loading = usePostStore((state) => state.loading);
  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <PostHeader />
      <CardContent>
        <div className='flex flex-col gap-4'>
          <SearchBar />
          {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostTable />}
          <Pagination />
        </div>
      </CardContent>
      <AddPostDialog />
      <EditPostDialog />
      <AddCommentDialog />
      <EditCommentDialog />
      <PostDetailDialog />
      <UserDialog />
    </Card>
  );
};
export default PostsManager;
