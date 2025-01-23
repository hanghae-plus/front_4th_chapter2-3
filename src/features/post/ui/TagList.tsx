import useSearchStore from '../../search/model/use-search-store.ts';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

interface TagListProps {
  tags?: string[];
}

const TagList = ({ tags }: TagListProps) => {
  const navigate = useNavigate();
  const { selectedTag, setSelectedTag, updateParams } = useSearchStore([
    'selectedTag',
    'setSelectedTag',
    'updateParams',
  ]);

  const getClassName = useMemo(
    () => (tag: string) =>
      selectedTag === tag
        ? 'text-white bg-blue-500 hover:bg-blue-600'
        : 'text-blue-800 bg-blue-100 hover:bg-blue-200',
    [selectedTag],
  );

  const handleClickTag = (tag: string) => {
    setSelectedTag(tag);
    navigate(updateParams());
  };

  return (
    <div className='flex flex-wrap gap-1'>
      {tags?.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${getClassName(
            tag,
          )}`}
          onClick={() => handleClickTag(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
