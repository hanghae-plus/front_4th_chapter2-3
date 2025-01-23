import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';

import type { Post } from '@/entities/posts/model';
import type { User } from '@/entities/users/model';
import { useDeletePost } from '@/features/posts/api';
import { useQueryPostsWithUsers } from '@/features/posts/api/usePostsQueries';
import { useUrlParams } from '@/features/posts/lib';
import { useSelectedPostStore } from '@/features/posts/model';
import { HighlightedText } from '@/shared/ui/HighlightedText';

interface Props {
  onUserClick: (user: User) => void;
  onPostDetail: (post: Post) => void;
  onPostEditDialogOpen: () => void;
}
export const PostsTable = ({ onUserClick, onPostDetail, onPostEditDialogOpen }: Props) => {
  const { updateParams, ...params } = useUrlParams();
  const { data: posts } = useQueryPostsWithUsers({
    ...params,
  });
  const setSelectedPost = useSelectedPostStore((state) => state.setSelectedPost);
  const { mutateAsync: mutatePostDelete } = useDeletePost();

  // 게시물 삭제
  const handlePostDelete = async (id: number) => {
    try {
      await mutatePostDelete(id);
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  // 태그 선택
  const handleTagSelect = (tag: string) => {
    updateParams({ tag });
  };

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
        {posts?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className='space-y-1'>
                <div>
                  <HighlightedText text={post.title} highlight={params.search} />
                </div>
                <div className='flex flex-wrap gap-1'>
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        params.tag === tag
                          ? 'text-white bg-blue-500 hover:bg-blue-600'
                          : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={() => {
                        handleTagSelect(tag);
                      }}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          handleTagSelect(tag);
                        }
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className='flex items-center space-x-2 cursor-pointer'
                onClick={() => onUserClick(post.author)}
                onKeyUp={(e) => e.key === 'Enter' && onUserClick(post.author)}
              >
                <img
                  src={post.author?.image}
                  alt={post.author?.username}
                  className='w-8 h-8 rounded-full'
                />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <ThumbsUp className='w-4 h-4' />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className='w-4 h-4' />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='sm' onClick={() => onPostDetail(post)}>
                  <MessageSquare className='w-4 h-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    setSelectedPost(post);
                    onPostEditDialogOpen();
                  }}
                >
                  <Edit2 className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={() => handlePostDelete(post.id)}>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
