import { Tag } from "@/types/tag";

export const fetchTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags");
  const tags: Tag[] = await response.json();
  return tags;
};
