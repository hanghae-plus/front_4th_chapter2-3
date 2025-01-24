import { PostHeader } from "./PostHeader";
import { Table, TableBody, TableHeader } from "../../../shared/ui";
import { PostRow } from "./PostRow";
import { loadingAtom, postsAtom } from "../../../app/store/atom";
import { useAtom } from "jotai";

export const PostItem: React.FC = () => {
  const [posts] = useAtom(postsAtom);
  const [loading] = useAtom(loadingAtom);

  if (loading) return <div className="flex justify-center p-4">로딩 중...</div>;

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
