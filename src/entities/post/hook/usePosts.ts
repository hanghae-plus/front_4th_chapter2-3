import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addNewPost,
  deletePost,
  getPosts,
  getPostsByTag,
  searchPost,
  updatePost,
} from "../api/postApi";
import {
  addDialogAtom,
  editDialogAtom,
  limitAtom,
  loadingAtom,
  newPostAtom,
  postDetailDialogAtom,
  postsAtom,
  searchQueryAtom,
  selectedPostAtom,
  skipAtom,
  totalAtom,
} from "../../../app/store/atom";
import { getUser } from "../../user/api/userApi";
import { User } from "../../user/model/types";
import { Post } from "../model/types";
import { useComment } from "../../comment/hook/useComment";
import { useCallback } from "react";

export const usePosts = () => {
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const selectedPost = useAtomValue(selectedPostAtom);

  const [newPost, setNewPost] = useAtom(newPostAtom);

  const setPosts = useSetAtom(postsAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setTotal = useSetAtom(totalAtom);
  const setShowAddDialog = useSetAtom(addDialogAtom);
  const setShowEditDialog = useSetAtom(editDialogAtom);
  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowPostDetailDialog = useSetAtom(postDetailDialogAtom);

  const { handleFetchComments } = useComment();

  // 게시물 가져오기
  const handleFetchPost = useCallback(async () => {
    try {
      setLoading(true);

      const [postsData, usersData] = await Promise.all([
        getPosts(limit, skip),
        getUser(),
      ]);

      // postsData에서 posts 배열을 매핑하여 user 정보 추가
      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }));

      // 상태 업데이트
      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error("게시물 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setPosts, setTotal, skip, limit]);

  // 태그별 게시물 가져오기
  const handleFetchPostsByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === "all") return handleFetchPost();

      setLoading(true);
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          getPostsByTag(tag),
          getUser(),
        ]);

        const postsWithUsers = postsResponse.posts.map((post: Post) => ({
          ...post,
          author: usersResponse.users.find(
            (user: User) => user.id === post.userId
          ),
        }));

        setPosts(postsWithUsers);
        setTotal(postsResponse.total);
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    },
    ["handleFetchPost", "setLoading", "setPosts", "setTotal"]
  );

  // 게시물 검색
  const handleSearchPost = async () => {
    if (!searchQuery) return handleFetchPost();

    setLoading(true);

    try {
      const data = await searchPost(searchQuery);

      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error("게시물 검색 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 추가
  const handleAddPost = async () => {
    try {
      const data = await addNewPost(newPost);

      setPosts((prevPost) => [data, ...prevPost]);
    } catch (error) {
      console.error("게시물 추가 오류:", error);
    } finally {
      setShowAddDialog(false);
      setNewPost({ title: "", body: "", userId: 1 });
    }
  };

  // 게시물 업데이트
  const handleUpdatePost = async () => {
    try {
      const data = await updatePost(selectedPost.id, selectedPost);

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === data.id ? data : post))
      );
    } catch (error) {
      console.error("게시물 업데이트 오류:", error);
    } finally {
      setShowEditDialog(false);
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };

  // 게시물 상세 보기
  const handleOpenPostDetail = (post: Post) => {
    setSelectedPost(post);
    handleFetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return {
    handleFetchPost,
    handleFetchPostsByTag,
    handleSearchPost,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    handleOpenPostDetail,
  };
};
