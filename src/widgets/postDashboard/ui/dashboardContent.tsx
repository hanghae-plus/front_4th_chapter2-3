import { useEffect } from "react";
import { usePostStore } from "../../../entities/post/model/store";
import { PostTable } from "../../../entities/post/ui/postCard";
import { postApi } from "../../../entities/post/api/postApi";
import { usePostManagement } from "../../../features/postManagement/model/context";
import { Post, User } from "../../../entities/types";

export const DashboardContent = () => {
  const { 
    posts, 
    pagination, 
    filters, 
    setPosts, 
    setTotal,
    setFilters
  } = usePostStore();

  const { dispatch } = usePostManagement();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getPosts({ ...pagination, ...filters });
        setPosts(response.posts);
        setTotal(response.total);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [pagination, filters]);

  const handleEdit = (post: Post) => {
    dispatch({ type: "SET_SELECTED_POST", payload: post });
    dispatch({ type: "SET_EDIT_DIALOG_OPEN", payload: true });
  };

  const handleDelete = async (id: number) => {
    try {
      await postApi.deletePost(id);
      const response = await postApi.getPosts({ ...pagination, ...filters });
      setPosts(response.posts);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleDetailView = (post: Post) => {
    dispatch({ type: "SET_SELECTED_POST", payload: post });
    dispatch({ type: "SET_DETAIL_DIALOG_OPEN", payload: true });
  };

  const handleTagClick = (tag: string) => {
    setFilters({ tag });
  };

  const handleUserClick = async (author: User | undefined) => {
    if (author) {
      try {
        const response = await fetch(`/api/users/${author.id}`);
        const userData = await response.json();
        // 사용자 모달 상태 업데이트를 위해 type을 추가해야 함
        dispatch({ type: "SET_USER_MODAL_OPEN", payload: true });
        dispatch({ type: "SET_SELECTED_USER", payload: userData });
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="gap-4">
        <PostTable
          posts={posts}
          searchQuery={filters.search}
          selectedTag={filters.tag}
          highlight={filters.search}  // highlight prop 추가
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetailView={handleDetailView}
          onTagClick={handleTagClick}
          onUserClick={handleUserClick}
        />
      </div>
    </div>
  );
};