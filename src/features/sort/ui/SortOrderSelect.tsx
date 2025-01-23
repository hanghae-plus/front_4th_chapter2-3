import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui';
import { useSortStore } from '../model/store';
import { SORT_ORDER } from '../../../entities/sort/constants';

export const SortOrderSelect = () => {
  const { sortOrder, setSortOrder } = useSortStore();

  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='정렬 순서' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SORT_ORDER.ASC}>오름차순</SelectItem>
        <SelectItem value={SORT_ORDER.DESC}>내림차순</SelectItem>
      </SelectContent>
    </Select>
  );
};
