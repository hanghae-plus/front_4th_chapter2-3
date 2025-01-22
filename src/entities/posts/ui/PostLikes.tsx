import { ThumbsDown, ThumbsUp } from "lucide-react";

interface PostLikesProps {
  likes?: number;
  dislikes?: number;
}

export const PostLikes = ({ likes = 0, dislikes = 0 }: PostLikesProps) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{likes}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{dislikes}</span>
    </div>
  );
};
