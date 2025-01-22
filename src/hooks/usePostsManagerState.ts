import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Post, Posts, Comment, Comments, Tag, UserThumbnail } from '../models/type';

const usePostsManagerState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [skip, setSkip] = useState<number>(parseInt(queryParams.get('skip') || '0'));
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get('limit') || '10'));
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get('search') || '');
  const [sortBy, setSortBy] = useState<string>(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get('sortOrder') || 'asc');
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get('tag') || '');

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
      const postsData: Posts = await postsResponse.json();

      const usersResponse = await fetch('/api/users?limit=0&select=username,image');
      const usersData: UserThumbnail[] = (await usersResponse.json()).users;

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.find((user) => user.id === post.userId),
      }));
      setPosts(postsWithUsers);
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // URL 업데이트
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

  useEffect(() => {
    fetchPosts();
    updateURL();
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag]);

  return {
    posts,
    setPosts,
    comments,
    setComments,
    tags,
    setTags,
    loading,
    setLoading,
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
    selectedTag,
    setSelectedTag,
  };
};

export default usePostsManagerState;
