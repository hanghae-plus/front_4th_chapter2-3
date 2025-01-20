import { PostDashboard } from "../../widgets/postDashboard";
import { PostForm } from "../../features/postManagement/ui/postForm";
import { usePostManagementStore } from "../../features/postManagement/model/store";

export const PostsManagerPage = () => {
  const {
    showAddDialog,
    showEditDialog,
    selectedPost,
    setShowAddDialog,
    setShowEditDialog,
  } = usePostManagementStore();

  return (
    <>
      <PostDashboard />
      
      <PostForm
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSuccess={() => {
          // Refresh posts...
        }}
      />

      <PostForm
        post={selectedPost}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSuccess={() => {
          // Refresh posts...
        }}
      />
    </>
  );
};