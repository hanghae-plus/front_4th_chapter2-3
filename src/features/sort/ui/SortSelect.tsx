import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui';
import { useSortStore } from '../model/store';
import { SORT_OPTIONS } from '../../../entities/sort/constants';

export const SortSelect = () => {
  const { sortBy, setSortBy } = useSortStore();

  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='정렬 기준' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SORT_OPTIONS.NONE}>없음</SelectItem>
        <SelectItem value={SORT_OPTIONS.ID}>ID</SelectItem>
        <SelectItem value={SORT_OPTIONS.TITLE}>제목</SelectItem>
        <SelectItem value={SORT_OPTIONS.REACTIONS}>반응</SelectItem>
      </SelectContent>
    </Select>
  );
};
