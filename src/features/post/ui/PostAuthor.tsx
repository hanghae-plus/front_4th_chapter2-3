import { TableCell } from "../../../shared/ui";
import { useUser } from "../../../entities/user/hook/useUser";
import { Post } from "../../../entities/post/model/types";

interface PostAuthorProps {
  post: Post;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ post }) => {
  const { openUserModal } = useUser();

  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          if (post?.author) openUserModal(post.author);
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
