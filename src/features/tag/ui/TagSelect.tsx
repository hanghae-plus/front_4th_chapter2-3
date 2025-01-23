import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/ui';
import { useTagStore } from '../model/store';
import { useTagList } from '../api/queries';

interface TagSelectProps {
  onTagSelect: (value: string) => void;
}

export const TagSelect = ({ onTagSelect }: TagSelectProps) => {
  const { selectedTag } = useTagStore();
  const { data: tags = [] } = useTagList();

  return (
    <Select value={selectedTag || ''} onValueChange={onTagSelect}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='태그 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.id} value={tag.slug}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
