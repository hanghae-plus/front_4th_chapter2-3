import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '../shared/ui';
import usePostsManagerState from '../hooks/usePostsManagerState';
import PostsTable from '../components/PostsTable';
import PostDialogs from '../components/PostDialogs';
import { Plus } from 'lucide-react';

const PostsManager = () => {
  const {
    posts,
    setPosts,
    loading,
    fetchPosts,
    updateURL,
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = usePostsManagerState();

  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // 게시물 추가 핸들러
  const addPost = async () => {
    try {
      const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setNewPost({ title: '', body: '', userId: 1 });
      setShowAddDialog(false);
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 수정 핸들러
  const updatePost = async () => {
    if (!selectedPost) return;
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost),
      });
      const data = await response.json();
      setPosts(posts.map((post) => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 수정 오류:', error);
    }
  };

  // 게시물 삭제 핸들러
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  // 게시물 상세 보기 핸들러
  const openPostDetail = (post) => {
    setSelectedPost(post);
    setShowDetailDialog(true);
  };

  // 텍스트 하이라이트 함수
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

  useEffect(() => {
    fetchPosts();
  }, []);

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
          {/* 검색 및 정렬 */}
          <div className='flex gap-4'>
            <Input
              placeholder='게시물 검색...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchPosts()}
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder='정렬 기준' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='id'>ID</SelectItem>
                <SelectItem value='title'>제목</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder='정렬 순서' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='asc'>오름차순</SelectItem>
                <SelectItem value='desc'>내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className='flex justify-center'>로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )}
              searchQuery={searchQuery}
              onOpenPostDetail={openPostDetail}
              onEditPost={(post) => {
                setSelectedPost(post);
                setShowEditDialog(true);
              }}
              onDeletePost={deletePost}
              highlightText={highlightText}
            />
          )}

          {/* 페이지네이션 */}
          <div className='flex justify-between'>
            <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
              이전
            </Button>
            <Button disabled={skip + limit >= posts.length} onClick={() => setSkip(skip + limit)}>
              다음
            </Button>
          </div>
        </div>
      </CardContent>

      {/* 대화상자 */}
      <PostDialogs
        showAddDialog={showAddDialog}
        showEditDialog={showEditDialog}
        showDetailDialog={showDetailDialog}
        selectedPost={selectedPost}
        newPost={newPost}
        setNewPost={setNewPost}
        setSelectedPost={setSelectedPost}
        onAddPost={addPost}
        onUpdatePost={updatePost}
      />
    </Card>
  );
};

export default PostsManager;
