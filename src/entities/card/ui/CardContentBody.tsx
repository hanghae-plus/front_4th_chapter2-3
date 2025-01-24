import { PostFilter } from "../../../features/post/ui/PostFilter";
import { PostItem } from "../../../features/post/ui/PostItem";
import { PostPagination } from "../../../features/post/ui/PostPagination";

export const CardContentBody = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostFilter />
      <PostItem />
      <PostPagination />
    </div>
  );
};
