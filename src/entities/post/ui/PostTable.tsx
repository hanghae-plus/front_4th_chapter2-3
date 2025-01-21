import { PostHeader } from "./PostHeader";
import { Table, TableBody, TableHeader } from "../../../shared/ui";
import { Post } from "../model/types";
import { PostRow } from "./PostRow";
import { User } from "../../user/types";

interface PostTableProps {
  posts: Post[];
  selectedTag: string;
  searchQuery: string;
  setSelectedTag: (tag: string) => void;
  updateURL: () => void;
  onViewAuthor: (author: User) => void; // ✅ User 타입을 받는 onClick
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

export const PostTable: React.FC<PostTableProps> = ({
  posts,
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
    <Table>
      <TableHeader>
        <PostHeader />
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            updateURL={updateURL}
            onViewAuthor={onViewAuthor}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};
