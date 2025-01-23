import { Search } from 'lucide-react';
import { Input } from '../../../shared/ui';
import { TagSelect } from '../../../features/tag/ui/TagSelect';
import { SortSelect } from '../../../features/sort/ui/SortSelect';
import { SortOrderSelect } from '../../../features/sort/ui/SortOrderSelect';
import { usePostStore } from '../model/store';

interface PostFilterProps {
  onTagSelect: (value: string) => void;
}

/**
 * 게시물 필터링 컴포넌트
 * 검색, 태그 필터, 정렬 기능을 제공
 */
export const PostFilter = ({ onTagSelect }: PostFilterProps) => {
  const { searchQuery, setSearchQuery } = usePostStore();

  return (
    <div className='flex gap-4'>
      {/* 검색 입력 필드 */}
      <div className='flex-1'>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='게시물 검색...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 태그 필터 */}
      <TagSelect onTagSelect={onTagSelect} />

      {/* 정렬 옵션들 */}
      <SortSelect />
      <SortOrderSelect />
    </div>
  );
};
