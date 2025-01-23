import { Table } from "@/shared"

import { Post } from "@/entities/posts"
import { PostsTableBody } from "./posts-table-body"
import { PostsTableHeader } from "./posts-table-header"

interface PostsTableProps {
  posts: Post[]
}

function PostsTable(props: PostsTableProps) {
  const { posts } = props
  console.log("🚀 ~ PostsTable ~ posts:", posts)

  return (
    <Table>
      <PostsTableHeader />
      <PostsTableBody posts={posts} />
    </Table>
  )
}

export { PostsTable }
