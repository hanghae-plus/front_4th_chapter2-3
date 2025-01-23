import { SelectContent, SelectItem } from '../../../shared/ui';
import { useTagStore } from '../model';
import { getTags } from '../../../entities/tag/api';
import { useEffect } from 'react';

const AllTagList = () => {
  const { tags, setTags } = useTagStore(['tags', 'setTags']);
  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const tags = await getTags();
      setTags(tags);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

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
