import { Tag } from "./types";

export const getTags = async (): Promise<Tag[]> =>
  fetch("/api/posts/tags")
    .then((response) => response.json())
    .catch((error) => {
      console.error("태그 가져오기 오류:", error);
    });
