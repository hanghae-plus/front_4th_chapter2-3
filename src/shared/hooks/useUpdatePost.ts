import { useState } from "react";
import { Post } from "../../entities/types";

const useUpdatePost = (
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setShowAddDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState<Post>({ id: 0, title: "", body: "", userId: 1 });

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error(`Failed to add post: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts((prevPosts) => [data, ...prevPosts]); // 기존 게시물 목록 업데이트
      setShowAddDialog(false); // 대화상자 닫기
      setNewPost({ id: 0, title: "", body: "", userId: 1 }); // 입력 필드 초기화
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    }
  };

  // 게시물 수정
  const handleUpdatePost = async () => {
    if (!selectedPost?.id) {
      console.error("게시물 ID가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.statusText}`);
      }

      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === data.id ? data : post)) // 게시물 목록 업데이트
      );
      setShowEditDialog(false); // 대화상자 닫기
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    }
  };

  return {
    selectedPost,
    setSelectedPost,
    newPost,
    setNewPost,
    addPost,
    handleUpdatePost,
  };
};

export default useUpdatePost;