import { Table } from "@shared/ui"
import { PostTableRow } from "@features/post/ui"
import { usePostManager } from "@features/post/model/hooks"
import { useUserManager } from "@features/user/model/hooks"

export const PostsTable = () => {
  const { posts, handleEditPost, deletePost, openPostDetail } = usePostManager()
  const { handleUserClick } = useUserManager()

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[50px]">ID</Table.Head>
          <Table.Head>제목</Table.Head>
          <Table.Head className="w-[150px]">작성자</Table.Head>
          <Table.Head className="w-[150px]">반응</Table.Head>
          <Table.Head className="w-[150px]">작업</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {posts.map((post) => (
          <PostTableRow
            key={post.id}
            post={post}
            onEdit={handleEditPost}
            onDelete={deletePost}
            onViewComments={openPostDetail}
            onUserClick={handleUserClick}
          />
        ))}
      </Table.Body>
    </Table>
  )
}
