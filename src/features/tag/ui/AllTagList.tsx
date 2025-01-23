import { useEffect, useState } from 'react';

import { Tag, getTags } from '@/entities/tag';

import { SelectContent, SelectItem } from '@/shared/ui';

const AllTagList = () => {
  const [tags, setTags] = useState<Tag[]>([]);
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
