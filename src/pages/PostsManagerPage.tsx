import { Fragment, useEffect, useState } from "react"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../shared/ui/Button/ui"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/Card/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../shared/ui/Dialog/ui"
import { Textarea } from "../shared/ui/Textarea/ui"
import { useDeletePosts, useGetPosts, useGetSearchPosts, usePostPosts, usePutPosts } from "../features/post/api"
import { useGetPostsByTag, useGetTags } from "../features/tag/api"
import UserModal from "../features/user/ui/UserModal"
import { highlightText } from "../util/highlightText"
import PostTable from "../components/PostTable"
import Pagination from "../components/Pagination"
import { useSearchStore } from "../shared/model/useSearchStore"
import SearchForm from "../components/SearchForm"
import usePostModalStore from "../entities/modal/model/usePostModalStore"
import PostForm from "../components/PostForm"
import { postPostsRequest } from "../entities/post/model/type"

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
  const { search, tag, sortBy, sortOrder, limit, skip, resetSearchParams } = useSearchStore()

  const navigate = useNavigate()
  const { openPostModal, closePostModal } = usePostModalStore()

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState<number>(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState<boolean>(false)

  //search 값이 변경될때 마다 URL 업데이트 및 조회
  useEffect(() => {
    updateQuerystring()
  }, [search, tag, sortBy, sortOrder, limit, skip])

  const updateQuerystring = () => {
    const params = new URLSearchParams()
    const searchParams = {
      search: search,
      tag: tag,
      sortBy: sortBy,
      sortOrder: sortOrder,
      limit: limit,
      skip: skip,
    }

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value))
      }
    })

    navigate({ search: params.toString() }, { replace: true })
  }

  //값이 변경될때마다 조회
  const {
    data: postsData,
    isLoading: postsLoading,
    isError: postsIsError,
    error: postsError,
  } = useGetPosts({ limit, skip })

  const { data: postsDataByTag, isLoading: tagsLoading, isError: tagsIsError, error: tagsError } = useGetPostsByTag(tag)

  //나머지 api
  const { data: tags } = useGetTags()
  const { mutate: getSearchPostsMutation } = useGetSearchPosts()
  const { mutate: addPostMutation } = usePostPosts()
  const { mutate: putPostMutation } = usePutPosts()
  const { mutate: deletePostMutation } = useDeletePosts()

  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts)
      setTotal(postsData.total)
    }

    if (postsIsError) {
      console.error("게시물 가져오기 오류:", postsError)
    }
  }, [postsData])

  useEffect(() => {
    if (postsDataByTag) {
      setPosts(postsDataByTag.posts)
      setTotal(postsDataByTag.total)
    }

    if (tagsIsError) {
      console.error("게시물 가져오기 오류:", tagsError)
    }
  }, [postsDataByTag])

  // 게시물 검색
  const searchPosts = async () => {
    getSearchPostsMutation(
      { q: search! },
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

  //게시물 추가 핸들러
  const addPostSubmit = (form: postPostsRequest) => {
    addPostMutation(form, {
      onSuccess: (data) => {
        setPosts([data, ...posts])
        closePostModal()
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  //게시물 수정 핸들러
  const editPostSubmit = (form: postPostsRequest) => {
    const post = posts.find((p) => p.userId === form.userId)
    const newForm = { ...post!, ...form }

    putPostMutation(newForm, {
      onSuccess: (data) => {
        setPosts(posts.map((post) => (post.id === data.id ? data : post)))
        closePostModal()
      },
      onError: (error) => {
        console.error("게시물 업데이트 오류:", error)
      },
    })
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
              <span className="truncate">{highlightText(comment.body || "", search)}</span>
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
    <Fragment>
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>게시물 관리자</span>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetSearchParams()
                }}
              >
                검색 초기화
              </Button>
              <Button
                onClick={() => {
                  openPostModal({
                    title: "새 게시물 추가",
                    children: <PostForm onSubmit={addPostSubmit} />,
                  })
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                게시물 추가
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* 검색 및 필터 컨트롤 */}
            <SearchForm tags={tags!} searchPosts={searchPosts} />

            {/* 게시물 테이블 */}
            {postsLoading || tagsLoading ? (
              <div className="flex justify-center p-4">로딩 중...</div>
            ) : (
              <PostTable posts={posts} editPost={editPostSubmit} />
            )}

            {/* 페이지네이션 */}
            <Pagination total={total} />
          </div>
        </CardContent>
      </Card>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title || "", search)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body || "", search)}</p>
            {selectedPost?.id !== undefined && renderComments(selectedPost.id)}
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

      {/* 사용자 모달 */}
      <UserModal />
    </Fragment>
  )
}

export default PostsManager
