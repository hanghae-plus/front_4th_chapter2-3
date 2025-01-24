import { Tag } from "@/types/tag";

export const updateTag = async (slug: string, updatedTag: Partial<Tag>): Promise<Tag> => {
  const response = await fetch(`/api/posts/tags/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTag),
  });
  const updated: Tag = await response.json();
  return updated;
};
