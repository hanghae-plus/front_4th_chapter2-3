export interface AddCommentProps {
  postId: number;
  body: string;
  userId: number;
}

export const addComment = async ({ postId, body, userId }: AddCommentProps) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, body, userId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
