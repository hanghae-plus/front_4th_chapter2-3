import { Comment, AddCommentRequest, CommentResponse } from "@/types/comment.ts";
import { http, HttpResponse } from "msw";
import { dummyUser } from "@/mocks/dummy/user.ts";

let { comments }: CommentResponse = await fetch("https://dummyjson.com/comments?limit=0").then((res) => res.json());

const getComments = http.get("/api/comments/post/:postId", ({ params, request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit")) || 10;
  const skip = Number(url.searchParams.get("skip")) || 0;

  const { postId } = params;

  const filteredComments = [...comments].filter((comment) => comment.postId.toString() === postId?.toString());

  return HttpResponse.json({
    comments: filteredComments,
    total: comments.length,
    skip,
    limit,
  });
});

const addComment = http.post("/api/comments/add", async ({ request }) => {
  const { postId, body } = (await request.json()) as AddCommentRequest;

  const newComment: Comment = {
    id: Math.max(...comments.map((comment) => comment.id)) + 1,
    body,
    postId,
    likes: 0,
    user: { id: dummyUser.id, username: dummyUser.username },
  };

  comments = [newComment, ...comments];

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

const likeComment = http.patch("/api/comments/:commentId", ({ params }) => {
  const { commentId } = params;

  const updatedComment = comments.find((comment) => comment.id === Number(commentId));
  comments = comments.map((comment) =>
    comment.id === Number(commentId) ? { ...comment, likes: comment.likes + 1 } : comment,
  );

  return HttpResponse.json(updatedComment);
});

export const commentsApis = [getComments, addComment, likeComment, deleteComment, updateComment];
