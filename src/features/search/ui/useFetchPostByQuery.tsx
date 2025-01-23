import useSearchStore from '../model/useSearchStore.ts';
import useFetchPost from './useFetchPost.tsx';
import usePostStore from '../../post/model/usePostStore.ts';
import { getPostsByQuery } from '../../../entities/post/api';

const useFetchPostByQuery = () => {
  const { setLoading, setPosts } = usePostStore(['setLoading', 'setPosts']);
  const { searchQuery, setTotal } = useSearchStore(['searchQuery', 'setTotal']);
  const { fetchPosts } = useFetchPost();
  // 게시물 검색
  const fetchPostsByQuery = async () => {
    if (!searchQuery) {
      await fetchPosts();
      return;
    }
    try {
      setLoading(true);
      const data = await getPostsByQuery(searchQuery);
      setPosts(data.posts);
      setTotal(data.total);
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
    fetchPostsByQuery,
  };
};

export default useFetchPostByQuery;
