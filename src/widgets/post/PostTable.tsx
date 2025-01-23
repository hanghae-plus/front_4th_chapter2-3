import { Table, TableBody, TableHead, TableHeader, TableRow } from "@shared/ui";
import PostTableRow from "./PostTableRow";
import { usePostStore } from "@features/post";

const PostTable = () => {
  const { posts } = usePostStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableRow key={post.id} {...post} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTable;
