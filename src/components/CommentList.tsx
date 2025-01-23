import { useSearchStore } from "../shared/model/useSearchStore"
import { highlightText } from "../util/highlightText"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../shared/ui/Button/ui"
import {
  useDeleteComments,
  useGetComments,
  usePatchCommentsLike,
  usePostComments,
  usePutComments,
} from "../features/comment/api"
import useCommentModalStore from "../entities/modal/model/useCommentModalStore"
import CommentForm from "./CommentForm"
import { CommentFormValues } from "../features/comment/model/type"
import { Post } from "../entities/post/model/type"
import { useEffect, useState } from "react"
import { Comment } from "../entities/comment/model/type"

interface CommentListProps {
  post: Post
}

function CommentList(props: CommentListProps) {
  const { post } = props
  const { search } = useSearchStore()
  const { openCommentModal, closeCommentModal } = useCommentModalStore()

  const { data: commentData, isError, error } = useGetComments(post.id)
  const { mutate: postComments } = usePostComments()
  const { mutate: putComments } = usePutComments()
  const { mutate: deleteComments } = useDeleteComments()
  const { mutate: likeComments } = usePatchCommentsLike()

  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    if (commentData) {
      setComments(commentData.comments)
    }

    if (isError) {
      console.error("댓글 가져오기 오류:", error)
    }
  }, [commentData])

  const addComment = (form: CommentFormValues) => {
    postComments(
      {
        postId: post.id,
        body: form.body,
        userId: post.userId,
      },
      {
        onSuccess: (data) => {
          setComments([data, ...comments!])
          closeCommentModal()
        },
        onError: (error) => {
          console.error("댓글 추가 오류:", error)
        },
      },
    )
  }

  const editComment = (form: CommentFormValues) => {
    putComments(
      {
        params: {
          body: form.body,
        },
        id: form.id!,
      },
      {
        onSuccess: (data) => {
          setComments(comments.map((comment) => (comment.id === data.id ? data : comment)))
          closeCommentModal()
        },
        onError: (error) => {
          console.error("댓글 추가 오류:", error)
        },
      },
    )
  }

  const deleteComment = async (id: number) => {
    deleteComments(id, {
      onSuccess: () => {
        setComments(comments.filter((comment) => comment.id !== id))
      },
      onError: (error) => {
        console.error("댓글 삭제 오류:", error)
      },
    })
  }

  const likeComment = async (id: number) => {
    likeComments(
      {
        params: {
          likes: (comments.find((c) => c.id === id)?.likes || 0) + 1,
        },
        id: id,
      },
      {
        onSuccess: (data) => {
          setComments(
            comments.map((comment) => (comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment)),
          )
        },
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      },
    )
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            openCommentModal({
              title: "새 댓글 추가",
              children: <CommentForm onSubmit={addComment} />,
            })
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body || "", search)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  openCommentModal({
                    title: "댓글 수정",
                    children: <CommentForm comment={comment} onSubmit={editComment} />,
                  })
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList
