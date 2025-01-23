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
  usePostsQuery,
  useTagsQuery,
  usePostsByTagQuery,
  useSearchPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
} from '../features/posts/hooks/usePostsQuery';
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from '../features/comments/hooks/useCommentsQuery';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // store에서 상태와 액션 가져오기
  const {
    total,
    setPosts,
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
  const { comments } = useCommentStore();

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

  // Posts Queries
  const { data: postsData, isLoading } = usePostsQuery(limit, skip);
  const { data: tagsData } = useTagsQuery();
  const { data: tagPostsData } = usePostsByTagQuery(selectedTag);
  const { data: searchData, refetch } = useSearchPostsQuery(searchQuery);

  // Posts Mutations
  const { mutate: addPostMutate } = useAddPostMutation();
  const { mutate: updatePostMutate } = useUpdatePostMutation();

  // Comments Mutations
  const { mutate: addCommentMutate } = useAddCommentMutation();
  const { mutate: updateCommentMutate } = useUpdateCommentMutation();
  const { mutate: deleteCommentMutate } = useDeleteCommentMutation();
  const { mutate: likeCommentMutate } = useLikeCommentMutation();

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

  // 데이터 업데이트 Effects
  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts);
      setTotal(postsData.total);
    }
  }, [postsData]);

  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData]);

  useEffect(() => {
    if (tagPostsData) {
      setPosts(tagPostsData.posts);
      setTotal(tagPostsData.total);
    }
  }, [tagPostsData]);

  useEffect(() => {
    if (searchData) {
      setPosts(searchData.posts);
      setTotal(searchData.total);
    }
  }, [searchData]);

  // 핸들러 함수들
  const handleAddPost = () => {
    addPostMutate(newPost, {
      onSuccess: () => {
        setShowAddDialog(false);
        setNewPost({ title: '', body: '', userId: 1 });
      },
    });
  };

  const handleUpdatePost = () => {
    if (!selectedPost) return;
    updatePostMutate(selectedPost, {
      onSuccess: () => closeEditDialog(),
    });
  };

  const handleAddComment = () => {
    addCommentMutate(newComment, {
      onSuccess: () => closeAddDialog(),
    });
  };

  const handleUpdateComment = () => {
    if (!selectedComment) return;
    updateCommentMutate(
      { id: selectedComment.id, body: selectedComment.body },
      { onSuccess: () => closeCommentEditDialog() },
    );
  };

  const handleDeleteComment = (id: number, postId: number) => {
    deleteCommentMutate({ id, postId });
  };

  const handleLikeComment = (id: number, postId: number) => {
    const likes = comments[postId].find((c) => c.id === id)?.likes ?? 0;
    likeCommentMutate({ id, likes });
  };

  const handleSearchPosts = () => {
    if (!searchQuery) return;
    refetch();
  };

  useEffect(() => {
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
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value);
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
          {isLoading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostsTable />}

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
            <Button onClick={handleAddPost}>게시물 추가</Button>
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
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
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
