import { CommentsResponseDto } from "./types";

export const getComments = async (postId: number): Promise<CommentsResponseDto> =>
  fetch(`/api/comments/post/${postId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("댓글 가져오기 오류:", error);
    });
