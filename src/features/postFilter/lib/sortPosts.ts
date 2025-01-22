import { Post } from "@/types/post";

export const sortPosts = (posts: Post[], sortBy: string, sortOrder: string): Post[] => {
  if (sortBy === "none") return posts;

  return [...posts].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "id":
        comparison = Number(b.id) - Number(a.id);
        break;
      case "title":
        comparison = b.title.localeCompare(a.title);
        break;
      case "reactions":
        comparison = a.reactions.likes - b.reactions.likes;
        break;
      default:
        return 0;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
};
