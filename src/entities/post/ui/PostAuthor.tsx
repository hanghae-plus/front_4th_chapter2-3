import { TableCell } from "../../../shared/ui";
import { User } from "../../user/model/types";
import { Post } from "../model/types";

interface PostAuthorProps {
  post: Post;
  onViewAuthor: (author: User) => void;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({
  post,
  onViewAuthor,
}) => {
  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          if (post?.author) onViewAuthor(post.author);
        }}
      >
        <img
          src={post.author?.image}
          alt={post.author?.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  );
};
