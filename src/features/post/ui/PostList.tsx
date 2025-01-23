import { usePostStore } from '../model/store';
import { Table, TableHeader, TableBody, TableHead, TableRow } from '../../../shared/ui';
import { PostListItem } from './PostListItem';
import { selectPostList, selectSearchQuery } from '../model/store/selectors';

/**
 * 게시물 목록 컴포넌트
 * 게시물 목록을 표시하고 검색 및 필터링 기능을 제공
 */
export const PostList = () => {
  const postList = usePostStore(selectPostList);
  const searchQuery = usePostStore(selectSearchQuery);

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
        {postList.map((post) => (
          <PostListItem key={post.id} post={post} searchQuery={searchQuery} />
        ))}
      </TableBody>
    </Table>
  );
};
