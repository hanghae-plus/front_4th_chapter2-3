import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui";
import { useState } from "react";

export const DashboardHeader = () => {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  
  return (
    <div className="flex justify-between items-center mb-6 mt-6">
      <h1 className="text-2xl font-bold">게시물 관리자</h1>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </div>
  );
  
};