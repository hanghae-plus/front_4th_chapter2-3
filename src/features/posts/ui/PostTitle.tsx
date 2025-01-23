import { Post } from "@/entities/posts";

import { Badge, HighlightText } from "@/shared/ui";

import { POST_FILTER_PARAM } from "../config";
import { usePostFilter } from "../model";

interface PostTitleProps {
  post: Post;
}

export const PostTitle = ({ post }: PostTitleProps) => {
  const { params, changePostFilterParams } = usePostFilter();

  return (
    <div className="space-y-1">
      <div>
        <span>
          <HighlightText text={post.title} highlight={params.searchQuery} />
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => (
          <Badge
            key={tag}
            label={tag}
            isSelected={params.tag === tag}
            onClick={() => changePostFilterParams(POST_FILTER_PARAM.TAG, tag)}
          />
        ))}
      </div>
    </div>
  );
};
