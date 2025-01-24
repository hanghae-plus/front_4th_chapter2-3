// src/hooks/usePostsManagerState.ts
import { useAtom } from 'jotai';
import {
  postsAtom,
  commentsAtom,
  tagsAtom,
  loadingAtom,
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from '../../entities/postManagerAtoms';
import { useNavigate, useLocation } from 'react-router-dom';
import { Post, Posts, UserThumbnail } from '../../models/type';

const usePostsManagerState = () => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);

  const navigate = useNavigate();
  const location = useLocation();

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
