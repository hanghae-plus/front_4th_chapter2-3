import { PostActions } from "../../../features/postManagement/ui/postActions";
import { PostFilters } from "../../../features/postManagement/ui/postFilters";

export const DashboardHeader = () => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">게시물 관리자</h1>
    <PostActions />
  </div>
);