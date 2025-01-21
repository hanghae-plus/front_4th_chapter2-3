import { highlightText } from "../../../shared/lib/handleHighlightText";
import { TableCell, TableRow } from "../../../shared/ui";
import { User } from "../../user/types";
import { Post } from "../model/types";
import { PostAuthor } from "./PostAuthor";
import { PostIcons } from "./PostIcons";
import { PostReactions } from "./PostReactions";

interface PostRowProps {
  post: Post;
  selectedTag: string;
  searchQuery: string;
  setSelectedTag: (tag: string) => void;
  updateURL: () => void;
  onViewAuthor: (author: User) => void;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

export const PostRow: React.FC<PostRowProps> = ({
  post,
  selectedTag,
  searchQuery,
  setSelectedTag,
  updateURL,
  onViewAuthor,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  setSelectedTag(tag);
                  updateURL();
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <PostAuthor
        post={post}
        onViewAuthor={onViewAuthor}
      />
      <PostReactions
        likes={post.reactions?.likes || 0}
        dislikes={post.reactions?.dislikes || 0}
      />
      <PostIcons
        post={post}
        onView={() => onView(post)}
        onEdit={() => onEdit(post)}
        onDelete={() => onDelete(post.id)}
      />
    </TableRow>
  );
};
