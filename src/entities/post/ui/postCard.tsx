import { Post } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface PostCardProps {
  post: Post;
  highlight?: string;
}

export const PostCard = ({ post, highlight }: PostCardProps) => {
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <mark key={i}>{part}</mark>
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{highlightText(post.title, highlight || "")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{highlightText(post.body, highlight || "")}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.reactions?.likes || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-4 h-4" />
              <span>{post.reactions?.dislikes || 0}</span>
            </div>
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};