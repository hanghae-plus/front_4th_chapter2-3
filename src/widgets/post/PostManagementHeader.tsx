import { CardHeader, CardTitle } from "@shared/card/ui";
import { Button } from "@shared/button/ui";
import { Plus } from "lucide-react";
import PostAddDialog from "@features/posts/ui/PostAddDialog.tsx";
import { useDialog } from "@shared/dialog/model/useDialog.ts";

function PostManagementHeader() {
  const { open } = useDialog();

  const handleOpenAddDialog = () => {
    open(<PostAddDialog />);
  };

  return (
    <div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
    </div>
  );
}

export default PostManagementHeader;
