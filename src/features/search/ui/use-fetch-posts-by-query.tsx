import useSearchStore from '../model/use-search-store.ts';
import useFetchPosts from './use-fetch-posts.tsx';
import usePostStore from '../../post/model/use-post-store.ts';
import { getPostsByQuery } from '../../../entities/post/api';

const useFetchPostsByQuery = () => {
  const { setLoading, setPosts } = usePostStore(['setLoading', 'setPosts']);
  const { searchQuery, setTotal } = useSearchStore(['searchQuery', 'setTotal']);
  const { fetchPosts } = useFetchPosts();
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

export default useFetchPostsByQuery;
