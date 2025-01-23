import { Card, CardContent } from "@/shared/card/ui";
import PostTable from "../widgets/post/PostTable.tsx";
import PostFilter from "@features/posts/ui/PostFilter.tsx";
import PostManagementHeader from "@widgets/post/PostManagementHeader.tsx";
import { useInitializePostStore } from "@pages/model/useInitializePost.ts";
import PostPagination from "@features/posts/ui/PostPagination.tsx";
import LoadingIndicator from "@shared/indicator/ui/LoadingIndicator.tsx";

const PostsManager = () => {
  const { isLoading } = useInitializePostStore();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostManagementHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilter />
          {isLoading ? <LoadingIndicator /> : <PostTable />}
          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsManager;
