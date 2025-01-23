import { Card, CardContent } from "@/shared/card/ui";
import PostTable from "../widgets/post/PostTable.tsx";
import PostFilter from "@features/postFilter/ui/PostFilter.tsx";
import PostManagementHeader from "@widgets/post-management-header/ui/PostManagementHeader.tsx";
import { useInitializePostStore } from "@pages/model/useInitializePost.ts";
import PostPagination from "@features/post-pagination/ui/PostPagination.tsx";

const PostsManager = () => {
  const { isLoading } = useInitializePostStore();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostManagementHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilter />
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsManager;
