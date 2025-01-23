import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

import SelectSortBy from './SelectSortBy.tsx';
import SelectSortOrder from './SelectSortOrder.tsx';

import { useSearchStore, useFetchPostsByTag, useFetchPostsByQuery } from '../model';

import { AllTagList } from '../../tag/ui';

import { Input, Select, SelectTrigger, SelectValue } from '@/shared/ui';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, selectedTag, setSelectedTag, initParams, updateParams } =
    useSearchStore();
  const { fetchPostsByTag } = useFetchPostsByTag();
  const { fetchPostsByQuery } = useFetchPostsByQuery();

  useEffect(() => {
    initParams(location.search);
  }, [location.search]);

  return (
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
          navigate(updateParams());
        }}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='태그 선택' />
        </SelectTrigger>
        <AllTagList />
      </Select>
      <SelectSortBy />
      <SelectSortOrder />
    </div>
  );
};

export default SearchBar;
