import { useQuery } from '@tanstack/react-query';
import { tagQueries } from '@/entities/tag';
import { SelectContent, SelectItem } from '@/shared/ui';

const AllTagList = () => {
  // 태그 가져오기
  const { data: tags } = useQuery({
    ...tagQueries.tags(),
    initialData: [],
  });

  return (
    <SelectContent>
      <SelectItem value='all'>모든 태그</SelectItem>
      {tags.map((tag) => (
        <SelectItem key={tag.url} value={tag.slug}>
          {tag.slug}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default AllTagList;
