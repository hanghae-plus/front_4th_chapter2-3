import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { PostAddModal, PostTable } from "@/widgets/posts";

import { useModalStore } from "@/features/modal";
import { useSuspenseQueryGetPosts } from "@/features/posts";
import { PostFilter } from "@/features/posts/ui/PostFilter";

import { Button, Card, CardContent, CardHeader, CardTitle, Pagination } from "@/shared/ui";

export const PostsManagerPage = () => {
  const [searchParams] = useSearchParams();

  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");
  const searchQuery = searchParams.get("search") || "";
  const tag = searchParams.get("tag") || "";

  const {
    data: { total },
  } = useSuspenseQueryGetPosts({ searchQuery, skip, limit, tag });
  const { open } = useModalStore();

  const handleOpenPostAddModal = () => {
    open(<PostAddModal />);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleOpenPostAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilter />
          <PostTable />
          <Pagination total={total} />
        </div>
      </CardContent>
    </Card>
  );
};
