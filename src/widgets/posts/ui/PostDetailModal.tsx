import { useSearchParams } from "react-router-dom";

import { Comments } from "@/widgets/comments";

import { Post } from "@/entities/posts";

import { DialogContent, DialogHeader, DialogTitle, HighlightText } from "@/shared/ui";

interface PostDetailModalProps {
  post: Post;
}

export const PostDetailModal = ({ post }: PostDetailModalProps) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>
          <HighlightText text={post.title} highlight={searchQuery} />
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          <HighlightText text={post.body} highlight={searchQuery} />
        </p>
        <Comments postId={post.id} />
      </div>
    </DialogContent>
  );
};
