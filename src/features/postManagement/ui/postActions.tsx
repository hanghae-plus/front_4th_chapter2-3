import { usePostManagementStore } from "../model/store";
import { Button } from "../../../shared/ui";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Post } from "../../../entities/types";
import { postApi } from "../../../entities/post/api/postApi";

interface PostActionsProps {
  post?: Post;
}

export const PostActions = ({ post }: PostActionsProps) => {
  const { setShowAddDialog, setShowEditDialog, setSelectedPost } = usePostManagementStore();

  const handleEdit = () => {
    setSelectedPost(post!);
    setShowEditDialog(true);
  };

  const handleDelete = async () => {
    if (!post?.id) return;
    try {
      await postApi.deletePost(post.id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {!post && (
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      )}
      {post && (
        <>
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};