import PostTagList from './PostTagList.tsx';
import { useQueryStore } from '../../search/model';
import { Post } from '@/entities/post/model';
import { HighlightText } from '@/shared/ui';

interface PostTitleProps {
  post: Post;
}

const PostTitle = ({ post }: PostTitleProps) => {
  const { searchQuery } = useQueryStore();

  return (
    <div className='space-y-1'>
      <div>
        <HighlightText text={post.title} highlight={searchQuery} />
      </div>

      <PostTagList tags={post?.tags} />
    </div>
  );
};

export default PostTitle;
