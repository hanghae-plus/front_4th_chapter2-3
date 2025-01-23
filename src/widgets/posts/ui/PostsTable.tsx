import { usePostStore } from '../../../features/posts/model/store';
import { PostsTableRow } from '../../../features/posts/ui';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../shared/ui/table';

export const PostsTable = () => {
  const { posts } = usePostStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className='w-[150px]'>작성자</TableHead>
          <TableHead className='w-[150px]'>반응</TableHead>
          <TableHead className='w-[150px]'>작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostsTableRow key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  );
};
