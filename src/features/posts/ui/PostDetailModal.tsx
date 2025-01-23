import { Comments } from "@/widgets/comments";

import { Post } from "@/entities/posts";

import { DialogContent, DialogHeader, DialogTitle, HighlightText } from "@/shared/ui";

import { usePostFilter } from "../model";

interface PostDetailModalProps {
  post: Post;
}

export const PostDetailModal = ({ post }: PostDetailModalProps) => {
  const { params } = usePostFilter();
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>
          <HighlightText text={post.title} highlight={params.searchQuery} />
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          <HighlightText text={post.body} highlight={params.searchQuery} />
        </p>
        <Comments postId={post.id} />
      </div>
    </DialogContent>
  );
};
