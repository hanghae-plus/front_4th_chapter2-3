import { useAtom } from "jotai";
import { addDialogAtom } from "../../../app/store/atom";
import { Button } from "../../../shared/ui";

import { CardTitle } from "../../../shared/ui";

import { Plus } from "lucide-react";

export const CardTitleContents = () => {
  const [, setShowAddDialog] = useAtom(addDialogAtom);

  return (
    <CardTitle className="flex items-center justify-between">
      <span>게시물 관리자</span>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </CardTitle>
  );
};
