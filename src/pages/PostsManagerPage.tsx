import { UserDialog } from '@/widgets/user-dialog';
import { AddCommentDialog, EditCommentDialog } from '@/widgets/comment-dialog';
import { PostDetailDialog, EditPostDialog, AddPostDialog } from '@/widgets/post-dialog';
import PostsManagerHeader from '@/widgets/posts-manager-header/ui/PostsManagerHeader.tsx';
import { PostTable } from '@/widgets/posts-table';

import SearchBar from '@/widgets/search-bar/ui/SearchBar.tsx';

import { Card, CardContent } from '@/shared/ui';
import { PostsPagination } from '@/widgets/posts-pagination';
import { useFetchPosts } from '@/features/post/model';

const PostsManager = () => {
  const { isLoading } = useFetchPosts();
  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <PostsManagerHeader />
      <CardContent>
        <div className='flex flex-col gap-4'>
          <SearchBar />
          {isLoading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostTable />}
          <PostsPagination />
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
