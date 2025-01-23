import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryStore } from '../../search/model';

interface PostTagListProps {
  tags?: string[];
}

const PostTagList = ({ tags }: PostTagListProps) => {
  const navigate = useNavigate();
  const { selectedTag, setSelectedTag, updateParams } = useQueryStore();

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

export default PostTagList;
