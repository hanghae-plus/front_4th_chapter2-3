export const deleteTag = async (slug: string): Promise<void> => {
  await fetch(`/api/posts/tags/${slug}`, {
    method: "DELETE",
  });
};
