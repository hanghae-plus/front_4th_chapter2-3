import { useSearchStore } from './use-search-store.ts';
import { usePostStore } from '../../post/model';

import { getPosts } from '../../../entities/post/api';
import { getUsers } from '../../../entities/user/api';
import { findUserById } from '../../../entities/user/model';

const useFetchPosts = () => {
  const { setLoading, setPosts } = usePostStore();
  const { limit, skip, setTotal } = useSearchStore();

  // 게시물 가져오기
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const [postsData, usersData] = await Promise.all([getPosts(limit, skip), getUsers()]);
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
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchPosts,
  };
};

export default useFetchPosts;
