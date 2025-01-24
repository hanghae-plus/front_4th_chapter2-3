import { PostHeader } from "./PostHeader";
import { Table, TableBody, TableHeader } from "../../../shared/ui";
import { PostRow } from "./PostRow";
import { postsAtom } from "../../../app/store/atom";
import { useAtomValue } from "jotai";
import { usePostsQuery } from "../../../entities/post/hook/usePostsQuery";

export const PostItem: React.FC = () => {
  const posts = useAtomValue(postsAtom);

  const { isLoading } = usePostsQuery();

  if (isLoading)
    return <div className="flex justify-center p-4">로딩 중...</div>;

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
