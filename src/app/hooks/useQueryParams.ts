import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostStore } from '../../features/post/model/store';
import { useTagStore } from '../../features/tag/model/store';
import { useSortStore } from '../../features/sort/model/store';

export const useQueryParams = () => {
  const location = useLocation();
  const { setSkip, setLimit, setSearchQuery } = usePostStore();
  const { setSelectedTag } = useTagStore();
  const { setSortBy, setSortOrder } = useSortStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy('NONE');
    setSortOrder('ASC');
    setSelectedTag(params.get('tag') || '');
  }, [location.search, setLimit, setSearchQuery, setSelectedTag, setSkip, setSortBy, setSortOrder]);
};
