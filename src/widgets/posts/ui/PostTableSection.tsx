import { PostFilter, PostTable, PostTablePagination } from "@/features/posts";

export const PostTableSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostFilter />
      <PostTable />
      <PostTablePagination />
    </div>
  );
};
