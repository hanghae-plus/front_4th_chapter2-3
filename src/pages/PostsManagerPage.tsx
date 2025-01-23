import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Textarea } from '../shared/ui';
import { Post, Tag } from '../shared/types';

import { Card, CardContent, CardHeader, CardTitle } from '../shared/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shared/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../shared/ui/dialog';

import { UserInfoModal } from '../widgets/userInfoModal/ui';
import { PostsTable } from '../widgets/posts/ui';
import { usePostStore } from '../features/posts/model/store';
import { useSearchStore } from '../features/posts/model/searchStore';
import { useCommentStore } from '../features/comments/model/store';
import { PostDetailDialog } from '../features/posts/ui/PostDetailDialog';
import { useCommentDialogStore } from '../features/comments/model/commentDialogStore';
import {
  addComment,
  updateComment,
  deleteComment,
  likeComment,
} from '../features/comments/api/comment';
import { fetchPosts, fetchPostsByTag, fetchTags, searchPosts } from '../features/posts/api/posts';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // store에서 상태와 액션 가져오기
  const {
    posts,
    loading,
    total,
    setPosts,
    setLoading,
    setTotal,
    showEditDialog,
    closeEditDialog,
    selectedPost,
    setSelectedPost,
  } = usePostStore();

  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useSearchStore();
  const { comments, setComments } = useCommentStore();

  const {
    selectedComment,
    showAddDialog: showAddCommentDialog,
    showEditDialog: showEditCommentDialog,
    newComment,
    closeAddDialog,
    closeEditDialog: closeCommentEditDialog,
    setNewComment,
    setSelectedComment,
  } = useCommentDialogStore();

  // 상태 관리
  const [skip, setSkip] = useState(parseInt(queryParams.get('skip') || '0'));
  const [limit, setLimit] = useState(parseInt(queryParams.get('limit') || '10'));
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [tags, setTags] = useState<Tag[]>([]);

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
  const handleFetchPosts = async () => {
    try {
      setLoading(true);
      const { posts, total } = await fetchPosts(limit, skip);
      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 태그로 게시물 가져오기
  const handleFetchPostsByTag = async (tag: string) => {
    try {
      setLoading(true);
      const data = await fetchPostsByTag(tag);
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 태그 가져오기
  const handleFetchTags = async () => {
    try {
      const tags = await fetchTags();
      setTags(tags);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  };

  // 게시물 검색
  const handleSearchPosts = async () => {
    try {
      setLoading(true);
      const data = await searchPosts(searchQuery);
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post: Post) => (post.id === data.id ? data : post)));
      closeEditDialog();
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  // 댓글 추가
  const handleAddComment = async () => {
    try {
      const data = await addComment(newComment);
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
      closeAddDialog();
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const handleUpdateComment = async () => {
    try {
      if (!selectedComment) return;
      const data = await updateComment(selectedComment.id, selectedComment.body);
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      }));
      closeCommentEditDialog();
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteComment(id);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  // 댓글 좋아요
  const handleLikeComment = async (id: number, postId: number) => {
    try {
      const likes = comments[postId].find((c) => c.id === id)?.likes ?? 0;
      const data = await likeComment(id, likes);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  useEffect(() => {
    handleFetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      handleFetchPostsByTag(selectedTag);
    } else {
      handleFetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder(params.get('sortOrder') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

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
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
                handleFetchPostsByTag(value);
                updateURL();
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='태그 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>모든 태그</SelectItem>
                {tags.map((tag) => (
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
          {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostsTable />}

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
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={closeEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Input
              placeholder='제목'
              value={selectedPost?.title || ''}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, title: e.target.value });
                }
              }}
            />
            <Textarea
              rows={15}
              placeholder='내용'
              value={selectedPost?.body || ''}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, body: e.target.value });
                }
              }}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={closeAddDialog}>
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
            <Button onClick={handleAddComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={closeCommentEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <Textarea
              placeholder='댓글 내용'
              value={selectedComment?.body || ''}
              onChange={(e) => {
                if (selectedComment) {
                  setSelectedComment({ ...selectedComment, body: e.target.value });
                }
              }}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog onDeleteComment={handleDeleteComment} onLikeComment={handleLikeComment} />

      {/* 사용자 모달 */}
      <UserInfoModal />
    </Card>
  );
};

export default PostsManager;
