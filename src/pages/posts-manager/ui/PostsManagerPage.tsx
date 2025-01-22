import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { Post } from '@/entities/posts/model';
import type { User } from '@/entities/users/model';
import { useCreatePost, useDeletePost, useQueryPosts, useUpdatePost } from '@/features/posts/api';
import { usePostsStoreSelector } from '@/features/posts/model';
import type { Posts } from '@/features/posts/model/Posts';
import { useQueryUsers } from '@/features/users/api/useUsersQueries';
import { get, patch, post, put, remove } from '@/shared/api/fetch';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from '@/shared/ui';

import type { Comment, Tag, Users } from '../model/types';

export const PostsManagerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const { posts, setPosts, addPost, updatePost, deletePost } = usePostsStoreSelector([
    'posts',
    'setPosts',
    'addPost',
    'updatePost',
    'deletePost',
  ]);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(queryParams.get('tag') || '');
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(Number(queryParams.get('skip') || '0'));
  const [limit, setLimit] = useState(Number(queryParams.get('limit') || '10'));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(queryParams.get('sortOrder') || 'asc');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [tags, setTags] = useState<Tag[]>([]);
  const [comments, setComments] = useState<{
    [key: number]: Comment[];
  }>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState<Partial<Comment> & { userId: User['id'] }>({
    body: '',
    postId: null,
    userId: 1,
  });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 게시물 관련 훅
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQueryPosts(limit, skip);
  const { mutateAsync: mutatePostCreate } = useCreatePost();
  const { mutateAsync: mutatePostUpdate } = useUpdatePost();
  const { mutateAsync: mutatePostDelete } = useDeletePost();

  const { data: usersData, isLoading: usersLoading, error: usersError } = useQueryUsers();

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기
  const fetchPosts = async () => {
    // setLoading(true);

    if (postsLoading || usersLoading) return;
    if (postsError || usersError) {
      console.error('게시물 또는 사용자 정보 가져오기 오류:', postsError || usersError);
      return;
    }
    if (!postsData || !usersData) return;

    // const usersData: Users['users'] = await get('/api/users?limit=0&select=username,image').then(
    //   (users) => users.users,
    // );
    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.find((user) => user.id === post.userId),
    }));
    console.log('🚀 ~ postsWithUsers ~ postsWithUsers:', postsWithUsers);
    setPosts(postsWithUsers);
    setTotal(postsData.total);
    // setLoading(false);
  };

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await get('/api/posts/tags');
      setTags(data);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  };

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const data = await get(`/api/posts/search?q=${searchQuery}`);
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        get(`/api/posts/tag/${tag}`),
        get('/api/users?limit=0&select=username,image'),
      ]);
      const postsData: Posts = await postsResponse;
      const usersData: Users = await usersResponse;

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId) as User,
      }));
      console.log('🚀 ~ postsWithUsers ~ postsWithUsers:', postsWithUsers);

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }
    setLoading(false);
  };

  // 게시물 추가
  const handlePostAdd = async () => {
    try {
      await mutatePostCreate(newPost, {
        onSuccess: (post) => {
          addPost(post);
          setShowAddDialog(false);
          setNewPost({ title: '', body: '', userId: 1 });
        },
      });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 업데이트
  const handlePostUpdate = async () => {
    if (!selectedPost) return;
    try {
      await mutatePostUpdate(selectedPost, {
        onSuccess: (updatedPost) => {
          updatePost(updatedPost);
          setShowEditDialog(false);
        },
      });
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

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

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await get(`/api/comments/post/${postId}`);
      setComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await post('/api/comments/add', newComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment || !selectedComment.id) return;
    try {
      const data = await put(`/api/comments/${selectedComment.id}`, { body: selectedComment.body });

      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await remove(`/api/comments/${id}`);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id);
      if (!comment) return;

      const data = await patch(`/api/comments/${id}`, {
        likes: (comment.likes || 0) + 1,
      });
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await get(`/api/users/${user.id}`);
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(Number(params.get('skip') || '0'));
    setLimit(Number(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder(params.get('sortOrder') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

  useEffect(() => {
    if (postsData && usersData) {
      setTotal(postsData.total);
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData?.users?.find((user) => user.id === post.userId),
      }));
      setPosts(postsWithUsers);
      setLoading(false);
    }
  }, [postsData, usersData, setPosts]);

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null;
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
        )}
      </span>
    );
  };

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
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
                onClick={() => openUserModal(post.author)}
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

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold'>댓글</h3>
        <Button
          size='sm'
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className='w-3 h-3 mr-1' />
          댓글 추가
        </Button>
      </div>
      <div className='space-y-1'>
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className='flex items-center justify-between text-sm border-b pb-1'>
            <div className='flex items-center space-x-2 overflow-hidden'>
              <span className='font-medium truncate'>{comment.user.username}:</span>
              <span className='truncate'>{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <Button variant='ghost' size='sm' onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className='w-3 h-3' />
                <span className='ml-1 text-xs'>{comment.likes}</span>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setSelectedComment(comment);
                  setShowEditCommentDialog(true);
                }}
              >
                <Edit2 className='w-3 h-3' />
              </Button>
              <Button variant='ghost' size='sm' onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className='w-4 h-4 mr-2' />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          {/* 검색 및 필터 컨트롤 */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='게시물 검색...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                fetchPostsByTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='태그 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>모든 태그</SelectItem>
                {tags?.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='정렬 기준' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>없음</SelectItem>
                <SelectItem value='id'>ID</SelectItem>
                <SelectItem value='title'>제목</SelectItem>
                <SelectItem value='reactions'>반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='정렬 순서' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='asc'>오름차순</SelectItem>
                <SelectItem value='desc'>내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='10' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='30'>30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className='flex gap-2'>
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='제목'
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder='내용'
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type='number'
              placeholder='사용자 ID'
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={handlePostAdd}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='제목'
              value={selectedPost?.title || ''}
              onChange={(e) =>
                selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })
              }
            />
            <Textarea
              rows={15}
              placeholder='내용'
              value={selectedPost?.body || ''}
              onChange={(e) =>
                selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })
              }
            />
            <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Textarea
              placeholder='댓글 내용'
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Textarea
              placeholder='댓글 내용'
              value={selectedComment?.body || ''}
              onChange={(e) =>
                selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })
              }
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>
              {selectedPost?.title && highlightText(selectedPost?.title, searchQuery)}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p>{selectedPost?.body && highlightText(selectedPost?.body, searchQuery)}</p>
            {selectedPost?.id ? renderComments(selectedPost?.id) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <img
              src={selectedUser?.image}
              alt={selectedUser?.username}
              className='w-24 h-24 rounded-full mx-auto'
            />
            <h3 className='text-xl font-semibold text-center'>{selectedUser?.username}</h3>
            <div className='space-y-2'>
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address},{' '}
                {selectedUser?.address?.city}, {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} -{' '}
                {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
