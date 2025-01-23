import { Table, TableHead, TableHeader, TableRow } from "@/shared"

import { PostList } from "@/features/post/post-list"

function PostsTable() {
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
      <PostList />
    </Table>
  )
}

export { PostsTable }
