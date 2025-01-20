import { CommentsResponseDto, Comment, NewComment } from "./types";

export const getComments = async (postId: number): Promise<CommentsResponseDto> =>
  fetch(`/api/comments/post/${postId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("댓글 가져오기 오류:", error);
    });

export const addComment = async (comment: NewComment): Promise<Comment> =>
  await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("댓글 추가 오류:", error);
    });

export const updateComment = async (comment: Comment): Promise<Comment> =>
  await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("댓글 업데이트 오류:", error);
    });

export const deleteComment = async (id: number) =>
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("댓글 삭제 오류:", error);
  });

export const likeComment = async (id: number, likes: number): Promise<Comment> =>
  await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("댓글 업데이트 오류:", error);
    });
