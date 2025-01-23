import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/ui';
import usePostStore from '../model/use-post-store.ts';
import UserPreview from '../../user/ui/UserPreview.tsx';
import PostTitle from './PostTitle.tsx';
import LikeCell from './LikeCell.tsx';
import PostDetailButton from './PostDetailButton.tsx';
import PostEditButton from './PostEditButton.tsx';
import DeletePostButton from './DeletePostButton.tsx';

const PostTable = () => {
  const { posts } = usePostStore(['posts']);

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
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <PostTitle post={post} />
            </TableCell>
            <TableCell>
              <UserPreview user={post.author} />
            </TableCell>
            <TableCell>
              <LikeCell post={post} />
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <PostDetailButton post={post} />
                <PostEditButton post={post} />
                <DeletePostButton postId={post.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
