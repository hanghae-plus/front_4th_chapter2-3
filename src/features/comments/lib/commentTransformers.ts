import { Post, Comment } from "../../../types/posts"

// 댓글 업데이트 후 게시물 목록 갱신
export const updatePostComments = (posts: Post[], postId: number, updatedComment: Comment): Post[] => {
  return posts.map((post) => {
    if (post.id === postId && post.comments) {
      return {
        ...post,
        comments: post.comments.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)),
      }
    }
    return post
  })
}

// 댓글 삭제 후 게시물 목록 갱신
export const removePostComment = (posts: Post[], postId: number, commentId: number): Post[] => {
  return posts.map((post) => {
    if (post.id === postId && post.comments) {
      return {
        ...post,
        comments: post.comments.filter((comment) => comment.id !== commentId),
      }
    }
    return post
  })
}

export const updatePostCommentLikes = (posts: Post[], postId: number, commentId: number, newLikes: number): Post[] => {
  return posts.map((post) => {
    if (post.id === postId && post.comments) {
      return {
        ...post,
        comments: post.comments.map((comment) =>
          comment.id === commentId ? { ...comment, likes: newLikes } : comment,
        ),
      }
    }
    return post
  })
}
