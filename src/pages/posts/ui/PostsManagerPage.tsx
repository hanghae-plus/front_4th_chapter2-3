import { Plus } from "lucide-react";

import { PostTableSection } from "@/widgets/posts";

import { useModalStore } from "@/features/modal";
import { PostAddModal } from "@/features/posts";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export const PostsManagerPage = () => {
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
        <PostTableSection />
      </CardContent>
    </Card>
  );
};
