import { Post } from "@/entities/post/model/Post.ts"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { PostTableItem } from "./PostTableItem.tsx"

export function PostTable({ posts }: { posts: Post[] }) {
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
          <PostTableItem key={post.id} post={post} />
        ))}
      </TableBody>
    </Table>
  )
}
