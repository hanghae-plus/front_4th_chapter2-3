import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui';
import useSearchStore from '../model/use-search-store.ts';

const SelectSortOrder = () => {
  const { sortOrder, setSortOrder } = useSearchStore();
  return (
    <Select value={sortOrder} onValueChange={setSortOrder}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='정렬 순서' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='asc'>오름차순</SelectItem>
        <SelectItem value='desc'>내림차순</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectSortOrder;
