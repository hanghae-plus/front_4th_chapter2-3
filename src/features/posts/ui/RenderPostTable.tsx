import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import usePosts from "../model/usePostsQuery.ts"
import usePostData from "../model/usePostData.ts"
import { highlightText } from "../lib/highlightText.tsx"
import updateSearchParams from "../../../modules/search/model/updateSearchParams.ts"
import { useAtomValue } from "jotai"
import { isLoadingAtom } from "../../../shared/model/store.ts"

export default function RenderPostTable() {
  const {
    posts,
    deletePost,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    openPostDetail,
    openUserModal,
    handleThumbs,
  } = usePostData();
  const {updateURL} = updateSearchParams();
  const isLoading = useAtomValue(isLoadingAtom);
  
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
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
                          onClick={() => {
                            setSelectedTag(tag)
                            updateURL()
                          }}
                        >
                      {tag}
                    </span>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                    <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                    <span>{post.author?.username}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1" onClick={() => handleThumbs(post, "up")}>
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.reactions?.likes || 0}</span>
                  </div>
                    <div className="flex items-center gap-1" onClick={() => handleThumbs(post, "down")}>
                      <ThumbsDown className="w-4 h-4" />
                      <span>{post.reactions?.dislikes || 0}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowEditDialog(true)
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </>
    
  )
}