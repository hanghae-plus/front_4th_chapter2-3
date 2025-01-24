import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
import { postsAtom } from '../../features/posts/model/store';
import { PostsManager } from '../../widgets/post-manager/PostManager';
import { PostDialog } from '../../features/posts/ui/PostDialog';
import { CommentDialog } from '../../features/comments/ui/dialogs/CommentDialog';
import { UserModal } from '../../features/users/ui/UserModal';

export const PostsPage = () => {
  const location = useLocation();
  const [{ pagination, filters }, setPosts] = useAtom(postsAtom);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setPosts((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        skip: parseInt(params.get('skip') || '0'),
        limit: parseInt(params.get('limit') || '10'),
      },
      filters: {
        ...prev.filters,
        search: params.get('search') || '',
        tag: params.get('tag') || '',
        sortBy: params.get('sortBy') || '',
        sortOrder: (params.get('sortOrder') || 'asc') as 'asc' | 'desc',
      },
    }));
  }, [location.search]);

  return (
    <>
      <PostsManager />
      <PostDialog />
      <CommentDialog />
      <UserModal />
    </>
  );
};
