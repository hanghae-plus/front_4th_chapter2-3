import { useAtom } from 'jotai';
import { postsAtom } from '../model/store';
import { Input, Select } from '../../../shared/ui';
import { Search } from 'lucide-react';

export const PostFilters = () => {
  const [{ filters }, setPosts] = useAtom(postsAtom);

  return (
    <div className='flex gap-4'>
      <div className='relative flex-1'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
        <Input
          placeholder='게시물 검색...'
          className='pl-8'
          value={filters.search}
          onChange={(e) =>
            setPosts((prev) => ({
              ...prev,
              filters: { ...prev.filters, search: e.target.value },
            }))
          }
        />
      </div>
      <Select
        value={filters.tag}
        onValueChange={(value) =>
          setPosts((prev) => ({
            ...prev,
            filters: { ...prev.filters, tag: value },
          }))
        }
      >
        <Select.Trigger className='w-[180px]'>
          <Select.Value placeholder='태그 선택' />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value='all'>모든 태그</Select.Item>
          {/* 태그 목록 */}
        </Select.Content>
      </Select>
      {/* 정렬 옵션들 */}
    </div>
  );
};
