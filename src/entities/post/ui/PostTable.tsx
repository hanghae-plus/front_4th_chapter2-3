import React, { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { usePostStore } from "../model/store"

export const PostTable: React.FC = () => {
  const { posts, fetchPosts } = usePostStore()

  useEffect(() => {
    fetchPosts(10, 0)
  }, [fetchPosts])

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
        {posts.map((post) => {
          return (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
