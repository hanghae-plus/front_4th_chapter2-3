import { useAtom } from 'jotai';
import { postsAtom } from '../model/store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/ui';
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from 'lucide-react';

export const PostsTable = () => {
  const [{ posts, filters }] = useAtom(postsAtom);

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
            <TableCell>
              <div className='space-y-1'>
                <div>{post.title}</div>
                <div className='flex gap-1'>
                  {post.tags?.map((tag) => (
                    <span key={tag} className='px-2 py-1 text-xs bg-blue-100 rounded'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
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
                <button className='p-1 hover:bg-gray-100 rounded'>
                  <MessageSquare className='w-4 h-4' />
                </button>
                <button className='p-1 hover:bg-gray-100 rounded'>
                  <Edit2 className='w-4 h-4' />
                </button>
                <button className='p-1 hover:bg-gray-100 rounded'>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
