import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { TableCell, TableRow } from '../../../shared/ui/table';
import { highlightText } from '../../../shared/lib';
import { Post } from 'src/shared/types';
import { DeletePostButton, OpenEditDialogButton, OpenPostDetailButton } from '.';
import { PostUserButton } from './PostUserButton';
import { useSearchStore } from '../model/searchStore';

interface PostsTableRowProps {
  post: Post;
}

export const PostsTableRow = ({ post }: PostsTableRowProps) => {
  const { searchQuery, selectedTag, setSelectedTag } = useSearchStore();

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <>
      <TableRow key={post.id}>
        <TableCell>{post.id}</TableCell>
        <TableCell>
          <div className='space-y-1'>
            <div>{highlightText(post.title, searchQuery)}</div>
            <div className='flex flex-wrap gap-1'>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                    selectedTag === tag
                      ? 'text-white bg-blue-500 hover:bg-blue-600'
                      : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <PostUserButton author={post.author} />
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
            <OpenPostDetailButton post={post} />
            <OpenEditDialogButton post={post} />
            <DeletePostButton post={post} />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
