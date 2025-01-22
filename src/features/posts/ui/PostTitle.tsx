import { useSearchParams } from "react-router-dom";

import { Post } from "@/entities/posts";

import { Badge, HighlightText } from "@/shared/ui";

interface PostTitleProps {
  post: Post;
}

export const PostTitle = ({ post }: PostTitleProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTag = searchParams.get("tag") || "";
  const searchQuery = searchParams.get("search") || "";

  const handleChangeSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-1">
      <div>
        <span>
          <HighlightText text={post.title} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => (
          <Badge
            key={tag}
            label={tag}
            isSelected={selectedTag === tag}
            onClick={() => handleChangeSearchParams("tag", tag)}
          />
        ))}
      </div>
    </div>
  );
};
