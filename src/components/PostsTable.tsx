import React, { JSX } from 'react';
import { Post } from '../models/type';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shared/ui';
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';

interface PostsTableProps {
  posts: Post[];
  searchQuery: string;
  onOpenPostDetail: (post: Post) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: number) => void;
  highlightText: (text: string, highlight: string) => JSX.Element | null;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  searchQuery,
  onOpenPostDetail,
  onEditPost,
  onDeletePost,
  highlightText,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>반응</TableHead>
          <TableHead>작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>{highlightText(post.title, searchQuery)}</TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
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
                <Button variant='ghost' size='sm' onClick={() => onOpenPostDetail(post)}>
                  <MessageSquare className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={() => onEditPost(post)}>
                  <Edit2 className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={() => onDeletePost(post.id)}>
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

export default PostsTable;
