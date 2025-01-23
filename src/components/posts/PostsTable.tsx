import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shared/ui"
import { usePostsStore } from "../../stores/usePostsStore"

export const PostsTable = () => {
  const {
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    handlePostDetail,
    handlePostEdit,
    handlePostDelete,
    handlePostLike,
    handlePostDislike,
    handleUserDetail,
  } = usePostsStore()

  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

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
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => setSelectedTag(tag)}
                    >
                      {highlightText(tag, searchQuery)}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleUserDetail(post.userId)}>
                {post.author?.image && (
                  <img src={post.author.image} alt={post.author.username} className="w-8 h-8 rounded-full" />
                )}
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handlePostLike(post.id)}>
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {post.reactions?.likes || 0}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handlePostDislike(post.id)}>
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {post.reactions?.dislikes || 0}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {post.comments?.length || 0}
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handlePostDetail(post)}>
                  상세
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handlePostEdit(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handlePostDelete(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
