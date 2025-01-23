import type { Post } from '@/entities/posts/model';
import type { User } from '@/entities/users/model';
import { useDeletePost } from '@/features/posts/api';
import { usePostsStoreSelector } from '@/features/posts/model';
import { useSelectedPostStore } from '@/features/posts/model/useSelectedPostStore';
import { useSelectedTagsStore } from '@/features/tags/model';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { HighlightedText } from '@/shared/ui/HighlightedText';
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';

interface Props {
  searchQuery: string;
  updateURL: () => void;
  onUserClick: (user: User) => void;
  onPostDetail: (post: Post) => void;
  onPostAddDialogOpen: () => void;
}
export const PostsTable = ({
  searchQuery,
  updateURL,
  onUserClick,
  onPostDetail,
  onPostAddDialogOpen,
}: Props) => {
  const { posts, deletePost } = usePostsStoreSelector(['posts', 'deletePost']);
  const { mutateAsync: mutatePostDelete } = useDeletePost();
  const { selectedTag, setSelectedTag } = useSelectedTagsStore();
  const setSelectedPost = useSelectedPostStore((state) => state.setSelectedPost);

  // 게시물 삭제
  const handlePostDelete = async (id: number) => {
    try {
      await mutatePostDelete(id, {
        onSuccess: () => {
          deletePost(id);
        },
      });
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
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
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className='space-y-1'>
                <div>
                  <HighlightedText text={post.title} highlight={searchQuery} />
                </div>
                <div className='flex flex-wrap gap-1'>
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? 'text-white bg-blue-500 hover:bg-blue-600'
                          : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={() => {
                        setSelectedTag(tag);
                        updateURL();
                      }}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          setSelectedTag(tag);
                          updateURL();
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
                    onPostAddDialogOpen();
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
