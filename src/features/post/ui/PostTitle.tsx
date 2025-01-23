import { HighlightText } from '../../../shared/ui';
import TagList from './TagList.tsx';
import { Post } from '../../../entities/post/model';
import useSearchStore from '../../search/model/use-search-store.ts';

interface TitleCellProps {
  post: Post;
}

const PostTitle = ({ post }: TitleCellProps) => {
  const { searchQuery } = useSearchStore(['searchQuery']);

  return (
    <div className='space-y-1'>
      {/* 타이틀인데 분리할 필요가 있을까...? */}
      <div>
        <HighlightText text={post.title} highlight={searchQuery} />
      </div>

      <TagList tags={post.tags} />
    </div>
  );
};

export default PostTitle;
