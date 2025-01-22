import { Post } from "@/types/post";

export const sortPost = (posts: Post[], column: string, order: string): Post[] => {
  if (column === "none") return posts;

  return [...posts].sort((a, b) => {
    let comparison = 0;
    switch (column) {
      case "id":
        comparison = Number(a.id) - Number(b.id);
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "reactions":
        comparison = a.reactions.likes - b.reactions.likes;
        break;
      default:
        return 0;
    }
    return order === "asc" ? comparison : -comparison;
  });
};
