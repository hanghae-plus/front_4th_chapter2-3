import { Card, CardContent } from '../shared/ui';
import UserDialog from './user/ui/UserDialog.tsx';
import PostDetailDialog from './post/ui/PostDetailDialog.tsx';
import EditCommentDialog from './comment/ui/EditCommentDialog.tsx';
import AddCommentDialog from './comment/ui/AddCommentDialog.tsx';
import EditPostDialog from './post/ui/EditPostDialog.tsx';
import AddPostDialog from './post/ui/AddPostDialog.tsx';
import PostTable from './post/ui/PostTable.tsx';
import Pagination from './search/ui/Pagination.tsx';
import SearchBar from './search/ui/SearchBar.tsx';
import PostHeader from './post/ui/PostHeader.tsx';
import usePostStore from '../features/post/model/usePostStore.ts';

const PostsManager = () => {
  const { loading } = usePostStore(['loading']);
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
