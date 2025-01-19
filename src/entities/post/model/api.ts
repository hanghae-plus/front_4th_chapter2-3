import { PostsResponseDto } from "./types";

export const getPosts = async ({ limit, skip }: { limit: number; skip: number }): Promise<PostsResponseDto> =>
  fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("게시물 가져오기 오류:", error);
    });
