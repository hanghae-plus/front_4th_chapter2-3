import { useEffect, useState } from "react"
import { Edit2, Plus, Search, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "../shared/ui/Button/ui"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/Dialog/ui"
import { Input } from "../shared/ui/Input/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/Select/ui"
import { Textarea } from "../shared/ui/Textarea/ui"
import { useDeletePosts, useGetPosts, useGetSearchPosts, usePostPosts, usePutPosts } from "../features/post/api"
import { useGetTags } from "../features/tag/api"
import UserModal from "../entities/user/ui/UserModal"
import { highlightText } from "../util/highlightText"
import PostTable from "../components/PostTable"
import Pagination from "../components/Pagination"
import { useSearchStore } from "../shared/model/useSearchStore"

interface Tag {
  name: string
  slug: string
  url: string
}

interface PostResponse {
  limit: number
  skip: number
  total: number
  posts?: Post[]
  users?: User[]
  comments?: Comment[]
}
interface Reactions {
  likes: number
  dislikes: number
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
  views: number
  tags: string[]
  reactions: Reactions
  author?: User | undefined
}

interface User {
  id: number
  image: string
  username: string
}

interface Comment {
  id: number
  postId: number
  body: string
  likes: number
  user?: User
}

interface NewPost {
  body: string
  title: string
  userId: number
}

interface NewComment {
  body: string
  postId: number | null
  userId: number
}

const PostsManager = () => {
  const { searchParams, updateSearchParams, resetSearchParams } = useSearchStore()

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false)
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })
  const [loading, setLoading] = useState<boolean>(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false)

  //search 값이 변경될때 마다 URL 업데이트 및 조회
  useEffect(() => {
    updateQuerystring()
  }, [searchParams])

  const updateQuerystring = () => {
    const params = new URLSearchParams()

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value))
      }
    })

    navigate({ search: params.toString() }, { replace: true })
  }

  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsIsError,
    error: postsError,
  } = useGetPosts({ limit, skip })
  const { mutate: getSearchPostsMutation } = useGetSearchPosts()
  const { mutate: addPostMutation } = usePostPosts()
  const { mutate: putPostMutation } = usePutPosts()
  const { mutate: deletePostMutation } = useDeletePosts()

  const { data: tagData, isError: tagIsError, error: tagError } = useGetTags()

  useEffect(() => {
    setLoading(postsLoading)
    if (postsData) {
      setPosts(postsData.posts)
      setTotal(postsData.total)
    }

    if (postsIsError) {
      console.error("게시물 가져오기 오류:", postsError)
    }
  }, [postsData])

  useEffect(() => {
    if (tagData) {
      setTags(tagData)
    }

    if (tagIsError) {
      console.error("게시물 가져오기 오류:", tagError)
    }
  }, [tagData])

  // 게시물 검색
  const searchPosts = async () => {
    setLoading(true)

    getSearchPostsMutation(
      { q: searchParams.search! },
      {
        onSuccess: (data) => {
          setPosts(data.posts)
          setTotal(data.total)
        },
        onError: (error) => {
          console.error("게시물 검색 오류:", error)
        },
      },
    )
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    // if (!tag || tag === "all") {
    //   fetchPosts()
    //   return
    // }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData: PostResponse = await postsResponse.json()
      const usersData: PostResponse = await usersResponse.json()

      const postsWithUsers = postsData.posts!.map((post) => ({
        ...post,
        author: usersData.users!.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = () => {
    addPostMutation(newPost, {
      onSuccess: (data) => {
        setPosts([data, ...posts])
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  // 게시물 업데이트
  const updatePost = async () => {
    putPostMutation(selectedPost!, {
      onSuccess: (data) => {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)))
        setShowEditDialog(false)
      },
      onError: (error) => {
        console.error("게시물 업데이트 오류:", error)
      },
    })
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    deletePostMutation(id, {
      onSuccess: () => {
        setPosts(posts.filter((post) => post.id !== id))
      },
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: (comments[postId].find((c) => c.id === id)?.likes || 0) + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body || "", searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <div className="flex gap-4">
            <Button onClick={() => resetSearchParams()}>검색 초기화</Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              게시물 추가
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchParams.search}
                  onChange={(e) => updateSearchParams("search", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateSearchParams("search", (e.target as HTMLInputElement).value)
                      searchPosts()
                    }
                  }}
                />
              </div>
            </div>
            <Select
              value={searchParams.tag}
              onValueChange={(value) => {
                updateSearchParams("tag", value)
                // setSelectedTag(value)
                // fetchPostsByTag(value)
                // updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={searchParams.sortBy} onValueChange={(value) => updateSearchParams("sortBy", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={searchParams.sortOrder} onValueChange={(value) => updateSearchParams("sortOrder", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable posts={posts} searchQuery={searchQuery} />
          )}

          {/* 페이지네이션 */}
          <Pagination total={total} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) =>
                setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value } : null)
              }
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
            {selectedPost?.id !== undefined && renderComments(selectedPost.id)}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <UserModal />
    </Card>
  )
}

export default PostsManager
