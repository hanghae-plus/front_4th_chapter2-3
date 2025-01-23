import { Table, TableBody, TableHead, TableHeader, TableRow } from "@shared/ui"
import { usePostsQuery } from "@features/post/model"
import { Post } from "@features/post/ui/Post.tsx"

export function PostsTable() {
  const { postsWithUsers: posts } = usePostsQuery().data

  return (
    <>
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
            <Post key={post.id} post={post} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
