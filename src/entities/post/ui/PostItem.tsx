import { PostHeader } from "./PostHeader";
import { Table, TableBody, TableHeader } from "../../../shared/ui";
import { PostRow } from "./PostRow";
import { postsAtom } from "../../../app/store/atom";
import { useAtom } from "jotai";

export const PostItem: React.FC = () => {
  const [posts] = useAtom(postsAtom);

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
          />
        ))}
      </TableBody>
    </Table>
  );
};
