import { HighlightText, TableCell } from '../../../shared/ui';
import TagList from './TagList.tsx';
import { Post } from '../../../entities/post/model';
import useSearchStore from '../../search/model/use-search-store.ts';

interface TitleCellProps {
  post: Post;
}

const TitleCell = ({ post }: TitleCellProps) => {
  const { searchQuery } = useSearchStore();

  return (
    <TableCell>
      <div className='space-y-1'>
        {/* 타이틀인데 분리할 필요가 있을까...? */}
        <div>
          <HighlightText text={post.title} highlight={searchQuery} />
        </div>

        <TagList post={post} />
      </div>
    </TableCell>
  );
};

export default TitleCell;
