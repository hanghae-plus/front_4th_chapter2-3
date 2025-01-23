import { http, HttpResponse } from "msw";

import { AddCommentProps, Comment } from "@/entities/comments";

import { ListResponse } from "@/shared/model";

let { comments }: ListResponse<{ comments: Comment[] }> = await fetch("https://dummyjson.com/comments").then((res) =>
  res.json(),
);

const getCommnets = http.get("/api/comments/post/:postId", ({ params, request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const { postId } = params;
  const filteredComments = comments.filter((comment) => comment.postId === Number(postId));

  return HttpResponse.json({
    comments: filteredComments,
    total: comments.length,
    skip,
    limit,
  });
});

const addComment = http.post("/api/comments/add", async ({ request }) => {
  const { postId, body, userId } = (await request.json()) as AddCommentProps;

  const newComment = {
    id: Math.max(...comments.map((comment) => comment.id)) + 1,
    postId,
    body,
    likes: 0,
    user: { id: userId, username: "", fullName: "" },
  };

  comments = [...comments, newComment];

  return HttpResponse.json(newComment);
});

const deleteComment = http.delete("/api/comments/:commentId", ({ params }) => {
  const { commentId } = params;

  const deletedComment = comments.find((comment) => comment.id === Number(commentId));
  comments = comments.filter((comment) => comment.id !== Number(commentId));
  return HttpResponse.json(deletedComment);
});

const updateComment = http.put("/api/comments/:commentId", async ({ params, request }) => {
  const { commentId } = params;
  const updatedCommentProps = (await request.json()) as Partial<Comment>;

  comments = comments.map((comment) =>
    comment.id === Number(commentId) ? { ...comment, ...updatedCommentProps } : comment,
  );
  const updatedComment = comments.find((comment) => comment.id === Number(commentId));

  return HttpResponse.json(updatedComment);
});

export const commentsApis = [getCommnets, addComment, deleteComment, updateComment];
