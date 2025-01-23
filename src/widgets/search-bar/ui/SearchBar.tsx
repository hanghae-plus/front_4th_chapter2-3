import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQueryStore, useFetchPostsByTag, useFetchPostsByQuery } from '@/features/post/model';
import { AllTagList } from '@/features/tag';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    initParams,
    updateParams,
    setSortBy,
    sortBy,
    setSortOrder,
    sortOrder,
  } = useQueryStore();
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
      <Select value={sortBy} onValueChange={setSortBy}>
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
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='정렬 순서' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='asc'>오름차순</SelectItem>
          <SelectItem value='desc'>내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
