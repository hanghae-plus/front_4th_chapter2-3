import { useSearchParams } from "react-router-dom";

import { Comments } from "@/features/comments";

import { Post } from "@/entities/posts";

import { getHighlightText } from "@/shared/lib";
import { DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";

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
          {getHighlightText(post.title, searchQuery).map((result, i) =>
            result.isHighlight ? <mark key={i}>{result.text}</mark> : <span key={i}>{result.text}</span>,
          )}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          {getHighlightText(post.body, searchQuery).map((result, i) =>
            result.isHighlight ? <mark key={i}>{result.text}</mark> : <span key={i}>{result.text}</span>,
          )}
        </p>
        <Comments postId={post.id} />
      </div>
    </DialogContent>
  );
};
