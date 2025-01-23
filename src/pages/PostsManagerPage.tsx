import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shared/ui';
import UserDialog from '../features/user/ui/UserDialog.tsx';
import PostDetailDialog from '../features/post/ui/PostDetailDialog.tsx';
import EditCommentDialog from '../features/comment/ui/EditCommentDialog.tsx';
import { AddCommentDialog } from '../features/comment/add-comment/ui';
import EditPostDialog from '../features/post/ui/EditPostDialog.tsx';
import AddPostDialog from '../features/post/ui/AddPostDialog.tsx';
import PostTable from '../features/post/ui/PostTable.tsx';
import PostHeader from '../features/post/ui/PostHeader.tsx';
import { usePostStore } from '../features/post/model';
import { useSearchStore } from '../features/search/model';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { AllTagList } from '../features/tag/ui';
import { getPosts, getPostsByQuery, getPostsByTag } from '../entities/post/api';
import { getUsers } from '../entities/user/api';
import { findUserById } from '../entities/user/model';
import { useTagStore } from '../features/tag/model';

interface Params {
  limit: number;
  skip: number;
  total: number;
  sortBy: string;
  sortOrder: string;
}

const initParams: Params = {
  limit: 10,
  skip: 0,
  total: 0,
  sortBy: '',
  sortOrder: 'asc',
};

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading, setPosts, loading } = usePostStore(['setLoading', 'setPosts', 'loading']);
  const { selectedTag, setSelectedTag } = useTagStore(['selectedTag', 'setSelectedTag']);
  const { searchQuery, setSearchQuery } = useSearchStore(['searchQuery', 'setSearchQuery']);

  const [params, setParams] = useState<Params>(initParams);

  const updateURL = () => {
    const searchParams = new URLSearchParams();
    if (params.skip) searchParams.set('skip', params.skip.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (searchQuery) searchParams.set('search', searchQuery);
    if (selectedTag) searchParams.set('tag', selectedTag);

    navigate(`?${searchParams.toString()}`);
  };

  const fetchPosts = async () => {
    console.log('fetchPosts');
    try {
      setLoading(true);
      const [postsData, usersData] = await Promise.all([
        getPosts(params.limit, params.skip),
        getUsers(),
      ]);
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: findUserById(usersData.users, post.userId),
      }));

      setPosts(postsWithUsers);
      setParams((prev) => ({ ...prev, total: postsData.total }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    console.log('fetchPostsByTag');
    if (!tag || tag === 'all') {
      await fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsData, usersData] = await Promise.all([getPostsByTag(tag), getUsers()]);

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: findUserById(usersData.users, post.userId),
      }));

      setPosts(postsWithUsers);
      setParams((prev) => ({ ...prev, total: postsData.total }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
    setLoading(false);
  };
  // 게시물 검색
  const fetchPostsByQuery = async () => {
    console.log('fetchPostsByQuery');
    if (!searchQuery) {
      await fetchPosts();
      return;
    }
    try {
      setLoading(true);
      const data = await getPostsByQuery(searchQuery);
      setPosts(data.posts);
      setParams((prev) => ({ ...prev, total: data.total }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [params.skip, params.limit, params.sortBy, params.sortOrder, selectedTag]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setParams((prev) => ({
      ...prev,
      limit: Number(searchParams.get('limit') || '10'),
      skip: Number(searchParams.get('skip') || '0'),
      sortBy: searchParams.get('sortBy') || '',
      sortOrder: searchParams.get('sortOrder') || 'asc',
    }));
    setSearchQuery(searchParams.get('searchQuery') || '');
    setSelectedTag(searchParams.get('selectedTag') || '');
  }, [location.search]);

  return (
    <Card className='w-full max-w-6xl mx-auto'>
      <PostHeader />
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='게시물 검색...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && fetchPostsByQuery()}
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
              <AllTagList />
            </Select>
            <Select
              value={params.sortBy}
              onValueChange={(value) => {
                setParams((prev) => ({ ...prev, sortBy: value }));
              }}
            >
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
            <Select
              value={params.sortOrder}
              onValueChange={(value) => {
                setParams((prev) => ({ ...prev, sortOrder: value }));
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='정렬 순서' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='asc'>오름차순</SelectItem>
                <SelectItem value='desc'>내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostTable />}
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span>표시</span>
              <Select
                value={params.limit.toString()}
                onValueChange={(value) => setParams((prev) => ({ ...prev, limit: Number(value) }))}
              >
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
              <Button
                disabled={params.skip === 0}
                onClick={() => {
                  setParams((prev) => ({ ...prev, skip: Math.max(0, params.skip - params.limit) }));
                }}
              >
                이전
              </Button>
              <Button
                disabled={params.skip + params.limit >= params.total}
                onClick={() => {
                  setParams((prev) => ({ ...prev, skip: params.skip + params.limit }));
                }}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <AddPostDialog />
      <EditPostDialog />
      <AddCommentDialog />
      <EditCommentDialog />
      <PostDetailDialog />
      <UserDialog />
    </Card>
  );
};
export default PostsManager;
