import useFetchPost from './useFetchPost.tsx';
import usePostStore from '../../post/model/usePostStore.ts';
import useSearchStore from '../model/useSearchStore.ts';
import { getPostsByTag } from '../../../entities/post/api';
import { getUsers } from '../../../entities/user/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserById } from '../../../entities/user/model';

const useFetchPostByTag = () => {
  const navigate = useNavigate();
  const { fetchPosts } = useFetchPost();
  const { setPosts, setLoading } = usePostStore(['setPosts', 'setLoading']);
  const { setTotal, skip, limit, sortBy, sortOrder, selectedTag, updateParams } = useSearchStore([
    'setTotal',
    'skip',
    'limit',
    'sortBy',
    'sortOrder',
    'selectedTag',
    'updateParams',
  ]);

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
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
      setTotal(postsData.total);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    navigate(updateParams());
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  return {
    fetchPostsByTag,
  };
};

export default useFetchPostByTag;
