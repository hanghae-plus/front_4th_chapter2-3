import {
  Button,
  HighlightText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/ui';
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import usePostStore from '../model/usePostStore.ts';
import useSearchStore from '../../search/model/useSearchStore.ts';
import { Post } from '../../../entities/post/model';
import { getComments } from '../../../entities/comments/api';
import useCommentStore from '../../comment/model/useCommentStore.ts';
import { UserThumbnail } from '../../../entities/user/model';
import { deletePost } from '../../../entities/post/api';
import { getUser } from '../../../entities/user/api';
import { useUserStore } from '../../user/model/useUserStore.ts';
import { useNavigate } from 'react-router-dom';

const PostTable = () => {
  const navigate = useNavigate();
  const { posts, setPosts, setSelectedPost, setShowEditDialog, setShowPostDetailDialog } =
    usePostStore([
      'posts',
      'setPosts',
      'setSelectedPost',
      'setShowEditDialog',
      'setShowPostDetailDialog',
    ]);
  const { searchQuery, selectedTag, setSelectedTag, updateParams } = useSearchStore([
    'searchQuery',
    'setSelectedTag',
    'selectedTag',
    'updateParams',
  ]);
  const { setComments, comments } = useCommentStore(['comments', 'setComments']);
  const { setSelectedUser, setShowUserModal } = useUserStore([
    'setSelectedUser',
    'setShowUserModal',
  ]);

  const updateURL = () => {
    navigate(updateParams());
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id).then(() => setShowPostDetailDialog(true));
  };

  // 사용자 모달 열기
  const openUserModal = async (user: UserThumbnail | undefined) => {
    if (!user) return;
    try {
      const userData = await getUser(user.id);
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    try {
      const data = await getComments(postId);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  // 게시물 삭제
  const removePost = async (id: number) => {
    const post = posts.find((post) => post.id === id);
    if (!post) return;
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
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
                  <HighlightText text={post.title} highlight={searchQuery} />
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
                onClick={() => openUserModal(post?.author)}
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
                <Button variant='ghost' size='sm' onClick={() => openPostDetail(post)}>
                  <MessageSquare className='w-4 h-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    setSelectedPost(post);
                    setShowEditDialog(true);
                  }}
                >
                  <Edit2 className='w-4 h-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={() => removePost(post.id)}>
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

export default PostTable;
