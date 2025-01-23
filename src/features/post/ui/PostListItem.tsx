import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { Button, TableCell, TableRow } from '../../../shared/ui';
import { PostItemType } from '../../../entities/post/model/types';
import { usePostStore } from '../model/store';
import { useUserStore } from '../../../features/user/model/store';
import { useCommentStore } from '../../../features/comment/model/store';
import { useTagStore } from '../../../features/tag/model/store';
import { highlightText } from '../../../shared/lib/utils/highlight';
import { useDeletePost } from '../api/mutations';

interface PostListItemProps {
  post: PostItemType;
  searchQuery: string;
}

/**
 * 게시물 목록 아이템 컴포넌트
 * 각 게시물의 정보를 표시하고 편집 및 삭제 기능을 제공
 */
export const PostListItem = ({ post, searchQuery }: PostListItemProps) => {
  const { setSelectedPost } = usePostStore();
  const { setIsUserDetailOpen } = useUserStore();
  const { setIsCommentFormOpen } = useCommentStore();
  const { selectedTag, setSelectedTag } = useTagStore();
  const { mutate: handleDeletePost } = useDeletePost();

  const handleUserClick = () => {
    if (post.author) {
      setIsUserDetailOpen(true);
      setSelectedPost(post);
    }
  };

  const handlePostDetail = () => {
    setSelectedPost(post);
  };

  const handleEditPost = () => {
    setSelectedPost(post);
    setIsCommentFormOpen(true);
  };

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className='space-y-1'>
          <div dangerouslySetInnerHTML={{ __html: highlightText(post.title, searchQuery) }} />
          <div className='flex flex-wrap gap-1'>
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? 'text-white bg-blue-500 hover:bg-blue-600'
                    : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2 cursor-pointer' onClick={handleUserClick}>
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
          <Button variant='ghost' size='sm' onClick={handlePostDetail}>
            <MessageSquare className='w-4 h-4' />
          </Button>
          <Button variant='ghost' size='sm' onClick={handleEditPost}>
            <Edit2 className='w-4 h-4' />
          </Button>
          <Button variant='ghost' size='sm' onClick={() => handleDeletePost(post.id)}>
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
