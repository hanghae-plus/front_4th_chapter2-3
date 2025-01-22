import { PostDashboard } from "../../widgets/postDashboard";
import { PostForm } from "../../features/postManagement/ui/postForm";
import { usePostManagementStore } from "../../features/postManagement/model/store";

export const PostsManagerPage = () => {
  const {
    selectedPost,
    showAddDialog,
    showEditDialog,
    setShowAddDialog,
    setShowEditDialog,
  } = usePostManagementStore();

  return (
    <div>
      <PostDashboard />
      
      <PostForm
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSuccess={() => {
          // Refresh posts...
        }}
      />

      <PostForm
        {...(selectedPost && { post: selectedPost })}
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSuccess={() => {
          // Refresh posts...
        }}
      />
    </div>
  );
};