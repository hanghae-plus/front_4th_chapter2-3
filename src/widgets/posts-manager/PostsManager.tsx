import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { postsAtom } from '../../features/posts/model/store';
import { PostsTable } from '../../features/posts/ui/PostsTable';
import { PostFilters } from '../../features/posts/ui/PostFilters';
import { Pagination } from '../../features/posts/ui/Pagination';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/ui';

export const PostsManager = () => {
  const [{ pagination, filters }, setPosts] = useAtom(postsAtom);

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader>
        <CardTitle>게시물 관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <PostFilters />
          <PostsTable />
          <Pagination />
        </div>
      </CardContent>
    </Card>
  );
};
